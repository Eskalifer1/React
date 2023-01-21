import React from "react";
import preloader from "../../../images/Loading_icon.gif"

const Preloader: React.FC = () => {
    return (
        <img src={preloader} className='preloader' alt="Loading" />
    )
}

export default Preloader;