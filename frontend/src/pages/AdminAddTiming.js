import React, { useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addTimingAsync,
  deleteTimingAsync,
  getTimingsAsync,
  updateTimingAsync,
} from "../redux/slice/AdminTimingSlice";

import { RotatingLines } from "react-loader-spinner";

const AdminDashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTimingRedux = useSelector((state) => state.adminTiming);

  // console.log( getTimingRedux );

  function handleSubmit(e) {
    e.preventDefault();

    const time = e.target.selectTimeZone.value;
    const slots = e.target.slots.value;

    dispatch(
      addTimingAsync({
        time: time,
        slots: slots,
      })
    );

    // console.log( "submit" , time , slots )
  }

  function onEditFunc(e, id, time, slots) {
    document.querySelector("#selectTimeZone").value = time;
    document.querySelector("#slots").value = slots;

    // dispatch( updateTimingAsync({
    //     id : id,
    //     time: time,
    //     slots: slots
    // }) )

    dispatch(deleteTimingAsync({ id: id }));
  }

  useEffect(() => {
    dispatch(getTimingsAsync());
  }, []);

  return (
    <>
      <Header />

      <main>
        <div className="p-4">
          <h4 className="text-center mx-3">Add Timings</h4>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-sm-5 mt-2">
                <label htmlFor="selectTimeZone">Select Timings</label>

                <select
                  required
                  className="form-select"
                  id="selectTimeZone"
                  name="selectTimeZone"
                >
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                  <option value="9:00 PM">9:00 PM</option>
                  <option value="10:00 PM">10:00 PM</option>
                  <option value="11:00 PM">11:00 PM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="1:00 AM">1:00 AM</option>
                  <option value="2:00 AM">2:00 AM</option>
                  <option value="3:00 AM">3:00 AM</option>
                  <option value="4:00 AM">4:00 AM</option>
                  <option value="5:00 AM">5:00 AM</option>
                  <option value="6:00 AM">6:00 AM</option>
                  <option value="7:00 AM">7:00 AM</option>
                  <option value="8:00 AM">8:00 AM</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                </select>
              </div>

              <div className="col-12 col-sm-5">
                <div className="mb-3">
                  <label htmlFor="slots" className="form-label">
                    How Many Slots
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="slots"
                    min={1}
                    required
                    name="slots"
                  />
                </div>
              </div>

              <div className="col-12 col-sm-2 mt-sm-4">
                <button type="submit" className="btn btn-primary mt-sm-2">
                  ADD
                </button>
              </div>
            </div>
          </form>
        </div>

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

        <div className="p-4">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">id</th>
                <th scope="col">Timing</th>
                <th scope="col">Total Available Slots</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {getTimingRedux.data &&
                getTimingRedux.data.map((data, index) => {
                  return (
                    <tr key={data.id}>
                      <th scope="row"> {index + 1} </th>
                      <td>{data.id}</td>
                      <td>{data.time}</td>
                      <td> {data.slots} </td>
                      <td>
                        <button
                          className="btn btn-primary btn-md  mx-4"
                          onClick={(e) =>
                            onEditFunc(e, data.id, data.time, data.slots)
                          }
                        >
                          {" "}
                          Edit{" "}
                        </button>
                        <button
                          className="btn btn-danger btn-md"
                          onClick={() =>
                            dispatch(deleteTimingAsync({ id: data.id }))
                          }
                        >
                          {" "}
                          Delete{" "}
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default AdminDashBoard;
