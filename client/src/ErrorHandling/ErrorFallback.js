import React from "react";

import errorImg from './ErrorRed.png'
import './ErrorFallback.css'

function ErrorFallback(props){
    document.body.style.backgroundColor = "#120a0d"
    return(
        <div className="ErrorContent">
            <img src={errorImg} alt={'error'} style={{paddingBottom:'30px'}}></img>
            <h1>internal server error</h1>
            <div>something went wrong</div>
            <div><a href="/">return to homepage</a></div>
        </div>
    );
}

export default ErrorFallback;