const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware to parse JSON
app.use(express.json());

// Test route to show all shortened URLs
app.get("/test", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    return res.render("home", { 
        urls: allUrls 
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});


// Routes
app.use("/url", urlRoute);

// Redirection handler
app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) {
      return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectURL);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// Start server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
