import React from 'react';
import './OuterContainer.css'

function OuterContainer(props) {
    return (
        <div className="outer-container">
            {props.children}
        </div>
    )
}

export default OuterContainer;