import React, { useEffect, useState } from 'react';
import { BiHome } from "react-icons/bi";
import Searchable from 'react-searchable-dropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Form, Button } from 'react-bootstrap';
import validator from "validator";
import './PartnerForm.css';
import Axios from "axios";
import jwt_decode from 'jwt-decode';

function PartnerFormEdit() {


    const Dlocation = useLocation();
    const opp_id = Dlocation.state;
    const changeOpp_id = opp_id + '';

    const Uid = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    const [fullname, Setfullname] = useState("");
    const [JobTitle, SetJobTitle] = useState("");
    const [position_level, Setposition_level] = useState("");
    const [required_yrs, Setrequired_yrs] = useState("");
    const [job_scope, Setjob_scope] = useState("");
    const [job_specialization, Setjob_specialization] = useState("");
    const [description, Setdescription] = useState("");
    const [location, Setlocation] = useState("");
    const [salary, Setsalary] = useState("");
    const [qualification, Setqualification] = useState("");
    const [additional_requirements, Setadditional_requirements] = useState("");
    const [Status, SetStatus] = useState("");
    const nav = useNavigate();


    useEffect(() => {

        if (Uid == "" || token == "" || Uid == undefined || token == undefined) {
            nav("../Login/PartnerLogin")
            window.location.reload();
        } else {

            var decoded = jwt_decode(token);

            if (decoded.id == Uid) {
                Axios.post("http://localhost:3001/LoginCheckPartner", {
                    user_id: Uid
                }).then((response) => {
                    Setfullname(response.data)
                })


                Axios.post("http://localhost:3001/PartnerJobAdListUpdate", {
                    user_id: Uid,
                    oid: opp_id
                }).then((response) => {
                    SetJobTitle(response.data[0].name)
                    Setposition_level(response.data[0].position_level)
                    Setrequired_yrs(response.data[0].required_yrs)
                    Setjob_scope(response.data[0].job_scope)
                    Setjob_specialization(response.data[0].industry)
                    Setdescription(response.data[0].description)
                    Setlocation(response.data[0].location)
                    Setsalary(response.data[0].salary)
                    Setqualification(response.data[0].qualification)
                    Setadditional_requirements(response.data[0].additional_requirements)
                })
            } else {
                nav("../Login/PartnerLogin")
                window.location.reload();
            }
        }
    }, [])


    const saveAndContinue = (e) => {

        if (
            !validator.isEmpty(Uid) &
            opp_id !== null
        ) {

            if (
                !validator.isEmpty(JobTitle) &
                !validator.isEmpty(job_scope) &
                !validator.isEmpty(description)
            ) {
                e.preventDefault()
                Axios.post("http://localhost:3001/LoginCheckPartner", {
                    user_id: Uid
                }).then((response) => {
                    Setfullname(response)
                    Axios.put("http://localhost:3001/JobAddFormUpdate", {
                        JobTitle: JobTitle,
                        fullname: fullname,
                        position_level: position_level,
                        required_yrs: required_yrs,
                        job_scope: job_scope,
                        job_specialization: job_specialization,
                        description: description,
                        location: location,
                        salary: salary,
                        qualification: qualification,
                        additional_requirements: additional_requirements,
                        Uid: Uid,
                        oid: opp_id
                    })
                    window.location.replace("../Partner/PartnerJobAd");


                })

            } else {
                e.preventDefault()
                SetStatus("Error : Missing Fields")
                var required = document.querySelectorAll("input[required]");

                required.forEach(function (element) {
                    if (element.value.trim() === "") {
                        element.style.backgroundColor = "#ffcccb";
                    } else {
                        element.style.backgroundColor = "white";
                    }
                });

            }
        } else {
            nav("../Partner/Partner")
        }

    };




    return (
        <div className='Container'>
            <div className='form_navbar'>
                <Navbar bg="dark" variant="dark">
                    <Nav.Link href="./Partner">
                        <div className="image_icon_nav">
                            <BiHome />
                        </div>
                    </Nav.Link>
                    <Nav className="me-auto">
                        <Nav.Link href="./PartnerJobAd">Job Ad</Nav.Link>
                        <Nav.Link href="./PartnerUserSearch">Search user</Nav.Link>
                        <Nav.Link href="./PartnerStats">Statics</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title={"Sign in as : " + fullname} id="basic-nav-dropdown">
                            <NavDropdown.Item href="./PartnerProfile">Edit profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar>
            </div>

            <div className='form_partner'>


                <h2>Job Ad details</h2>
                <Form>
                    <Form.Group controlId="JobTitle" style={{ marginTop: 30 }} >
                        <Form.Label className="label">Job Title</Form.Label>
                        <Form.Control
                            style={{ width: 380, color: "black" }}
                            type="text"
                            value={JobTitle}
                            name="JobTitle"
                            required
                            onChange={(e) => { SetJobTitle(e.target.value) }}
                        />
                    </Form.Group>

                    <Form.Group controlId="position_level" style={{ marginTop: 20 }}>
                        <Form.Label>Position Level</Form.Label>
                        <Form.Control className="dropdown_box" as="select" name="position_level" defaultValue={position_level} onChange={(e) => { Setposition_level(e.target.value) }} required>
                            <option selected value={position_level}>{position_level}</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Temporary">Temporary</option>
                            <option value="Internship">Internship</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="required_yrs" style={{ marginTop: 20 }}>
                        <Form.Label>Required Years of Experience</Form.Label>
                        <Form.Control className="dropdown_box" as="select" name="required_yrs" defaultValue={required_yrs} onChange={(e) => { Setrequired_yrs(e.target.value) }} required>
                            <option selected value={required_yrs}>{required_yrs}</option>
                            <option value="None">None</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="10+">10+</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="job_scope" style={{ marginTop: 20 }} >
                        <Form.Label className="job_scope">Job Highlights</Form.Label>
                        <Form.Control
                            style={{ width: 380, color: "black", height: 100 }}
                            value={job_scope}
                            maxlength="250"
                            name="job_scope"
                            required
                            autoComplete='off'
                            as="textarea"
                            onChange={(e) => { Setjob_scope(e.target.value) }}
                            rows={3}
                        />
                        <small id="passwordHelpInline" class="text-muted">
                            A short summary of the job. Maximum 250 characters.
                        </small>

                    </Form.Group>

                    <Form.Group controlId="job_specialization" style={{ marginTop: 20 }}>
                        <Form.Label>Related Industry</Form.Label>
                        <Searchable
                            value={job_specialization}
                            placeholder={job_specialization} // by default "Search"
                            notFoundText="No result found" // by default "No result found"
                            options={[{
                                value: 'All Job Specialization',
                                label: 'All Job Specialization'
                            }, {
                                value: 'Accounting/Finance',
                                label: 'Accounting/Finance'
                            }, {
                                value: 'Agriculture',
                                label: 'Agriculture'
                            }, {
                                value: 'Sales/Marketing',
                                label: 'Sales/Marketing'
                            }, {
                                value: 'Chemistry',
                                label: 'Chemistry'
                            }, {
                                value: 'Food/Delivery Service',
                                label: 'Food/Delivery Service'
                            }, {
                                value: 'Sales/Retail/Marketing',
                                label: 'Sales/Retail/Marketing'
                            }, {
                                value: 'Education/Training',
                                label: 'Education/Training'
                            }, {
                                value: 'Health Care/Nursing',
                                label: 'Health Care/Nursing'
                            }, {
                                value: 'Tourism/Hotel',
                                label: 'Tourism/Hotel'
                            }, {
                                value: 'Building/Construction',
                                label: 'Building/Construction'
                            }, {
                                value: 'Mechanical and electrical engineering',
                                label: 'Mechanical and electrical engineering'
                            }, {
                                value: 'Media',
                                label: 'Media'
                            }, {
                                value: 'Public service',
                                label: 'Public service'
                            }, {
                                value: 'IT/Technology',
                                label: 'IT/Technology'
                            }, {
                                value: 'Call centres/Telemarketing',
                                label: 'Call centres/Telemarketing'
                            }, {
                                value: 'Security',
                                label: 'Security'
                            }, {
                                value: 'Create/Design',
                                label: 'Create/Design'
                            }, {
                                value: 'Warehouse & Logistics',
                                label: 'Warehouse & Logistics'
                            }, {
                                value: 'Temporary/Events',
                                label: 'Temporary/Events'
                            }, {
                                value: 'F&B',
                                label: 'F&B'
                            }, {
                                value: 'Beauty & Wellness',
                                label: 'Beauty & Wellness'
                            }, {
                                value: 'Customer Service/Design',
                                label: 'Customer Service/Design'
                            }, {
                                value: 'Others',
                                label: 'Others'
                            }
                            ]}
                            onSelect={(e) => {
                                Setjob_specialization(e)
                            }}
                            listMaxHeight={140} //by default 140
                        />



                    </Form.Group>


                    <Form.Group controlId="description" style={{ marginTop: 20 }} >
                        <Form.Label className="description">Job Description</Form.Label>
                        <Form.Control
                            style={{ width: 380, color: "black", height: 100 }}
                            value={description}
                            name="description"
                            required
                            autoComplete='off'
                            as="textarea"
                            rows={8}
                            onChange={(e) => { Setdescription(e.target.value) }}
                        />
                        <small id="passwordHelpInline" class="text-muted">
                            Please provide a detail Job Description. Include duites, <br></br> responsibilites and requirements.
                        </small>
                    </Form.Group>


                    <Form.Group controlId="location" style={{ marginTop: 20 }}>
                        <Form.Label>Location</Form.Label>
                        <Searchable
                            value={location}
                            placeholder={location} // by default "Search"
                            notFoundText="No result found" // by default "No result found"
                            options={[{
                                value: 'Across Singapore',
                                label: 'Across Singapore'
                            }, {
                                value: 'Jurong East',
                                label: 'Jurong East'
                            }, {
                                value: 'Bukit Batok',
                                label: 'Bukit Batok'
                            }, {
                                value: 'Choa Chu Kang',
                                label: 'Choa Chu Kang'
                            }, {
                                value: 'Yew Tee',
                                label: 'Yew Tee'
                            }, {
                                value: 'Kranji',
                                label: 'Kranji'
                            }, {
                                value: 'Marsiling',
                                label: 'Marsiling'
                            }, {
                                value: 'Admiralty',
                                label: 'Admiralty'
                            }, {
                                value: 'Sembawang',
                                label: 'Sembawang'
                            }, {
                                value: 'Yishun',
                                label: 'Yishun'
                            }, {
                                value: 'Khatib',
                                label: 'Khatib'
                            }, {
                                value: 'Yio Chu Kang',
                                label: 'Yio Chu Kang'
                            }, {
                                value: 'Ang Mo Kio',
                                label: 'Ang Mo Kio'
                            }, {
                                value: 'Bishan',
                                label: 'Bishan'
                            }, {
                                value: 'Braddell',
                                label: 'Braddell'
                            }, {
                                value: 'Novena',
                                label: 'Novena'
                            }, {
                                value: 'Newton',
                                label: 'Newton'
                            }, {
                                value: 'Orchard',
                                label: 'Orchard'
                            }, {
                                value: 'Somerset',
                                label: 'Somerset'
                            }, {
                                value: 'Dhoby Ghaut',
                                label: 'Dhoby Ghaut'
                            }, {
                                value: 'City Hall',
                                label: 'City Hall'
                            }, {
                                value: 'Raffles Place',
                                label: 'Raffles Place'
                            }, {
                                value: 'Marina Bay',
                                label: 'Marina Bay'
                            }, {
                                value: 'Marina South Pier',
                                label: 'Marina South Pier'
                            }, {
                                value: 'Pasir Ris',
                                label: 'Pasir Ris'
                            }, {
                                value: 'Tampines',
                                label: 'Tampines'
                            }, {
                                value: 'Simei',
                                label: 'Simei'
                            }, {
                                value: 'Tanah Merah',
                                label: 'Tanah Merah'
                            }, {
                                value: 'Bedok',
                                label: 'Bedok'
                            }, {
                                value: 'Kembangan',
                                label: 'Kembangan'
                            }, {
                                value: 'Eunos',
                                label: 'Eunos'
                            }, {
                                value: 'Paya Lebar',
                                label: 'Paya Lebar'
                            }, {
                                value: 'Aljunied',
                                label: 'Aljunied'
                            }, {
                                value: 'Kallang',
                                label: 'Kallang'
                            }, {
                                value: 'Lavender',
                                label: 'Lavender'
                            }, {
                                value: 'Bugis',
                                label: 'Bugis'
                            }, {
                                value: 'City Hall',
                                label: 'City Hall'
                            }, {
                                value: 'Raffles Place',
                                label: 'Raffles Place'
                            }, {
                                value: 'Tanjong Pagar',
                                label: 'Tanjong Pagar'
                            }, {
                                value: 'Outram Park',
                                label: 'Outram Park'
                            }, {
                                value: 'Tiong Bahru',
                                label: 'Tiong Bahru'
                            }, {
                                value: 'Redhill',
                                label: 'Redhill'
                            }, {
                                value: 'Queenstown',
                                label: 'Queenstown'
                            }, {
                                value: 'Commonwealth',
                                label: 'Commonwealth'
                            }, {
                                value: 'Buona Vista',
                                label: 'Buona Vista'
                            }, {
                                value: 'Dover',
                                label: 'Dover'
                            }, {
                                value: 'Clementi',
                                label: 'Clementi'
                            }, {
                                value: 'Chinese Garden',
                                label: 'Chinese Garden'
                            }, {
                                value: 'Lakeside',
                                label: 'Lakeside'
                            }, {
                                value: 'Boon Lay',
                                label: 'Boon Lay'
                            }, {
                                value: 'Pioneer',
                                label: 'Pioneer'
                            }, {
                                value: 'Joo Koon',
                                label: 'Joo Koon'
                            }, {
                                value: 'Gul Circle',
                                label: 'Gul Circle'
                            }, {
                                value: 'Tuas Crescent',
                                label: 'Tuas Crescent'
                            }, {
                                value: 'Tuas West Road',
                                label: 'Tuas West Road'
                            }, {
                                value: 'Tuas Link',
                                label: 'Tuas Link'
                            }, {
                                value: 'Expo',
                                label: 'Expo'
                            }, {
                                value: 'Changi Airport',
                                label: 'Changi Airport'
                            }, {
                                value: 'HarbourFront',
                                label: 'HarbourFront'
                            }, {
                                value: 'Chinatown',
                                label: 'Chinatown'
                            }, {
                                value: 'Clarke Quay',
                                label: 'Clarke Quay'
                            }, {
                                value: 'Little India',
                                label: 'Little India'
                            }, {
                                value: 'Farrer Park',
                                label: 'Farrer Park'
                            }, {
                                value: 'Boon Keng',
                                label: 'Boon Keng'
                            }, {
                                value: 'Potong Pasir',
                                label: 'Potong Pasir'
                            }, {
                                value: 'Woodleigh',
                                label: 'Woodleigh'
                            }, {
                                value: 'Serangoon',
                                label: 'Serangoon'
                            }, {
                                value: 'Kovan',
                                label: 'Kovan'
                            }, {
                                value: 'Hougang',
                                label: 'Hougang'
                            }, {
                                value: 'Buangkok',
                                label: 'Buangkok'
                            }, {
                                value: 'Sengkang',
                                label: 'Sengkang'
                            }, {
                                value: 'Punggol',
                                label: 'Punggol'
                            }, {
                                value: 'Bras Basah',
                                label: 'Bras Basah'
                            }, {
                                value: 'Esplanade',
                                label: 'Esplanade'
                            }, {
                                value: 'Promenade',
                                label: 'Promenade'
                            }, {
                                value: 'Nicoll Highway',
                                label: 'Nicoll Highway'
                            }, {
                                value: 'Stadium',
                                label: 'Stadium'
                            }, {
                                value: 'Mountbatten',
                                label: 'Mountbatten'
                            }, {
                                value: 'Dakota',
                                label: 'Dakota'
                            }, {
                                value: 'MacPherson',
                                label: 'MacPherson'
                            }, {
                                value: 'Tai Seng',
                                label: 'Tai Seng'
                            }, {
                                value: 'Bartley',
                                label: 'Bartley'
                            }, {
                                value: 'Lorong Chuan',
                                label: 'Lorong Chuan'
                            }, {
                                value: 'Marymount',
                                label: 'Marymount'
                            }, {
                                value: 'Caldecott',
                                label: 'Caldecott'
                            }, {
                                value: 'Botanic Gardens',
                                label: 'Botanic Gardens'
                            }, {
                                value: 'Farrer Road	',
                                label: 'Farrer Road	'
                            }, {
                                value: 'Holland Village',
                                label: 'Holland Village'
                            }, {
                                value: 'one-north',
                                label: 'one-north'
                            }, {
                                value: 'Kent Ridge',
                                label: 'Kent Ridge'
                            }, {
                                value: 'Haw Par Villa',
                                label: 'Haw Par Villa'
                            }, {
                                value: 'Pasir Panjang',
                                label: 'Pasir Panjang'
                            }, {
                                value: 'Labrador Park',
                                label: 'Labrador Park'
                            }, {
                                value: 'Telok Blangah',
                                label: 'Telok Blangah'
                            }, {
                                value: 'Bayfront',
                                label: 'Bayfront'
                            }, {
                                value: 'Bukit Panjang',
                                label: 'Bukit Panjang'
                            }, {
                                value: 'Hillview',
                                label: 'Hillview'
                            }, {
                                value: 'Beauty World',
                                label: 'Beauty World'
                            }, {
                                value: 'King Albert Park',
                                label: 'King Albert Park'
                            }, {
                                value: 'Sixth Avenue',
                                label: 'Sixth Avenue'
                            }, {
                                value: 'Tan Kah Kee',
                                label: 'Tan Kah Kee'
                            }, {
                                value: 'Stevens',
                                label: 'Stevens'
                            }, {
                                value: 'Rochor',
                                label: 'Rochor'
                            }, {
                                value: 'Downtown',
                                label: 'Downtown'
                            }, {
                                value: 'Telok Ayer',
                                label: 'Telok Ayer'
                            }, {
                                value: 'Fort Canning',
                                label: 'Fort Canning'
                            }, {
                                value: 'Bencoolen',
                                label: 'Bencoolen'
                            }, {
                                value: 'Jalan Besar',
                                label: 'Jalan Besar'
                            }, {
                                value: 'Bendemeer',
                                label: 'Bendemeer'
                            }, {
                                value: 'Geylang Bahru',
                                label: 'Geylang Bahru'
                            }, {
                                value: 'Mattar',
                                label: 'Mattar'
                            }, {
                                value: 'Ubi',
                                label: 'Ubi'
                            }, {
                                value: 'Kaki Bukit',
                                label: 'Kaki Bukit'
                            }, {
                                value: 'Bedok North',
                                label: 'Bedok North'
                            }, {
                                value: 'Bedok Reservoir',
                                label: 'Bedok Reservoir'
                            }, {
                                value: 'Tampines West',
                                label: 'Tampines West'
                            }, {
                                value: 'Tampines East',
                                label: 'Tampines East'
                            }, {
                                value: 'Upper Changi',
                                label: 'Upper Changi'
                            }, {
                                value: 'Woodlands North',
                                label: 'Woodlands North'
                            }, {
                                value: 'Woodlands South',
                                label: 'Woodlands South'
                            }

                            ]}
                            onSelect={(e) => {
                                Setlocation(e)
                            }}

                            listMaxHeight={140} //by default 140
                        />
                        <small id="passwordHelpInline" class="text-muted">
                            Choose the nearest MRT.
                        </small>
                    </Form.Group>

                    <Form.Group controlId="salary" style={{ marginTop: 30 }} >
                        <Form.Label className="salary">Salary</Form.Label>
                        <Form.Control
                            style={{ width: 380, color: "black" }}
                            type="number"
                            value={salary}
                            name="salary"
                            pattern="[0-9]*"
                            required
                            onChange={(e) => { Setsalary(e.target.value + "") }}
                        />
                    </Form.Group>


                    <Form.Group controlId="qualification" style={{ marginTop: 30 }}>
                        <Form.Label>Required Qualifaction</Form.Label>
                        <Form.Control className="dropdown_box" as="select" name="qualification" defaultValue={qualification} onChange={(e) => { Setqualification(e.target.value) }} required>
                            <option selected value={qualification}>{qualification}</option>
                            <option value="None">None</option>
                            <option value="O-level">GCE 'O' Level</option>
                            <option value="N-level">GCE 'N' Level</option>
                            <option value="A-level">GCE 'A' Level</option>
                            <option value="Diploma">Diploma/Degree</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Master">Master</option>
                            <option value="PhD">PhD</option>
                            <option value="Others">Others</option>
                        </Form.Control>

                    </Form.Group>


                    <Form.Group controlId="additional_requirements" style={{ marginTop: 20 }} >
                        <Form.Label className="additional_requirements">Additional Requirements</Form.Label>
                        <small id="passwordHelpInline" className="optional_text">
                            Optional*
                        </small>
                        <Form.Control
                            style={{ width: 380, color: "black", height: 100 }}
                            value={additional_requirements}
                            name="additional_requirements"
                            autoComplete='off'
                            as="textarea"
                            rows={8}
                            onChange={(e) => { Setadditional_requirements(e.target.value) }}
                        />

                    </Form.Group>

                    <Button variant="primary" onClick={saveAndContinue} style={{ marginTop: 25, marginLeft: 120 }}>Confirm</Button>
                    <p style={{ marginTop: 30, color: 'red', textAlign: 'center' }}>{Status}</p>
                </Form>


            </div>


        </div>
    );
}


export default PartnerFormEdit;