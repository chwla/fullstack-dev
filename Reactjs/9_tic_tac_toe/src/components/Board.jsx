import React, { useState} from "react";
import Square from "./Square";

const Board = () =>{
    const [state, setState] = useState(Array(9).fill(null));
    const [isXTurn, setisXTurn] = useState(true);
    
    const checkWinner = ()=>{
        const winnerLogic = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        for(let logic of winnerLogic){
            const[a,b,c]= logic;
            if(state[a]===state[b] && state[a]===state[c] && state[a]!=null){
                return state[a];
            }
        }
        return false;
    };

    const isWinner = checkWinner();

    const handleClick = (index) =>{
        if(state[index] != null){
            return;
        }
        const copyState = [...state];
        copyState[index] = isXTurn ? "X" : "O"
        setState(copyState);
        setisXTurn(!isXTurn)
    };

    const Reset = () => {
        setState(Array(9).fill(null));
        setisXTurn(true);
    };

    const isDraw = !isWinner && state.every(cell=>cell != null);

return (
    <div className="board-container">
        {isWinner ? (
            <>
                <h2>{isWinner} won!</h2>
                <button onClick={Reset}>Play again</button>
            </>
        ) : isDraw ? (
            <>
                <h2>It's a Draw!</h2>
                <button onClick={Reset}>Play again</button>
            </>
        ) : (
            <>
                <h4>{isXTurn ? "X" : "O"}'s turn</h4>
                <div className="board-row">
                    <Square onClick={() => handleClick(0)} value={state[0]} />
                    <Square onClick={() => handleClick(1)} value={state[1]} />
                    <Square onClick={() => handleClick(2)} value={state[2]} />
                </div>
                <div className="board-row">
                    <Square onClick={() => handleClick(3)} value={state[3]} />
                    <Square onClick={() => handleClick(4)} value={state[4]} />
                    <Square onClick={() => handleClick(5)} value={state[5]} />
                </div>
                <div className="board-row">
                    <Square onClick={() => handleClick(6)} value={state[6]} />
                    <Square onClick={() => handleClick(7)} value={state[7]} />
                    <Square onClick={() => handleClick(8)} value={state[8]} />
                </div>
            </>
        )}
    </div>
);
}

export default Board;