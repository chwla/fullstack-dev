const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

// DB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/nodejs-app-1")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error", err));

// Schema & Model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true, unique: true },
  jobTitle: String,
  gender: String,
});

const User = mongoose.model("User", userSchema);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // So you can also accept JSON

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

// Routes
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.firstName}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

app.route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  })
  .put(async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ status: "success", id: newUser._id });
  })
  .patch(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ status: "success", updatedUser: user });
  })
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ status: "success", deletedUser: user });
  });

app.listen(PORT, () => console.log("Server started on port", PORT));
