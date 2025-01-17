import './StarButton.css';
import React from "react";
import {Star} from "@phosphor-icons/react";

function StarButton() {
    const [star, setStar] = React.useState(false);

    function handleClick() {
        setStar(!star);
    }

    return (
        <button
            type="button"
            className="starButton"
            onClick={handleClick}
        >
            <Star size={30} weight={star ? "fill" : "regular"}
            className="star"/>
        </button>
    )
}

export default StarButton;