import React from "react";
import { useSelector } from "react-redux";
import ProfileNavbar from "./ProfileNavbar";


const Navigation = () => {
  const user = useSelector(state => state?.user);

  const { userAuth } = user;
  return <>{userAuth?.token ? <ProfileNavbar /> : null}</>;
};

export default Navigation;