import React, { useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAdminAppointmentsAsync } from "../redux/slice/AdminTimingSlice";
import { RotatingLines } from "react-loader-spinner";

const AdminCheckAppointments = () => {
  const dispatch = useDispatch();

  const getAdminAppointments = useSelector((state) => state.adminTiming);

  useEffect(() => {
    dispatch(getAdminAppointmentsAsync());
  }, []);

  return (
    <>
      <Header />

      <div className="text-center" style={{ height: "25px" }}>
        {getAdminAppointments.isLoading === true ? (
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

      <div className="p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              {/* <th scope="col">id</th> */}
              <th scope="col">Timing</th>
              <th scope="col">Total Appointments</th>
              <th scope="col">With Whom</th>
              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {getAdminAppointments.data &&
              getAdminAppointments.data.map((data, index) => {
                if (data.users && data.users.length > 0) {
                  return (
                    <tr key={data.id}>
                      <th scope="row"> {index + 1} </th>
                      {/* <td>{data.id}</td> */}
                      <td>{data.time}</td>
                      <td> {data.users.length} </td>
                      <td>
                        {data.users.map((users) => {
                          return (
                            <b key={users.id}>
                              <span title={users.id + " " + users.email}>
                                {" "}
                                {users.name} {" , "}{" "}
                              </span>
                            </b>
                          );
                        })}
                      </td>

                      {/* <td>
                                <button
                                  className="btn btn-primary btn-md  mx-4"
                                 
                                >
                                  {" "}
                                  Edit{" "}
                                </button>
                                <button
                                  className="btn btn-danger btn-md"
                                
                                >
                                  {" "}
                                  Delete{" "}
                                </button>
                              </td> */}
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminCheckAppointments;
