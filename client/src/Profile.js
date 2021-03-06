import React, { useEffect, useState } from "react";
import NavbarComp from "./Components/NavBar/NavbarComp";
import Axios from "axios";
import './EditProfile.css'
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function Profile(){

    const { userId } = useParams();
   
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [items, setItems] = useState([]);
    const [jobData, setFav] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/profile_get_fav", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }).then((response) => {
            const user_data = parseInt(window.localStorage.getItem("Uid"));
            const fav = response.data.filter((x) => {
               return x.user_id === user_data
            })
            console.log("get_Favor", fav)
          const jobs = JSON.parse(window.localStorage.getItem("jobData"));
          const favjob = jobs.filter((x) => {
            return fav.find((a) => a.opp_id === x.opp_id)
          })
          console.log("FAVJOB", favjob);
          const favoriteJobs = favjob.map(x =>{
            const favjob = fav.find(y => y.opp_id === x.opp_id)
            x.idFav = favjob.idFav
            return x
          })
          setFav(favoriteJobs);   
        });
      }, []);

      const profile_delete_fav = (id) => {
        //  console.log(JSON.parse(localStorage.getItem("user_data")).result[0].user_id) 
        Axios.post('http://localhost:3001/profile_delete_fav',{
            // user_id: JSON.parse(localStorage.getItem("user_data")).result[0].user_id,
            // opp_id: id
            idFav: id
        }, 
        {

          }).then((response) => {

            console.log(response);
          });
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/users/' + userId).then(
            (response) => {
                setIsLoaded(true);
                console.log(response.status);

                setIsError(false);
                response.data.dob = response.data.dob.slice(0,10);
                setItems(response.data);
            }, (error) =>{
                setIsLoaded(true);
                setIsError(true);
            }
        )
    }, []);

    if(!isLoaded)
    {
        return(
            <div>
            <NavbarComp />
            <div className="editProfile">
                <h1>Your Profile</h1>
                <div>loading!</div>
            </div>
            </div>
        );
    }
    else
    {
        if(isError)
            return(<div><NavbarComp />error</div>);

        return(
        <div>
            <NavbarComp />
            <div className="editProfile">
                <h1>{items.full_name}'s Profile</h1>
                <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <div style={{flexGrow: "1", paddingRight: "1em"}}>
                        <div className="editProfileSection">
                            <h1>{items.full_name}</h1>
                                <div>Gender: {items.gender}</div>
                                <div>Country: {items.country}</div>
                                <div>Date of Birth: {items.dob}</div>
                        </div>
                        {localStorage.getItem("Uid") == userId ? <Button variant="warning">
                            <Link to="/profile/edit">Edit</Link>
                        </Button>: null}
                    </div>
                    <div style={{flexGrow: "3"}}>
                        <div className="editProfileSection">
                            <h1>About</h1>
                            <textarea style={{width: "100%"}} id="bio" name="bio" readOnly defaultValue={items.user_bio}></textarea>
                        </div>
                        <div className="editProfileSection">
                            <h1>Contact Info</h1>
                            <div>Email: {items.email}</div>
                            <div>Contact Number: {items.contact_number}</div>
                        </div>
                        <div className="editProfileSection">
                            <h1>Additional Info</h1>
                            <div>Education: {items.education}</div>
                            <div>Citizenship: {items.citizenship}</div>
                            <div>Address: {items.address}</div>
                            <div>Postal Code: {items.postalcode}</div>
                        </div>
                    </div>
                </div>
            </div>
            {jobData.map((x) => (
                <div
                  className="col-md-5 col-lg-11 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="service-item rounded overflow-hidden">
                    <img
                      className="img-fluid"
                      src="img/img-600x400-1.jpg"
                      alt=""
                    />
                    <div className="position-relative p-4 pt-0">
                      <div className="service-icon">
                        <i className="fa fa-solar-panel fa-3x"></i>
                      </div>
                      <div class="container p-5 my-5 bg-dark text-white">
                        <h4 className="mb-3"> Name: {x.name}</h4>
                        <p>Company Name: {x.company_name}</p>
                        <p>Job Position: {x.position_level}</p>
                        <p>Location: {x.location}</p>
                        <p>salary: ${x.salary}</p>
                        {/* <a className="small fw-medium" href="">
                    Read More<i className="fa fa-arrow-right ms-2"></i>
                  </a> */}
                        <Button
                          variant="warning"
                          onClick={ (e) =>{
                            e.preventDefault()
                            profile_delete_fav(x.idFav)
                          } 

                          }
                        
                        >
                            
                          <Link to="/JobListing">Delete Favorite</Link>
                        </Button>
                      </div>
                      {/* <Collapse in={open}>
                                        <div id="example-collapse-text">
                                            <p>
                                                ID: {x.opp_id}
                                            </p>
                                            <p>
                                                Years to serve: {x.required_yrs}
                                            </p>
                                            <p>
                                                Industry for {x.name}: {x.industry}
                                            </p>
                                            <p>
                                                Job salary for {x.name}: ${x.salary}
                                            </p>
                                            <p>
                                                Job qualification for {x.name}: {x.qualification}
                                            </p>
                                            <p>
                                                Any Additional requirements: {x.additional_requirements}
                                            </p>
                                            <p>
                                                Socpe for {x.name}: {x.job_scope}
                                            </p>
                                            <p>
                                                Job description: {x.description}
                                            </p>
                                        </div>
                                    </Collapse> */}
                      <div></div>

                    </div>
                  </div>
                </div>
              ))}
        </div>
        )
    }
}
// delete all of this
export default Profile;