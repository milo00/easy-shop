import { createSlice } from "@reduxjs/toolkit";
import api, { BASE_URL } from "../../config/axiosInterceptor";

type IIrritationTimeState = {
  startTime: number;
};

const initialState: IIrritationTimeState = {
  startTime: 0,
};

const irritationTimeSlice = createSlice({
  name: "iterationTime",
  initialState,
  reducers: {
    startTimer(state) {
      state.startTime = Date.now();
    },
    endTimer(state, action) {
      if (state.startTime) {
        const elapsedTime = state.startTime
          ? (Date.now() - state.startTime) / 1000
          : 0;
        const userId = action.payload.userId;
        const location = action.payload.location;

        elapsedTime &&
          userId &&
          location &&
          api.post(`${BASE_URL}/user-irritation-time`, {
            userId,
            location,
            elapsedTime,
          });
      }

      state.startTime = 0;
    },
  },
});

export const { startTimer, endTimer } = irritationTimeSlice.actions;

export default irritationTimeSlice;
