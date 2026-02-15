import { createSlice } from '@reduxjs/toolkit';
import { s } from 'motion/react-client';

const initialState = {
    isSidebarshow:false,
    registerResponse:'',
     token: null,
     user: null,
     tourResponse: "",
  };

  export const ReducerDataHandle = createSlice({
    name: 'ReducerDataHandle',
    initialState,
    reducers: {
        sidebarAction: (state) => {
        state.isSidebarshow = !state.isSidebarshow;
    },
      setAuth: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setTourResponse: (state, action) => {
      state.tourResponse = action.payload;
    }
}
  })

  export const { sidebarAction, setAuth, setTourResponse } = ReducerDataHandle.actions

  export default ReducerDataHandle.reducer;