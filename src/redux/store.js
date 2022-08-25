import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./slices/expenseSlice";
import userReducer from './slices/userSlice';

const store=configureStore({
    reducer:{ 
        user:userReducer,
        expense:expenseReducer,

    },
});

export default store;
