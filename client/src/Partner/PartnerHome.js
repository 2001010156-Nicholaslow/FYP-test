import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PartnerHome.css";
import { BiListUl, BiBarChartAlt2, BiSearchAlt, BiUser } from "react-icons/bi";
import { Form, Button, Alert } from "react-bootstrap";
import { GrStatusGood } from "react-icons/gr";
import { IoWarning } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Searchable from "react-searchable-dropdown";
import Popup from "./Popup";
import "./Popup.css";

function PartnerHome() {
  const Uid = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const [AlertMSG, SetAlertMSG] = useState("");
  const [AlertMSGStatus, SetAlertMSGStatus] = useState(false);
  const nav = useNavigate();
  const [help_type, Sethelp_type] = useState("");
  const [ErrTitle, SetErrTitle] = useState("");
  const [ErrDesc, SetErrDesc] = useState("");
  const [Status, SetStatus] = useState("");
  const [StatusBool, SetStatusBool] = useState(false);
  const [CReport, SetCReport] = useState("");
  const [CReportBool, SetCReportBool] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    SetStatusBool(false);
    SetCReportBool(false);
  };

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
  };

  const report = () => {
    if (help_type == "" || ErrTitle == "" || ErrDesc == "") {
      SetStatus("Missing Fields!");
      SetStatusBool(true);
    } else {
      SetStatusBool(false);
      Axios.post("http://localhost:3001/HelpReport", {
        user_id: Uid,
        report_type: help_type,
        report_title: ErrTitle,
        report_text: ErrDesc,
      }).then((response) => {
        if (response.data.message) {
          SetCReportBool(true);
          SetCReport(response.data.message);
        }
      });
    }
  };

  useEffect(() => {
    document.body.style.zoom = "90%";
    if (Uid == "" || token == "" || Uid == undefined || token == undefined) {
      nav("../Login/PartnerLogin");
      window.location.reload();
    } else {
      Axios.post("http://localhost:3001/CheckPartnerCompleted", {
        user_id: Uid,
      }).then((response) => {
        if (response.data.message) {
          SetAlertMSG(response.data.message);
          SetAlertMSGStatus(true);
        }
      });
    }
  }, []);

  return (
    <div className="RegisterHome">
      {AlertMSGStatus && (
        <Alert variant="warning">
          <b>
            <IoWarning />
            Warning!: Profile Verification
          </b>
          <br></br>
          <p className="text_alertmsg">
            {AlertMSG} To complete your profile{" "}
            <a href="../Partner/EditPartnerProfile">Click Here</a>
          </p>
        </Alert>
      )}

      <div className="panel">
        <div className="panel-body">
          <h2 style={{ padding: 8 }}>DashBoard</h2>
          <div className="stuff_todo">
            <div className="row_item">
              <div class="col-sm-12 col-md-6 col-lg-5">
                <h3>Select an option</h3>
              </div>
              <div className="pages_options">
                <div className="pages_icons">
                  <div className="icon">
                    <Link to="../Partner/PartnerJobAd" style={{ padding: 10 }}>
                      <button type="button">
                        <div className="image_icon">
                          <BiListUl />
                        </div>
                        <p>Job Ad</p>
                      </button>
                    </Link>

                    <Link
                      to="../Partner/PartnerUserSearch"
                      style={{ padding: 10 }}
                    >
                      <button type="button">
                        <div className="image_icon">
                          <BiSearchAlt />
                        </div>
                        <p>Applicants</p>
                      </button>
                    </Link>

                    <Link to="../Partner/PartnerStats" style={{ padding: 10 }}>
                      <button type="button">
                        <div className="image_icon">
                          <BiBarChartAlt2 />
                        </div>
                        <p>Stats</p>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="Profile_Edit">
                <div className="icon">
                  <Link to="../Partner/EditPartnerProfile" style={{ padding: 10 }}>
                    <button type="button">
                      <div className="image_icon">
                        <BiUser />
                      </div>
                      <p>Profile</p>
                    </button>
                  </Link>

                  <Link to="../" style={{ padding: 10 }}>
                    <button type="button" onClick={logout}>
                      <div className="image_icon">
                        <ImExit />
                      </div>
                      <p>Log out</p>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="button" className="button_popup_1" onClick={togglePopup}>
        report
      </button>
      {isOpen && CReportBool === true && (
        <Popup
          content={
            <>
              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f3f3f3",
                  fontWeight: "bold",
                }}
              >
                <div style={{ background: "blanchedalmond", padding: 3 }}>
                  <h2>Online Help Center</h2>
                  <p>Report any bugs/Errors</p>
                </div>
                <div className="image_icon">
                  <GrStatusGood />
                </div>

                {CReport}
                <Button
                  variant="primary"
                  onClick={togglePopup}
                  style={{ marginTop: 25 }}
                >
                  Back
                </Button>
              </div>
            </>
          }
          handleClose={togglePopup}
        />
      )}

      {isOpen && CReportBool === false && (
        <Popup
          content={
            <>
              <div style={{ background: "blanchedalmond", padding: 3 }}>
                <h2>Online Help Center</h2>
                <p>Report any bugs/Errors</p>
              </div>
              {StatusBool && <Alert variant="warning">{Status}</Alert>}
              <Form>
                <Form.Group controlId="ErrType" style={{ marginTop: 30 }}>
                  <Form.Label className="label">Type </Form.Label>
                  <Searchable
                    value={help_type}
                    placeholder="Search for help type" // by default "Search"
                    notFoundText="No result found" // by default "No result found"
                    required
                    options={[
                      {
                        value: "JobAd",
                        label: "Issues with Job Ad",
                      },
                      {
                        value: "Profile",
                        label: "Issues with Profile/Account",
                      },
                      {
                        value: "Applicants",
                        label: "Issues with Applicants",
                      },
                      {
                        value: "Reviews",
                        label: "Issues with Reviews",
                      },
                      {
                        value: "Bugs/Error",
                        label: "Bugs/Error",
                      },
                      {
                        value: "Others",
                        label: "Others",
                      },
                    ]}
                    onSelect={(e) => {
                      Sethelp_type(e);
                    }}
                    listMaxHeight={140} //by default 140
                  />
                </Form.Group>

                <Form.Group
                  controlId="ErrTitle"
                  style={{ marginTop: 30, width: "100%" }}
                >
                  <Form.Label className="label">Issues Headline</Form.Label>
                  <Form.Control
                    style={{ width: "100%", color: "black" }}
                    type="text"
                    value={ErrTitle}
                    name="ErrTitle"
                    required
                    onChange={(e) => {
                      SetErrTitle(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="ErrDesc" style={{ marginTop: 30 }}>
                  <Form.Label className="label">Description</Form.Label>
                  <Form.Control
                    style={{ color: "black", height: 80 }}
                    value={ErrDesc}
                    name="ErrDesc"
                    required
                    autoComplete="off"
                    as="textarea"
                    rows={6}
                    onChange={(e) => {
                      SetErrDesc(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
              <Button
                variant="primary"
                onClick={report}
                style={{ marginTop: 25 }}
              >
                Confirm
              </Button>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default PartnerHome;
