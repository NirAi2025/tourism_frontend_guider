import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSidebarshow:false,
    registerResponse:'',
     token: null,
     user: null,
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
}
  })

  export const { sidebarAction, setAuth } = ReducerDataHandle.actions

  export default ReducerDataHandle.reducer;