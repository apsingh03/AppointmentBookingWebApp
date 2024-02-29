import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { decreaseSlotWhileAppointmentBookingAsync, getTimingsAsync } from "../redux/slice/AdminTimingSlice";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import {
  addUserWithAppointmentIdAsync,
  getUserWithAppointmentAsync,
} from "../redux/slice/UsersSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const getTimingRedux = useSelector((state) => state.adminTiming);
  const getUserAppointmentRedux = useSelector((state) => state.users);
  const [showModal, setshowModal] = useState(false);
  const [appointmentId, setappointmentId] = useState(0);
  const [slotTiming, setslotTiming] = useState("");

  // console.log(showModal);
  // console.log( "admin - " , getTimingRedux );

  useEffect(() => {
    dispatch(getTimingsAsync());
    dispatch(getUserWithAppointmentAsync());
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.fullName.value;
    const email = e.target.fullName.value;
    const appointment_id = appointmentId;
    // console.log( name , email , appointment_id );

    dispatch(
      addUserWithAppointmentIdAsync({
        name: name,
        email: email,
        appointment_id: appointment_id,
      })
    );

    dispatch( decreaseSlotWhileAppointmentBookingAsync({id : appointment_id }))
  }

  return (
    <>
      <Header />

      <section className=" row">
        <div className="col-3 col-md-3">
          <div
            style={{
              borderRight: "1px solid #ddd",
              height: "90vh",
              overflow: "hidden",
              backgroundColor: "black",
              overflowY: "scroll",
              scrollbarWidth: "thin",
              scrollbarColor: "green",
            }}
          >
            {getTimingRedux.data &&
              getTimingRedux.data.map((data) => {
                if (data.slots > 0) {
                  return (
                    <div
                      key={data.id}
                      className=" text-center"
                      onClick={(e) => [
                        setshowModal(true),
                        setappointmentId(data.id),
                        setslotTiming(data.time),
                      ]}
                      onDoubleClick={(e) => setshowModal(false)}
                      title="Appointment Schedule"
                      style={{
                        borderTop: "2px solid orange",
                        borderBottom: "2px solid orange",
                        marginBottom: "10px",
                        width: "100%",
                        height: "75px",
                        cursor: "pointer",
                        backgroundColor: "#fff",
                      }}
                    >
                      <p style={{ fontSize: "30px" }}>{data.time} </p>
                      <p
                        style={{
                          color: "green",
                          fontSize: "20px",
                          marginTop: "-20px",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        {data.slots} Available{" "}
                      </p>
                    </div>
                  );
                }
                
              })}
          </div>
        </div>

        <div className="col-3 col-md-9" style={{ backgroundColor: "#F1F2F4" }}>
          <div className="">
            <div className="text-center" style={{ height: "25px" }}>
              {getTimingRedux.isLoading === true ? (
                <RotatingLines
                  visible={true}
                  height="25"
                  width="25"
                  color="black"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : null}
            </div>

            <div>
              {showModal === true ? (
                <div
                  className="p-3 bg-white"
                  title="Book Your Appointment"
                  style={{
                    border: "1px solid #ddd",
                    boxShadow: "10px 12px 5px 0px rgba(199,199,199,1)",
                    width: "50%",
                  }}
                >
                  <div
                    title="Close It"
                    onClick={() => [setshowModal(false), setslotTiming("None")]}
                    style={{ float: "right" }}
                  >
                    <IoMdCloseCircle size={30} color="black" />
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-3">
                          <label htmlFor="fullName" className="form-label">
                            Your Full Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            required
                            name="fullName"
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="mb-3">
                          <label htmlFor="yourEmail" className="form-label">
                            Your Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="yourEmail"
                            min={1}
                            required
                            name="yourEmail"
                          />
                        </div>
                      </div>

                      <div className="col-12 row">
                        <div className="col-6">
                          <button
                            type="submit"
                            className="btn btn-primary mt-sm-2"
                          >
                            Book Appointment
                          </button>
                        </div>

                        <div className="col-6 mt-2">
                          <p>
                            You Selected <b>{slotTiming}</b>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              ) : null}
            </div>
          </div>

          {/* VERTICAL SXROLL BAR */}

          <div
            style={{
              marginTop: "10px",
              backgroundColor: "#212529",
              padding: "10px",
              width: "74vw",
            }}
          >
            <h5 className="text-center text-white">Your Scheduled Meetings</h5>

            <div
              style={{
                borderRight: "1px solid #ddd",
                height: "200px",
                width: "72vw",
                overflow: "hidden",
                backgroundColor: "black",
                overflowX: "scroll",
                scrollbarWidth: "thin",
                scrollbarColor: "green",
              }}
            >
              <div className="d-flex flex-row">
                {getUserAppointmentRedux.data &&
                  getUserAppointmentRedux.data.map((data) => {
                    return (
                      <div
                        key={data.id}
                        className=""
                        style={{ marginRight: "10px" }}
                      >
                        <div
                          className="bg-light text-center"
                          style={{
                            borderRadius: "10px",
                            width: "200px",
                            height: "180px",
                            padding: "5px",
                          }}
                        >
                          <p>
                            <b>Hi {data.name && data.name}</b>{" "}
                          </p>
                          <p>
                            {" "}
                            <b>
                              Email -{" "}
                              {data.email &&
                                data.email.substring(0, 20) + "..."}{" "}
                            </b>{" "}
                          </p>
                          <p>
                            {" "}
                            <b>
                              Time - {data.appointment && data.appointment.time}{" "}
                            </b>{" "}
                          </p>

                          <Link to="#" target="_blank">
                            {" "}
                            Click Here To Join{" "}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
