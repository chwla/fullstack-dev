const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8000;

//middleware
app.use(express.urlencoded({ extended: false}));

app.use((req, res, next)=>{
    //Execute any code
    //Make changes to the request and the response objects
    //End the request-response cycle.
    //Call the next middleware function in the stack.
    console.log('Time:', Date.now());
    next();
});

//ROUTES
app.get("/api/users",(req,res)=>{
    return res.json(users);
});

app.get("/users", (req,res)=>{
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

app.route("/api/users/:id")
.get((req, res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    return res.json(user);
})
.put((req, res)=>{
    const body = req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
        return res.json({ status: "success", id: users.length+1});
    });
})
.patch((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    // Update only the fields provided in req.body
    users[index] = { ...users[index], ...req.body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
        if (error) {
            return res.status(500).json({ error: "Failed to update user" });
        }
        res.json({ status: "success", updatedUser: users[index] });
    });
})
.delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    const deletedUser = users.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
        if (error) {
            return res.status(500).json({ error: "Failed to delete user" });
        }
        res.json({ status: "success", deletedUser });
    });
});





app.listen(PORT, ()=>(console.log("server started")));