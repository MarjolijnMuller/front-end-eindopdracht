import React from 'react';
import './InnerContainer.css'

function InnerContainer(props) {
    let className = 'inner-container';

    if (props.classNameAdd) {
        className += '-' + props.classNameAdd;
    }
    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export default InnerContainer;