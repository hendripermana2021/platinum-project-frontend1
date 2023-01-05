import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper, Step } from "react-form-stepper";
import { MdDescription } from "react-icons/md";
import StepWizard from "react-step-wizard";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Table from "react-bootstrap/Table";

import "./action.css";

const ActionButtons = (props) => {
  const handleBack = () => {
    props.previousStep();
  };

  const handleNext = () => {
    props.nextStep();
  };

  const handleFinish = () => {
    props.lastStep();
  };

  return (
    <ButtonToolbar className="action-booking d-flex justify-content-center align-items-center">
      <ButtonGroup className="me-2 d-grid">
        {props.currentStep > 1 && (
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
        )}{" "}
      </ButtonGroup>
      <ButtonGroup className="d-grid">
        {props.currentStep < props.totalSteps && (
          <Button onClick={handleNext}>Next</Button>
        )}{" "}
      </ButtonGroup>
      <ButtonGroup className="me-2 d-grid">
        {props.currentStep === props.totalSteps && (
          <Button variant="danger" onClick={handleFinish}>
            Cancel
          </Button>
        )}{" "}
      </ButtonGroup>
      <ButtonGroup className="me-5 d-grid">
        {props.currentStep === props.totalSteps && (
          <Button variant="success" onClick={handleFinish}>
            Confirm
          </Button>
        )}{" "}
      </ButtonGroup>
    </ButtonToolbar>
  );
};

