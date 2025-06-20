//useEffect Hook

//Run code during the change in lifecycle of a component.

import React, { useEffect } from 'react';

const MyComponent = () => {
    useEffect(() => {
        console.log('Hello');
    }, []) //if dependency array is empty then it will only run when component is mounted 

    return (
        <div>
            <p>Hey There</p>
        </div>
    )
}