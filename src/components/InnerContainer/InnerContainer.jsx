import React from 'react';
import './InnerContainer.css'

function InnerContainer(props) {
    return (
        <div className="inner-container">
            {props.children}
        </div>
    )
}

export default InnerContainer;