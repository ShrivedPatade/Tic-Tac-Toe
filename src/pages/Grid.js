import React from "react";
import gridStyle from "../Grid.css";
import Cell from "./Cell";
function Grid(props) {
    let no = 0;
    return (
        <html>
            <body>
                {(props.turn === 0) ? <h2 className="container my-3" id="player1">Your move ({props.code})</h2> : <h2 className="container my-3" id="player2">Computer's move ({props.code})</h2>}
                <div className="tic-tac-toe-grid my-5" style={gridStyle}>
                    {props.grid[0].map((content) => {
                        return <Cell key={no} x={0} y={(no++)%3} code={content} setgrid={props.setgrid} grid={props.grid} />
                    })}
                    {props.grid[1].map((content) => {
                        return <Cell key={no} x={1} y={(no++)%3} code={content} setgrid={props.setgrid} grid={props.grid} />
                    })}
                    {props.grid[2].map((content) => {
                        return <Cell key={no} x={2} y={(no++)%3} code={content} setgrid={props.setgrid} grid={props.grid} />
                    })}
                </div>
            </body>
        </html>
    )
}

export default Grid;