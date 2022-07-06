import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react"

import './Application.css'

function UserApplicationModal(props){

    const oppId = props.oppId;
    console.log(props);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [items, setItems] = useState([]);

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);


    const changeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
		setIsFilePicked(true);
	};

    const handleSubmission = () => {
        console.log("yeah");

        const f = new FormData();

        f.append('File', selectedFile);

        Axios.post('http://localhost:3001/opportunity/' + oppId + '/apply/', f, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then(
            (response) => {
                console.log('oka');
            },(error) => {
                console.log('no');
                console.log(error);
            }

        )
	};

    useEffect(() => {
        Axios.get('http://localhost:3001/opportunity/' + oppId).then(
            (response) => {
                setIsLoaded(true);
                console.log(response.status);
                console.log("asdasdasd");

                setIsError(false);
                setItems(response.data)
            }, (error) =>{
                setIsLoaded(true);
                setIsError(true);
            }
        )
    }, []);

    if(oppId == null)
    {
        throw new Error("No opportunity ID provided");
    }

    if(!isLoaded)
    {
        return(<div>loading</div>);
    }
    else
    {
        if(!isError)
        {
            return(
                <div className="Application">
                    <h1>Apply for Opportunity ({items.name})</h1>
                    <ul className="Details">
                        <li>{items.job_scope}</li>
                        <li>{items.description}</li>
                        <li>{items.sub_description}</li>
                    </ul>
                    <div>
                        Upload Resume
                        <input type="file" onChange={changeHandler} />
                        <button onClick={handleSubmission}>
                        Upload
                        </button>
                    </div>
                </div>
            );
        }
        else
        {
            return(<div>error</div>);
        }
    }
}

export default UserApplicationModal;