import React from 'react'
import { CiSearch } from 'react-icons/ci';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import avatar from "../assets/avatar.png"
import { useUser } from '../contexts/UserContext';


const Nav = () => {
    const {isAuthenticated,logout ,user  } = useUser();
    const navigate = useNavigate();
    const handleLogout = () => {
    logout();            
    navigate('/login',{replace:true});    
  };

  return (
    <>
    <div className="navbar justify-around  bg-base-100 shadow-md">
        <div className="">
        <Link  to='/' className="text-xl">Togetha</Link>
        </div>
        <div className="hidden sm:flex gap-2 items-center  rounded-[3.125rem] px-4 py-1.5 w-1/4 shadow-md">
        <CiSearch />
        <input type="text" placeholder="Search something" className="outline-none" />
        </div>
        {/* this is of the avatar */}
        <div className="dropdown dropdown-end relative ">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
            <img
                alt="user image"
                src={isAuthenticated? user.avatar:avatar}/>
            </div>
        </div>
    {isAuthenticated?
     (<ul
            tabIndex={0}
            className=" absolute left-1/2 transform -translate-x-1/2 menu menu-md  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-28 p-2 pr-2 shadow">
            <li>
              <button onClick={()=>navigate("/editprofile")} className="w-full text-left md:hidden">
                  Edit Profile
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full text-left">
                  Log Out
              </button>
            </li>
        </ul>
        ) 
        : ( <ul
            tabIndex={0}
            className="absolute left-1/2 transform -translate-x-1/2 menu menu-md  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-28 p-2 shadow">
            <li><Link to="/register">Sign up</Link></li>
            <li><Link to="/login">Log in</Link></li>
        </ul>)
        }
        </div>
</div>
    </>
  )
}

export default Nav;

