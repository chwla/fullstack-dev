//JSX-> Javascript XML

//JSX allows Embedding Expressions

const name = "Josh Perez";
const element = <h1>Hello, {name}</h1>;

//Javascript in JSX

function formatName(user){
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: "Harper",
    lastName: "Perez"
}

const element2 = (
    <h1>
        Hello, {formatName(user)}
    </h1>
)

//Dynamic Attributes

const imageURL = "www.example.com/myPic.png";
const element3 = <img src={imageURL} />;

const linkToSite = "www.example.com";
const element4 = <a href={linkToSite}>Click Here</a>