const One = (props) => {
  const user = props.user;

  const validate = () => {
    props.nextStep();
  };

  return (
    <div className="container booking mt-5">
      <div className="row row-cols-md-12 row-cols-1 d-flex justify-content-center align-items-center hero mb-5">
        <div className="container card">
          <div className="card-header">
            <h5 className="text-center">Passenger Order Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="firstname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="form-control"
                  value={user.firstname}
                  disabled
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="form-control"
                  value={user.lastname}
                  disabled
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="email" className="form-label">
                  Gender
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  value={user.gender}
                  disabled
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="mphone" className="form-label">
                  Mobile Phone
                </label>
                <input
                  type="text"
                  id="mphone"
                  className="form-control"
                  value={user.phone}
                  disabled
                />
              </div>
              <div className="col-lg-6-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  value={user.email}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="container mt-5 steep">
                <ActionButtons {...props} nextStep={validate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Two = (props) => {
  // const [info2, setInfo2] = useState({});
  const [error, setError] = useState("");
  const bookingData = props.bookingData;

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const validate2 = () => {
    // if (!info2.age) setError("Age is mandatory field");
    // else {
    //   setError("");
    //   props.nextStep();
    //   props.userCallback(info2);
    // }
    setError("");
    props.nextStep();
    // props.userCallback(info2);
  };

  let passCounter = 1;
  return (
    <div className="container booking">
      <div className="row row-cols-md-12 row-cols-1 d-flex justify-content-center align-items-center hero mb-5">
        <span style={{ color: "red" }}>{error}</span>
        <div className="container card ">
          <div className="card-header">
            <h5 className="text-center">Detail Information</h5>
          </div>
          <div className="card-body">
            <div className="container text-center">
              {bookingData.secondTicket.ticket_id !== "" ? (
                <>
                  <h2 className="mt-3">Round Trip</h2>
                </>
              ) : (
                <>
                  <h2 className="mt-3">One Trip</h2>
                </>
              )}
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="departure" className="form-label">
                  Sector{" "}
                  {bookingData.secondTicket.ticket_id !== ""
                    ? "First Ticket"
                    : ""}
                </label>
                <input
                  type="text"
                  id="departureDate"
                  className="form-control text-center"
                  value={
                    bookingData.secondTicket.ticket_id !== ""
                      ? bookingData.flightData.departureAirport +
                        " - " +
                        bookingData.flightData.arrivalAirport
                      : bookingData.flightData.departureAirport +
                        " - " +
                        bookingData.flightData.arrivalAirport
                  }
                  disabled
                />
              </div>
              {bookingData.secondTicket.ticket_id !== "" ? (
                <div className="col-md-6">
                  <label htmlFor="departure" className="form-label">
                    Sector Second Ticket
                  </label>
                  <input
                    type="text"
                    id="departureDate"
                    className="form-control text-center"
                    value={
                      bookingData.flightData.departureAirport +
                      " - " +
                      bookingData.flightData.arrivalAirport
                    }
                    disabled
                  />
                </div>
              ) : (
                ""
              )}
              <div className="col-md-6">
                <label htmlFor="departure" className="form-label">
                  Class Seat
                </label>
                <input
                  type="text"
                  id="departureDate"
                  className="form-control text-center"
                  value={bookingData.flightData.class}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="departure" className="form-label">
                  Departure Date - Departure Time{" "}
                  {bookingData.secondTicket.ticket_id !== ""
                    ? "First Ticket"
                    : ""}
                </label>
                <input
                  type="text"
                  id="departureDate"
                  className="form-control text-center"
                  value={
                    new Date(
                      bookingData.flightData.departureDate
                    ).toLocaleDateString() +
                    " - " +
                    bookingData.flightData.departureTime
                  }
                  disabled
                />
              </div>
              {bookingData.secondTicket.ticket_id !== "" ? (
                <div className="col-md-6">
                  <label htmlFor="departure" className="form-label">
                    Departure Date - Departure Time Second Ticket
                  </label>
                  <input
                    type="text"
                    id="departureDate"
                    className="form-control text-center"
                    value={
                      new Date(
                        bookingData.flightData.departureDate
                      ).toLocaleDateString() +
                      " - " +
                      bookingData.flightData.departureTime
                    }
                    disabled
                  />
                </div>
              ) : (
                ""
              )}
              <div className="col-md-6">
                <label htmlFor="arrival" className="form-label">
                  Arrival Date - Arrival Time{" "}
                  {bookingData.secondTicket.ticket_id !== ""
                    ? "First Ticket"
                    : ""}
                </label>
                <input
                  type="text"
                  id="arrival"
                  className="form-control text-center"
                  value={
                    new Date(
                      bookingData.flightData.arrivalDate
                    ).toLocaleDateString() +
                    " - " +
                    bookingData.flightData.arrivalTime
                  }
                  disabled
                />
              </div>
              {bookingData.secondTicket.ticket_id !== "" ? (
                <div className="col-md-6">
                  <label htmlFor="arrival" className="form-label">
                    Arrival Date - Arrival Time Second Ticket
                  </label>
                  <input
                    type="text"
                    id="arrival"
                    className="form-control text-center"
                    value={
                      new Date(
                        bookingData.flightData.arrivalDate
                      ).toLocaleDateString() +
                      " - " +
                      bookingData.flightData.arrivalTime
                    }
                    disabled
                  />
                </div>
              ) : (
                ""
              )}
              <div className="col-md-6">
                <label htmlFor="psg" className="form-label">
                  Total Passenger
                </label>
                <input
                  type="text"
                  id="psg"
                  className="form-control text-center"
                  value={bookingData.passengerData.length}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="psg" className="form-label">
                  Total Price
                </label>
                <input
                  type="text"
                  id="psg"
                  className="form-control text-center"
                  value={formatter.format(bookingData.flightData.price)}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container card ">
          <div className="card-header">
            <h5 className="text-center">Passenger Detail Information</h5>
          </div>
          <div className="card-body">
            <div class="table-responsive margin-bottom-2x">
              <Table className="table margin-bottom-2x">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>ID Type</th>
                    <th>ID Number</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(bookingData.passengerData).map((pass) => (
                    <tr>
                      <td>{passCounter++}</td>
                      <td>{pass.firstname}</td>
                      <td>{pass.lastname}</td>
                      <td>{pass.email}</td>
                      <td>{pass.age}</td>
                      <td>{pass.idType}</td>
                      <td>{pass.idNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="container mt-5 sleep">
          <ActionButtons {...props} nextStep={validate2} />
        </div>
      </div>
    </div>
  );
};

const Three = (props) => {
  const handleLastStep = () => {
    props.lastStep();
    props.completeCallback();
  };
  const user = props.user;
  const bookingData = props.bookingData;
  // Currency IDR Formatter
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  let passCounter = 1;
  return (
    <div className="container booking">
      <div className="row row-cols-md-12 row-cols-1 d-flex justify-content-center align-items-center hero mb-5">
        <div className="container card">
          <div className="card-header">
            <h5 className="text-center">Passenger Order Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="firstname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="form-control"
                  value={user.firstname}
                  disabled
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="form-control"
                  value={user.lastname}
                  disabled
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="email" className="form-label">
                  Gender
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  value={user.gender}
                  disabled
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="mphone" className="form-label">
                  Mobile Phone
                </label>
                <input
                  type="text"
                  id="mphone"
                  className="form-control"
                  value={user.phone}
                  disabled
                />
              </div>
              <div className="col-lg-6-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  value={user.email}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container card ">
          <div className="card-header">
            <h5 className="text-center">Detail Information</h5>
          </div>
          <div className="card-body">
            <div className="container text-center">
              {bookingData.secondTicket.ticket_id !== "" ? (
                <>
                  <h2 className="mt-3">Round Trip</h2>
                </>
              ) : (
                <>
                  <h2 className="mt-3">One Trip</h2>
                </>
              )}
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="departure" className="form-label">
                  Sector{" "}
                  {bookingData.secondTicket.ticket_id !== ""
                    ? "First Ticket"
                    : ""}
                </label>
                <input
                  type="text"
                  id="departureDate"
                  className="form-control text-center"
                  value={
                    bookingData.flightData.departureAirport +
                    " - " +
                    bookingData.flightData.arrivalAirport
                  }
                  disabled
                />
              </div>
              {bookingData.secondTicket.ticket_id !== "" ? (
                <div className="col-md-6">
                  <label htmlFor="departure" className="form-label">
                    Sector Second Ticket
                  </label>
                  <input
                    type="text"
                    id="departureDate"
                    className="form-control text-center"
                    value={
                      bookingData.flightData.departureAirport +
                      " - " +
                      bookingData.flightData.arrivalAirport
                    }
                    disabled
                  />
                </div>
              ) : (
                ""
              )}
              <div className="col-md-6">
                <label htmlFor="departure" className="form-label">
                  Class Seat
                </label>
                <input
                  type="text"
                  id="departureDate"
                  className="form-control text-center"
                  value={bookingData.flightData.class}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="departure" className="form-label">
                  Departure Date - Departure Time{" "}
                  {bookingData.secondTicket.ticket_id !== ""
                    ? "First Ticket"
                    : ""}
                </label>
                <input
                  type="text"
                  id="departureDate"
                  className="form-control text-center"
                  value={
                    new Date(
                      bookingData.flightData.departureDate
                    ).toLocaleDateString() +
                    " - " +
                    bookingData.flightData.departureTime
                  }
                  disabled
                />
              </div>
              {bookingData.secondTicket.ticket_id !== "" ? (
                <div className="col-md-6">
                  <label htmlFor="departure" className="form-label">
                    Departure Date - Departure Time Second Ticket
                  </label>
                  <input
                    type="text"
                    id="departureDate"
                    className="form-control text-center"
                    value={
                      new Date(
                        bookingData.flightData.departureDate
                      ).toLocaleDateString() +
                      " - " +
                      bookingData.flightData.departureTime
                    }
                    disabled
                  />
                </div>
              ) : (
                ""
              )}
              <div className="col-md-6">
                <label htmlFor="arrival" className="form-label">
                  Arrival Date - Arrival Time{" "}
                  {bookingData.secondTicket.ticket_id !== ""
                    ? "First Ticket"
                    : ""}
                </label>
                <input
                  type="text"
                  id="arrival"
                  className="form-control text-center"
                  value={
                    new Date(
                      bookingData.flightData.arrivalDate
                    ).toLocaleDateString() +
                    " - " +
                    bookingData.flightData.arrivalTime
                  }
                  disabled
                />
              </div>
              {bookingData.secondTicket.ticket_id !== "" ? (
                <div className="col-md-6">
                  <label htmlFor="arrival" className="form-label">
                    Arrival Date - Arrival Time Second Ticket
                  </label>
                  <input
                    type="text"
                    id="arrival"
                    className="form-control text-center"
                    value={
                      new Date(
                        bookingData.flightData.arrivalDate
                      ).toLocaleDateString() +
                      " - " +
                      bookingData.flightData.arrivalTime
                    }
                    disabled
                  />
                </div>
              ) : (
                ""
              )}
              <div className="col-md-6">
                <label htmlFor="psg" className="form-label">
                  Total Passenger
                </label>
                <input
                  type="text"
                  id="psg"
                  className="form-control text-center"
                  value={bookingData.passengerData.length}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="psg" className="form-label">
                  Total Price
                </label>
                <input
                  type="text"
                  id="psg"
                  className="form-control text-center"
                  value={formatter.format(bookingData.flightData.price)}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container card ">
          <div className="card-header">
            <h5 className="text-center">Passenger Detail Information</h5>
          </div>
          <div className="card-body">
            <div class="table-responsive margin-bottom-2x">
              <Table className="table margin-bottom-none">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>ID Type</th>
                    <th>ID Number</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(bookingData.passengerData).map((pass) => (
                    <tr>
                      <td>{passCounter++}</td>
                      <td>{pass.firstname}</td>
                      <td>{pass.lastname}</td>
                      <td>{pass.email}</td>
                      <td>{pass.age}</td>
                      <td>{pass.idType}</td>
                      <td>{pass.idNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="container mt-5 slaap">
          <ActionButtons {...props} lastStep={handleLastStep} />
        </div>
      </div>
    </div>
  );
};

const Sample = (props) => {
  const navigate = useNavigate();
  const [stepWizard, setStepWizard] = useState(null);
  const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const assignStepWizard = (instance) => {
    console.log(stepWizard);
    setStepWizard(instance);
  };

  const assignUser = (val) => {
    console.log("parent receive user callback", user);
    console.log(val);
    setUser((user) => ({
      ...user,
      ...val,
    }));
  };

  const handleStepChange = (e) => {
    console.log("step change");
    console.log(e);
    setActiveStep(e.activeStep - 1);
  };

  const handleComplete = () => {
    navigate("/users/payment");
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        <Step label="Passenger Information" children={<MdDescription />} />
        <Step label="Flight Information" />
        <Step label="Confirmation" />
      </Stepper>
      {/* NOTE: IMPORTANT !! StepWizard must contains at least 2 children components, else got error */}
      <StepWizard instance={assignStepWizard} onStepChange={handleStepChange}>
        <One userCallback={assignUser} user={props.user} />
        <Two userCallback={assignUser} bookingData={props.data} />
        <Three
          user={props.user}
          completeCallback={handleComplete}
          bookingData={props.data}
        />
      </StepWizard>
    </div>
  );
};

export default Sample;
