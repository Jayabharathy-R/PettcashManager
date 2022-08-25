import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utilities/baseUrl";

export const userExpenseAction=createAsyncThunk(
    "expense/fetchUserExpense",
    async(payload,{rejectWithValue,getState,dispatch})=>{
        const userToken = getState()?.user?.userAuth?.token;
        const config={
            headers:{
                'content-Type':'application/json',
                Authorization: `Bearer ${userToken}`,
            }
        }
        try {
            const {data}=await axios.get(`${baseUrl}/expense/userExpense`,
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

const expenseSlice=createSlice({
    name:"expense",
    initialState:{
    
     },
    extraReducers: builder=>{
      
        builder.addCase(userExpenseAction.pending,(state,action)=>{
            state.userLoading=true;
            state.userAppErr=undefined;
            state.userServerErr=undefined;
        });
        builder.addCase(userExpenseAction.fulfilled,(state,action)=>{
            state.userExpense=action?.payload ;      
            state.userLoading=false;
            state.userAppErr=undefined;
            state.userServerErr=undefined;
        });
        builder.addCase(userExpenseAction.rejected,(state,action)=>{
            state.userLoading=false;
            state.userAppErr=action?.payload?.msg;
            state.userServerErr=action?.error?.msg;
        });

       

    },
   
})

export default expenseSlice.reducer;