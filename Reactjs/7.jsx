//Props

//They are like parameters to a function

//For ex-

function add(){
    return 2+3;  //bad function as it will only return one output everytime
}

function add1(a, b){
    return a+b; //better
}

//React example-
function MyHeader(){
    return  <h1>Hello World</h1>; //bad
}

function MyHeader1(props){
    return <h1>{props.title}</h1>;
}
<Myheader1 title="this is my heading"/> //better

