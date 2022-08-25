import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { logout } from "./redux/slices/userSlice";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  return (
    <div>
      <nav class="navbar bg-dark ps-5 ">
        <div>
            
            <form class="d-flex">
              <Link to="/login" className="btn btn-primary me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
              <button className="btn btn-warning me-2" onClick={async()=>
                {await dispatch(logout());
                navigate('/login')}}>logout</button>
            </form>
        
        </div>
      </nav>
  </div>
  );
}

export default Navbar;