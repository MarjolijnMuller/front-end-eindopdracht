import React from 'react';
import './ToggleSwitch.css';
import viewMovieCartLarge from '../../assets/viewMovieCartLarge.svg'
import viewMovieCartSmall from '../../assets/viewMovieCartSmall.svg'

function ToggleSwitch(props) {
    return (
        <div className={props.className}>
            {props.className==="toggleSwitchView" ? <img src={viewMovieCartSmall} className="viewIcon"/> : <p>{props.firstTerm}</p>}

            <label className="switch">

                <input type="checkbox"/>
                <span className="slider round"></span>

            </label>
            {props.className==="toggleSwitchView" ? <img src={viewMovieCartLarge} className="viewIcon"/> : <p>{props.secondTerm}</p>}
        </div>
    )
}

export default ToggleSwitch;