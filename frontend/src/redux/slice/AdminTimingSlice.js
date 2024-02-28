import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const HOSTNAME = "https://appointment-booking-backend-k1fc.onrender.com";

// https://appointment-booking-backend-k1fc.onrender.com

// First, create the thunk
export const getTimingsAsync = createAsyncThunk(
  "timing/getTiming",
  async () => {
    const response = await axios.get(`${HOSTNAME}/appointment/getAppointments`);
    return response.data;
  }
);

// http://localhost:8000/appointment/getAppointmentUsers

export const getAdminAppointmentsAsync = createAsyncThunk(
  "timing/getAppointments",
  async () => {
    const response = await axios.get(
      `${HOSTNAME}/appointment/getAppointmentUsers`
    );
    return response.data;
  }
);

export const addTimingAsync = createAsyncThunk(
  "timing/create",
  async ({ time, slots }) => {
    // console.log( "slice " , time , slots )

    const response = await axios.post(
      `${HOSTNAME}/appointment/addAppointment`,
      {
        time: time,
        slots: slots,
      }
    );
    return response.data;
  }
);

export const deleteTimingAsync = createAsyncThunk(
  "timing/delete",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/appointment/deleteAppointment/${id}`
      );

      //   console.log("response ", response);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateTimingAsync = createAsyncThunk(
  "timing/update",
  async ({ id, time, slots }) => {
    try {
      const response = await axios.put(
        `${HOSTNAME}/appointment/updateAppointment/${id}`,
        {
          time,
          time,
          slots: slots,
        }
      );

      // console.log("response ", response);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const AdminTimingSlice = createSlice({
  name: "AdminTimingSlice",
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
      .addCase(getTimingsAsync.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(getTimingsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getTimingsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getAdminAppointmentsAsync.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(getAdminAppointmentsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getAdminAppointmentsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(addTimingAsync.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(addTimingAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
        state.data.push(action.payload);
      })

      .addCase(addTimingAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteTimingAsync.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(deleteTimingAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        const { id } = action.meta.arg;

        const index = state.data.findIndex((data) => {
          return data.id === id;
        });
        state.data.splice(index, 1);
        // console.log("Delete payload ", action.payload);
        // console.log("Delete payload ", state);
      })

      .addCase(deleteTimingAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(updateTimingAsync.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(updateTimingAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        const { id } = action.meta.arg;

        const index = state.data.findIndex((data) => {
          return data.id === id;
        });
        state.data.splice(index, 1);
      })

      .addCase(updateTimingAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = AdminTimingSlice.actions

export default AdminTimingSlice.reducer;
