import React, {useContext, useState} from 'react';
import './ToggleSwitch.css';
import {SquaresFour, SquareSplitVertical} from "@phosphor-icons/react";
import {MovieContext} from "../../context/MovieContext.jsx";
import {ViewContext} from "../../context/ViewContext.jsx";

function ToggleSwitch(props) {
    const { movieSerieSwitch } = useContext(MovieContext);
    const { viewSwitch } = useContext(ViewContext);

    const [isOn, setIsOn] = useState(false);

    const handleClick = () => {
        if(props.className === "toggleSwitchView"){
            viewSwitch();
            setIsOn(!isOn);
        }
        if(props.className === "toggleSwitchMovie") {
            setIsOn(!isOn);
            movieSerieSwitch();
        }
    };

    return (
        <div className={props.className}>
            {props.className === "toggleSwitchView" ? <SquaresFour size={32} className="viewIcon"/> :
                <p>{props.firstTerm}</p>}
        <div
            className={`switch ${isOn ? 'on' : 'off'}`}
            onClick={handleClick}
        >
            <div className="circle"></div>
        </div>
            {props.className === "toggleSwitchView" ? <SquareSplitVertical size={32} className="viewIcon"/> :
                <p>{props.secondTerm}</p>}
        </div>
    );
}

export default ToggleSwitch;

