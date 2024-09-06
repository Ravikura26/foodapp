import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    isLoggedIn: false,
    token:"",
    categories:[]
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setLogin(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout(state){
            state.isLoggedIn = false;
            state.user = null;
        },
        setCatgeories(state,action){
            state.categories = action.payload;
        }
         
    }
});

export const { setLogin, setLogout,setCatgeories } = authSlice.actions;
export const authReducer = authSlice.reducer;
