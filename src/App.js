import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";

import NavigationBar from "./Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";



 
export default function router(){
    return(
        <div>
 <BrowserRouter> 
 
   <NavigationBar/>
 <Routes>

 {/* <Route path='/' element={<Home/>}></Route> */}
 <Route path='/' element={<Login/>}></Route>
 <Route path='/register' element={<Register/>}></Route>
 <Route path='/expenseList' element={<Home/>}></Route>
 <Route path='/profile' element={<Profile/>}></Route>

 

 </Routes>

 </BrowserRouter>
</div>
    );
}