import React from "react";

import errorImg from './NotFound.png'
import './ErrorFallback.css'

function NotFound(props){
    return(
        <div className="ErrorContent" style={{
                color: '#000000',
                height: '75vh'
            }}>
            <img src={errorImg} alt={'error'} style={{paddingBottom:'30px'}}></img>
            <h1>404: That URL does not exist</h1>
            <div>The page may have been moved or deleted</div>
            <div><a href="/">return to homepage</a></div>
        </div>
    );
}

export default NotFound;