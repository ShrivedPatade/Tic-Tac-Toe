import React from "react";
import scoreBoardStyle from "../ScoreBoard.css";
function Score(props) {
    if(!props.pvc)
        return (
            <>
                <div className="scoreboard" style={scoreBoardStyle}>
                    <div className="player" id="player1">Player One: {props.p1}</div>
                    <div className="player" id="player2">Player Two: {props.p2}</div>
                </div>
            </>
        )
    else
        return (
            <>
                <div className="scoreboard" style={scoreBoardStyle}>
                    <div className="player" id="player1">Player : {props.p1}</div>
                    <div className="player" id="player2">Computer : {props.p2}</div>
                </div>
            </>
        )
}

export default Score;