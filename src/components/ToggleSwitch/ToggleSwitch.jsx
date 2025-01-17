import React from 'react';
import './ToggleSwitch.css';

import {SquaresFour, SquareSplitVertical} from "@phosphor-icons/react";

function ToggleSwitch(props) {
    return (
        <div className={props.className}>
            {props.className==="toggleSwitchView" ? <SquaresFour size={32} className="viewIcon"/> : <p>{props.firstTerm}</p>}

            <label className="switch">

                <input type="checkbox"/>
                <span className="slider round"></span>

            </label>
            {props.className==="toggleSwitchView" ? <SquareSplitVertical size={32} className="viewIcon"/> : <p>{props.secondTerm}</p>}
        </div>
    )
}

export default ToggleSwitch;