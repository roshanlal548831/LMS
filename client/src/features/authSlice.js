import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    isAuthenticated: false
}
const authSlice = createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        userLoggedin:(state,acction) => {
            state.user = acction.payload.user;
            state.isAuthenticated = true
        },
        userLoggedOut:(state) => {
            state.user = null;
            state.isAuthenticated = false
        },
    }
});

export const {userLoggedin,userLoggedOut} = authSlice.actions;
export default authSlice.reducer
