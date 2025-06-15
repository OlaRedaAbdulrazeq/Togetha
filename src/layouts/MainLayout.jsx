import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
   
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);  
  },[])

  return (
    <>
   <Navbar/>
     
      <Outlet />
    </>
  );
};

export default MainLayout;
