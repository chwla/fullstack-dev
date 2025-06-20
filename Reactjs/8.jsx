//Hooks

//Life Cycle of a component
    //Constructed then Mounted (rendered on screen) then Updated (re-rendered) then Un-Mounted then back to Constructed  

//useState Hook- A state of a component is a variable that holds some information that may change over the lifetime of a component. 
            //Whenever the value of the state changes, the component re-renders itself with updated value.

//useState Hook example-

import React, {useState} from 'react';
function CounterComponent(){
        const [count, setCount] = useState(0); //count value is 0
    return (
        <div>
            <p>Count is {count}</p>
            <button onClick={() => setCount(count+1)}>Increment</button>
        </div>
    )
}