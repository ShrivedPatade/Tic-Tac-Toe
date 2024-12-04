import React from "react";
import { useState } from "react";

function Cell(props){

    if(props.content === 'X')
        return(
            <div className='tic-tac-toe-cell x' onClick={() => {props.setgrid(props.x, props.y)}}>{props.code}</div>
        )
    return(
        <div className='tic-tac-toe-cell o' onClick={() => {props.setgrid(props.x, props.y)}}>{props.code}</div>
    )
}

export default Cell;