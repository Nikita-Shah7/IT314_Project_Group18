import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from "react";
import { ContextProvider } from './context/context';
import AdminCategory from './components/AdminCategory/AdminCategory'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import RestaurantMenu from './components/RestaurantMenu/RestaurantMenu'
import Cart from './components/Cart/Cart'
import EnterMembers from './components/Table/EnterMembers';
import BookedTable from './components/Table/BookedTable';
import Home from './components/Welcome/Home'
import _404NotFound from './components/_404NotFound/_404NotFound'
import Feedback from './components/Feedback/feedback'
import { About } from './components/About/About';
import { Feed } from '@mui/icons-material';
import UserLogin from './components/UserLogin/UserLogin';
import AdminLogin from './components/AdminLogin/AdminLogin';
import  AdminMenu from './components/AdminMenu/AdminMenu'
import  AdminTable from './components/AdminTable/AdminTable'
import Reviewlist from "./components/Reviews/Reviewlist";


function App() {

  const [loading, setLoading] = useState(true);
  
  return (
    <>
      <ContextProvider>
          <Router>
            <Routes>
              <Route path='/menu' element={<><Header/> <RestaurantMenu/> <Footer/></>} />
              <Route path='/cart' element={<><Header/> <Cart/> <Footer/></>} />
              { localStorage.getItem("table_id") ? 
                (<Route path='/tablebooking' element={<><Header/> <BookedTable/> <Footer/></>} />) :
                (<Route path='/tablebooking' element={<><Header/> <EnterMembers/> <Footer/></>} />)
              }
              <Route path='/' element={ <><Header/> <Home userName="User" /> <Footer/></>} />
              <Route path='/aboutus' element={<><Header/> <About/> <Footer/></>} />
              <Route path='/feedback' element={<Feedback />} />
              <Route path='/userlogin' element={<><UserLogin /> <Footer/></>} />
              <Route path='/adminlogin' element={<AdminLogin />} />            
              <Route path='/admintable' element={<><Header/> <AdminTable/> <Footer/></>} />
              <Route path='/adminmenu' element={<><Header/> <AdminMenu/> <Footer/></>} />
              <Route path='/admincategory' element={<><Header/> <AdminCategory/> <Footer/></>} />
              <Route path='/adminfeedback' element={<><Header/> <Reviewlist/> <Footer/></>} />
              <Route path='/*' element={<_404NotFound />} />
            </Routes>
          </Router>
      </ContextProvider>
    </>
  );
}

              
export default App;
