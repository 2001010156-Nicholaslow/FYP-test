import React from "react";
import { Link } from "react-router-dom";

function success(){
    return(
        <div>
            <h1>Success!</h1>
            <Link to="./Home" style={{ marginTop: 20 }}>return home</Link>
        </div>
    );
}

  
// delete all of this
export default success;