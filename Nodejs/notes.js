//Handling URL
//url=user friendly name of IP address

//Query Parameters
//--.com/about?userId=18a=2
// + replaces spaces, ? means start, 18 separates diff queries

//HTTP Method
//GET->get some data from server
//POST->send and mutate some data in server
//PUT->upload photo/file ie something new
//PATCH->change existing entry

//10 Express
const app=express();
app.get('/', (req,res)=>{
    return res.send("a");
})
app.listen(8000, ()=>console.log("aaa"));

//11 Versioning
//4.18.2
//4 -> Major release(Breaking update)
//18 -> Recommmended bug fix(security)
//2 -> Minor fix(optional)
// ^ -> Installs all recommended and minor fixes automatically
// ~ -> Only minor

//12 REST API
//Restfull API (JSON->key value pairs)

//server sends json to client
//client can't independently render JSON, if client is always browser then send HTML, if it is cross platform then send JSON
//always respect all HTTP methods
//SSR(server side rendering)(HTML) faster than CSR(JSON)

//res.json(...): Sends JSON data to the client.
//
//res.send(...): Sends plain text or other content.
//
//res.render(...): Renders a template on the server and sends the HTML to the client (used for SSR).

//14 POSTMAN
//x-www-form-urlencoded (When you use a form in a web page, the form data is typically sent as x-www-form-urlencoded in a POST request.)
//key-value pair entries for POST

//15 MIDDLEWARE FOR EXPRESS

//resources obtained from first middleware will be available in 2nd and onwards

//Middleware in Express:
//
//What: Functions that process requests and responses in the request-response cycle.
//
//Purpose: Modify request/response, perform logging, handle errors, or end the cycle.
//
//Order: Executes in the order it’s defined.
//
//Types:
//
//Application-level: Applies globally (e.g., app.use()).
//
//Router-level: Applies to specific routes (e.g., router.use()).
//
//Built-in: Express-provided middleware (e.g., express.json()).
//
//Third-party: External packages (e.g., morgan, cors).
//const express = require('express');
//const app = express();

// First middleware - logging each request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);  // Logs the HTTP method and URL
    next(); // Pass control to the next middleware
});

// Second middleware - Adding custom data to request
app.use((req, res, next) => {
    req.customData = 'This is custom data';
    next(); // Pass control to the next middleware
});

// Route handler
app.get('/', (req, res) => {
    res.send(`Custom Data: ${req.customData}`);
});

// Third middleware - Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});


//16 HTTP Headers
