import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { logout } from "./redux/slices/userSlice";
import { useDispatch } from "react-redux";
const ProfileNavbar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  return (
    <div>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <div class="container-fluid">
         
    
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to="/profile" className="nav-link active me-2">
                 Profile
                </Link>
              </li>

              <li class="nav-item mb-2">
                <Link to="/dashboard" className="btn  btn-outline-warning me-2">
                  Dashboard
                </Link>
              </li>
            </ul>
            <form class="d-flex">
             
              <button className="btn btn-warning me-2" onClick={async()=>
                {await dispatch(logout());
                navigate('/')}}>Logout</button>
            </form>
          </div>
      
      </nav>
  </div>
  );
}

export default ProfileNavbar;