const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true); // parse query as object
    const log = `${Date.now()}: ${req.url} New Req Received\n`;

    fs.appendFile('log.txt', log, (err) => {
        if (err) {
            console.error("Log write error:", err);
        }

        switch (myUrl.pathname) {
            case '/':
                res.end("Home");
                break;

            case '/about':
                const username = myUrl.query.myname || "Guest"; // fallback if myname not passed
                res.end(`Hi, ${username}`);
                break;

            default:
                res.end("Not found");
        }
    });
});

myServer.listen(8000, () => console.log("Server Started"));
