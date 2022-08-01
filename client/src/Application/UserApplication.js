import Axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react"

import './Application.css'
import NavbarComp from "../Components/NavBar/NavbarComp";
import { Button } from "react-bootstrap";

function UserApplication(){

    const { oppId } = useParams();

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

        if(selectedFile == null)
        {
            window.alert('please provide your resume');
            return;
        }

        const f = new FormData();

        f.append('File', selectedFile);

        Axios.post('http://localhost:3001/opportunity/' + oppId + '/apply/', f, {
            headers:{
                "Content-Type": "multipart/form-data",
                "x-access-token": localStorage.getItem("token"),
            }
        }).then(
            (response) => {
                window.alert('success!');
            },(error) => {
                console.log(error);
                window.alert('something went wrong');
            }

        )
	};

    useEffect(() => {

        Axios.get('http://localhost:3001/opportunity/' + oppId).then(
            (response) => {
                setIsLoaded(true);
                console.log(response.status);

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
        return(<div><NavbarComp /><div class="container p-5 my-5 bg-dark  text-white">loading</div></div>);
    }
    else
    {
        if(!isError)
        {
            return(
                <div>
                <NavbarComp />
                <div class="container p-5 my-5 bg-dark  text-white">
                    <h1>Application For</h1>
                    <h2>({items.name})</h2>
                    <ul className="Details">
                        <li>{items.job_scope}</li>
                        <li>{items.description}</li>
                        <li>{items.sub_description}</li>
                    </ul>
                    <div>
                        <span>Upload Your Resume (.pdf only): </span>
                        <input type="file" onChange={changeHandler} />
                    </div>
                    <button onClick={handleSubmission} class="btn btn-primary">
                        Submit Application
                    </button>
                    <Button variant="danger"
                    >
                        <Link to={"/jobDiscription"}>Back</Link>
                    </Button>
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

export default UserApplication;