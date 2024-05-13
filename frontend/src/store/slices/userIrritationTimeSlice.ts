import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import api, { BASE_URL } from "../../config/axiosInterceptor";
import IUserIrritationTime, {
  getIrrittaionTimeFromSessionStorage,
} from "../../models/userIrritationTime";
import _ from "lodash";
import { getUserFromStorage } from "../../models/user";
import { IRootState } from "../store";

export const IRRITATION_TIME_TOKEN = "IRRITATION_TIME_TOKEN";

type IIrritationTimeState = {
  startTime: number;
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: IIrritationTimeState = {
  startTime: 0,
  status: "idle",
};

export const endTimerGlobally = createAsyncThunk<
  IUserIrritationTime,
  IUserIrritationTime,
  {
    state: IRootState;
  }
>(
  "userIrritationTime/endTimerGlobally",
  async (userIrritationTime, { getState }) => {
    const startTime = getState().userIrritationTime.startTime;
    const elapsedTime = (Date.now() - startTime) / 1000;

    return await api.post(`${BASE_URL}/user-irritation-time`, {
      ...userIrritationTime,
      elapsedTime,
    });
  },
  {
    condition: (userIrritationTime, { getState }) => {
      return (
        !!getState().userIrritationTime.startTime &&
        !!userIrritationTime.location
      );
    },
  }
);

export const sendBatch = createAsyncThunk<
  IUserIrritationTime[] | undefined,
  undefined,
  {
    state: IRootState;
  }
>(
  "userIrritationTime/sendBatch",
  async () => {
    const irritationTimeBatch = getIrrittaionTimeFromSessionStorage();
    const userId = getUserFromStorage();

    const userIrritationTimeBatch = irritationTimeBatch.map((i) => ({
      ...i,
      userId,
    }));
    return api.post(
      `${BASE_URL}/user-irritation-time/batch`,
      userIrritationTimeBatch
    );
  },
  {
    condition: () => {
      const irritationTimeBatch = getIrrittaionTimeFromSessionStorage();
      const userId = getUserFromStorage();
      return !_.isEmpty(irritationTimeBatch) && !!userId;
    },
  }
);

const userIrritationTimeSlice = createSlice({
  name: "userIrritationTime",
  initialState,
  reducers: {
    resetError(state) {
      state.status = "idle";
    },
    startTimer(state) {
      state.startTime = Date.now();
    },
    endTimerLocally(
      state,
      action: { payload: IUserIrritationTime; type: string }
    ) {
      if (state.startTime) {
        const elapsedTime = (Date.now() - state.startTime) / 1000;
        const location = action.payload.location;
        const loaderType = action.payload.loaderType; 

        if (!elapsedTime || !location || !loaderType) return;
        const savedIrritationTimes = getIrrittaionTimeFromSessionStorage();
        sessionStorage.setItem(
          IRRITATION_TIME_TOKEN,
          JSON.stringify([
            ...savedIrritationTimes,
            {
              location,
              elapsedTime,
              loaderType,
            },
          ])
        );
        state.startTime = 0;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendBatch.fulfilled, (state) => {
        state.status = "succeeded";
        sessionStorage.removeItem(IRRITATION_TIME_TOKEN);
      })
      .addCase(endTimerGlobally.fulfilled, (state) => {
        state.status = "succeeded";
        state.startTime = 0;
        sessionStorage.removeItem(IRRITATION_TIME_TOKEN);
      })
      .addMatcher(
        isAnyOf(sendBatch.pending, endTimerGlobally.pending),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(sendBatch.rejected, endTimerGlobally.rejected),
        (state) => {
          state.status = "failed";
        }
      );
  },
});

export const { startTimer, endTimerLocally, resetError } =
  userIrritationTimeSlice.actions;

export default userIrritationTimeSlice;
