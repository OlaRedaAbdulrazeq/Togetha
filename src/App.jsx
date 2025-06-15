import { useEffect, useState } from 'react';
import api from './api/axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/EditProfile';
import ThemeToggle from './components/ThemeToggle';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import MainLayout from './layouts/MainLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProfile from './pages/EditProfile';
import PostModal from './components/PostModal';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
      <>     
        <Routes>
        
          {/* <Route path="/create" element={<CreatePost />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

           <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />

           <Route path='*' element={<NotFound/>}/>

          <Route element={<MainLayout />}>
            <Route path="/" element={ <Home />  }/>
            <Route path='/addpost' element={<ProtectedRoute><AddPost/></ProtectedRoute>}/>
        </Route>
        </Routes>
        <PostModal />
        <ToastContainer position="top-right" autoClose={4000} />
      </>
  );
}

export default App;
