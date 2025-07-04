const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res)=>{
    const log = `${Date.now()}: ${req.url} New Req Received\n`;
    fs.appendFile('log.txt', log, (err,data)=>{
        switch(req.url){
            case '/': 
                res.end("Home");
                break;
            case '/about': 
                res.end("about");
                break;
            default:
                res.end("NOt found");
        }
    });
});

myServer.listen(8000, ()=>console.log("Server Started"));