import React, { useContext } from "react";
import { CounterContext } from "../context/Counter";

const Counter = () => {
    const { count, setCount } = useContext(CounterContext);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
};

export default Counter;
