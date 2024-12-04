import React from "react";

function Message(props){
    if(props.text === "p1w")
        return (
            <>
                <div className="container my-3 winner x">
                    <h3>{props.p1}</h3>
                </div>
            </>
        )
    if(props.text == "p2w")
        return (
            <>
                <div className="container my-3 winner o">
                    <h3>{props.p2}</h3>
                </div>
            </>
        )
    if(props.text === "d")
        return (
            <>
                <div className="container my-3 draw">
                    <h3>Draw !!</h3>
                </div>
            </>
        )
    else
        return (
            <>
                <div className="container my-3 opacity-0">
                    <h3>{props.text}</h3>
                </div>
            </>
        )
}

export default Message;