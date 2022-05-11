import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  questionsAndAnswers:[]
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    updateAnswers: (state, action) => {
      state.questionsAndAnswers = [...state.questionsAndAnswers,action.payload];
    },
    reset: () => initialState
  }
});

export const { setName,updateAnswers,reset } = userSlice.actions;

export default userSlice.reducer;
