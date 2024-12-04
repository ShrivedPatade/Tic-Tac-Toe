import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Home (props) {
    const navigate = useNavigate();
    const handleNavigation = (route) => {
        navigate(route);
    }
    return(
        <>
            <div className="choice">
                <div className="">
                    <img className="mx-3" src={require("../Assets/pvp.png")} alt="pvp.png" width='200' height='200'></img>
                    <img className="mx-5" src={require("../Assets/pvc.png")} alt="pvc.png" width='200' height='200'></img>
                </div>
                <button type="button" className="btn bpvp hover: mx-5" data-toggle="button" aria-pressed="false" onClick={()=>{handleNavigation('/pvp')}}>Player VS Player</button> 
                <button type="button" className="btn bpvc mx-3" data-toggle="button" aria-pressed="false" onClick={()=>{handleNavigation('/pvc')}}>Player VS Computer (α-β pruning)</button> 
            </div>
        </>
    )
}

export default Home;