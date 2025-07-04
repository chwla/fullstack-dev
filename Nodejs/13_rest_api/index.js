const express = require("express");

const app = express();
const PORT = 8000;

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
.put((req, res)=>{})
.patch((req, res)=>{})
.delete((req, res)=>{});




app.listen(PORT, ()=>(console.log("server started")));