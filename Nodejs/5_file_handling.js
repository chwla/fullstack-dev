//File Handling

const fs = rqeuire("fs");

//Sync Blocking req
fs.writeFileSync("./test.txt", "Hello World");

//Async Non Blocking req
fs.writeFile("./test.txt", "Hello World", (err)=>{});

fs.readFileSync("./test.txt", "utf-8");

fs.readFile("./tets.txt", "utf-8", (err, result)=>{
    if(err){
        console.log("Error", err);
    }
    else{
        console.log(result);
    }
});


fs.appendFileSync("./test.txt", `${Date.now()}Hey THere\n`);

fs.cpSync("./test.txt", "./copy.txt");

fs.unlinkSync("./copy.txt");

fs.statSync("./text.txt");

fs.mkdirSync("my-docss/a/b", {recursive: true});