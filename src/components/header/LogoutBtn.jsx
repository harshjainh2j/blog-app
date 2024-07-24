import React from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then(() => {
      {
        dispatch(logout());
      }
    });
  };
  return <button onClick={handleLogout} className="cursor-pointer inline-block px-6 py-2 duration-200 haver:bg-blue-100 rounded full">Logout</button>;
}

export default LogoutBtn;
