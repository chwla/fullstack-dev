const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req,res)=>{
    return res.send("Home Page");
});

app.get("/about", (req,res)=>{
    return res.send("About Page");
});

app.listen(8000, ()=>console.log("Server Started"));