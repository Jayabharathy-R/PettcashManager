//UserSlice
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utilities/baseUrl";


//Login action
export const loginUserAction=createAsyncThunk(
    "user/login",
    async(payload,{rejectWithValue,getState,dispatch})=>{
        const config={
            headers:{
                'content-Type':'application/json',
            }
        }
        try {
            const {data}=await axios.post(`${baseUrl}/users/login`,
            payload,
            config);
            localStorage.setItem("userInfo",JSON.stringify(data))
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data) ;
        }
    }
);

//register action
export const registerUserAction=createAsyncThunk(
    "user/register",
    async(payload,{rejectWithValue,getState,dispatch})=>{
        const config={
            headers:{
                'content-Type':'application/json',
            }
        }
        try {
            const {data}=await axios.post(`${baseUrl}/users/register`,
            payload,
            config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data) ;
        }
    }
);

//Logout action
export const logout = createAsyncThunk(
    "user/logout",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        localStorage.removeItem("userInfo");
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

const userLocalStorage=localStorage.getItem("userInfo")?
JSON.parse(localStorage.getItem("userInfo")):undefined;
const userSlice=createSlice({
    name:"users",
    initialState:{
        userAuth:userLocalStorage,
     },
    extraReducers: builder=>{
        //Login reducer
        builder.addCase(loginUserAction.pending,(state,action)=>{
            state.userLoading=true;
            state.userAppErr=undefined;
            state.userServerErr=undefined;
        });
        builder.addCase(loginUserAction.fulfilled,(state,action)=>{
            state.userAuth=action?.payload ;      
            state.userLoading=false;
            state.userAppErr=undefined;
            state.userServerErr=undefined;
        });
        builder.addCase(loginUserAction.rejected,(state,action)=>{
            state.userLoading=false;
            state.userAppErr=action?.payload?.msg;
            state.userServerErr=action?.error?.msg;
        });

        //register reducer
        builder.addCase(registerUserAction.pending,(state,action)=>{
            state.userLoading=true;
            state.userAppErr=undefined;
            state.userServerErr=undefined;
        });
        builder.addCase(registerUserAction.fulfilled,(state,action)=>{
            state.userAuth=action?.payload ;      
            state.userLoading=false;
            state.userAppErr=undefined;
            state.userServerErr=undefined;
        });
        builder.addCase(registerUserAction.rejected,(state,action)=>{
            state.userLoading=false;
            state.userAppErr=action?.payload?.msg;
            state.userServerErr=action?.error?.msg;
        });

         //logout
    builder.addCase(logout.fulfilled, (state, action) => {
        state.userAuth = undefined;
        state.userLoading = false;
      });

    },
   
})

export default userSlice.reducer;