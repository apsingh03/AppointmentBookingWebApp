import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

// const HOSTNAME = "https://appointment-booking-backend-k1fc.onrender.com";
const HOSTNAME = "http://localhost:8000";

// First, create the thunk
export const getUserWithAppointmentAsync = createAsyncThunk(
  "users/GET",
  async () => {
    const response = await axios.get(
      `${HOSTNAME}/user/getUserWithAppointments`
    );
    return response.data;
  }
);

export const addUserWithAppointmentIdAsync = createAsyncThunk(
  "users/create",
  async ({ name, email, appointment_id }) => {
    const response = await axios.post(`${HOSTNAME}/user/addUsers`, {
      name: name,
      email: email,
      appointment_id: appointment_id,
    });
    // console.log( "slice " , name, email , appointment_id , response )
    return response.data;
  }
);

export const UsersSlice = createSlice({
  name: "UsersSlice",
  initialState,
  //   reducers: {
  //     increment: (state) => {
  //       // Redux Toolkit allows us to write "mutating" logic in reducers. It
  //       // doesn't actually mutate the state because it uses the Immer library,
  //       // which detects changes to a "draft state" and produces a brand new
  //       // immutable state based off those changes
  //       state.value += 1
  //     },
  //     decrement: (state) => {
  //       state.value -= 1
  //     },
  //     incrementByAmount: (state, action) => {
  //       state.value += action.payload
  //     },
  //   },

  extraReducers: (builder) => {
    builder
      .addCase(getUserWithAppointmentAsync.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(getUserWithAppointmentAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getUserWithAppointmentAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addUserWithAppointmentIdAsync.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(addUserWithAppointmentIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.type === "users/create/fulfilled") {
          alert("Appointment Booked");
        }
        // console.log(action.payload);
        state.data.push(action.payload);
      })

      .addCase(addUserWithAppointmentIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = UsersSlice.actions

export default UsersSlice.reducer;
