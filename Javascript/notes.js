// 2 Variable
// let -> can be modified, local scope
// const -> cannot be modified, local scope
// var -> can be reassigned, global

// 3 Data types and operators

// (1) number (doesn't have int/float)
// (2) string
// (3) boolean
// (4) NULL (any)
// (5) undefined (doesn't exist)
// (6) objects ({x:'y', z:'w'})

// operators -> (+ - * /)
// (string x number -> number)
// (string + number -> string)

// 7 Functions

function a(){
    console.log(arguments)
}

// 8 Arrow functions

()=>{
    console.log("aaa");
}

(...ab)=>{
    console.log(ab); // can add parameters dynamically in ab
}

// var: Hoisted with undefined initialization.
// let and const: Hoisted but not initialized (leads to TDZ).
// Function declarations: Hoisted completely, including the function body.
// Function expressions: Behave like variables, so hoisting works like variable hoisting (only the declaration is hoisted, not the assignment).
// In short, hoisting allows you to reference variables and functions before they're written in the code, but the behavior differs depending on whether you're using var, let, const, or function declarations.

// 11 Arrays high order
arr.x
// (1) forEach -> loops on every element of array and does not return anything
const arr = [1, 2, 3];
arr.forEach(num => console.log(num)); 
// Output: 1, 2, 3

// (2) map -> returns a new array by applying a function to each element of the array 
const arr = [1, 2, 3];
const newArr = arr.map(num => num * 2);
console.log(newArr); // Output: [2, 4, 6]

// (3) find
const arr = [1, 2, 3, 4];
const result = arr.find(num => num > 2);
console.log(result); // Output: 3

// (4) includes
const arr = [1, 2, 3];
console.log(arr.includes(2)); // Output: true
console.log(arr.includes(4)); // Output: false

// (5) filter
const arr = [1, 2, 3, 4];
const newArr = arr.filter(num => num % 2 === 0);
console.log(newArr); // Output: [2, 4]

// (6) slice
const arr = [1, 2, 3, 4, 5];
const newArr = arr.slice(1, 4);
console.log(newArr); // Output: [2, 3, 4]

// (7) splice -> Changes the contents of an array by removing or replacing elements and/or adding new elements. arr.splice(start, deleteCount, items...(optional))
const arr = [1, 2, 3, 4, 5];
arr.splice(2, 2); // Removes 2 elements starting from index 2
console.log(arr); // Output: [1, 2, 5]

const arr = [1, 2, 3, 4];
arr.splice(2, 0, 6, 7); // Adds 6 and 7 at index 2
console.log(arr); // Output: [1, 2, 6, 7, 3, 4]

// 12 DOM
// (1) prompt -> Displays a dialog box that prompts the user for input.
let userInput = prompt("What is your name?");
console.log(userInput); // Logs the user's input or null if cancelled.

// (2) window -> Represents the global context (or "global object") of the browser. It is the top-level object in the browser's JavaScript environment.
console.log(window); // Logs the entire window object

// Accessing properties
console.log(window.innerWidth); // The width of the browser window
console.log(window.location);   // The URL of the current page

// Window methods
window.alert("This is an alert!");

// 14 DOM Manipulation
const el = document.getElementById("aa");
el.innerText = "a";
el.style.textDecoration = "underline";
el.style.color = "red";
el.parentElement.removeAttribute("style");  // remove all inline CSS styles that were directly written on the parent element in HTML or via JS.
el.remove();

// 16 Event Listeners
[...document.body.children].forEach(child => {
    child.addEventListener("click", () => {
        child.remove();
    });
});
// Your code makes each child of <body> delete itself when clicked. It's a basic DOM + event listener setup that demonstrates interactivity and element manipulation.

// 17 DOM Manipulation
const el = document.createElement("div");
el.innerText = "x";
container.appendChild(el); 
// Gets added as the last child in container

// 18 Promises
// asynchronous -> Asynchronous code doesn't block the rest of the program. It runs in the background, and when it's done, it gives you the result later.

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Done");
    }, 1000);
});

p.then(result => console.log(result)); // prints "Done" after 1 sec


let res = fetch("https://...")  // promise that I will fetch it and run
// [await] used on an async function

async function getData() {
    const res = await fetch("https://api.example.com/data"); // promise
    const data = await res.json();  // await tells JS: “Wait until this is done before continuing."
    console.log(data);
}

fetch("---")
.then((data) => {
    Console.log("--)")
})

.catch(() => {
    Console.log(error);
})

// 20 Local Storage

// Save a value
localStorage.setItem("name", "Soham");

// When the page loads, get that value and use it
window.addEventListener("load", () => {
    const value = localStorage.getItem("name");
    
    const username = document.getElementById("username");
    if (username && value) {
        username.innerText = value;
    }
});

// 21 Getting user's current location
button.addEventListener('click', async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Lat: ${latitude}, Long: ${longitude}`);
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
});

// 23 Closure
// inner function using outer function's variables

// 24 Currying
function add(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

// useful when all parameters are derived from different sources
const add = (a) => (b) => (c) => a + b + c;

// 25 Composition

// Simple functions
function add(a, b) {
    return a + b;
}

function square(val) {
    return val * val;
}

// Basic 2-function composition
function compose(fn1, fn2) {
    return function (a, b) {
        return fn2(fn1(a, b));
    };
}

const task1 = compose(add, square); // (a + b)²
console.log(task1(2, 3)); // (2 + 3)² = 25

// Multiplication
function multiply(a, b) {
    return a * b;
}

// Compose multiple functions (right to left)
const composeAll = (...fns) => (...args) =>
    fns.reduceRight((acc, fn) => [fn(...acc)], args)[0];

// Example usage
const task2 = composeAll(multiply, square); // square(multiply(a, b))
console.log(task2(2, 3)); // (2 * 3)² = 36

// 27 IIFE
// immediately invoked function expressions
// (does not populate global space for variables)

(function () {
  console.log("I run immediately");
})();

(() => {
  console.log("I also run immediately");
})();

// 28 Generator functions

for (const val of [1, 2, 3, 4, 5]) {
    console.log(val);
}

function* count() {
    yield 2;
    yield 4;
    yield 6
}

const even = count();
// (can be used with yield)
for (const v of even) {
    console.log(v);
}

// 🔁 yield:
// Pauses the function and remembers where it left off.
// Used only inside generator functions (function*).
// You can yield multiple times — it's like a "checkpoint."
// Each yield gives a value to the outside, but the function isn’t done yet.

function* m(start, end, stepSize = 1) {
    for (let i = start; i <= end; i += stepSize) {
        yield i;
    }
}

const one = m(1, 10); // ✅ call the generator
for (const val of one) {
    console.log(val); // prints 1 through 10
}

// 29 Promisification
// Transformation where you convert callback functions to promises.

function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (error, result) => {
            if (error) reject(error);
            else resolve(result);
            });
            });
            };
            }
            
            function asyncTask(callback) {
            setTimeout(() => {
            callback(null, "Task completed");
            }, 1000);
            }
            
            const asyncTaskPromise = promisify(asyncTask);
            
            asyncTaskPromise()
            .then(result => console.log(result)) // prints 'Task completed'
            .catch(error => console.log(error));
