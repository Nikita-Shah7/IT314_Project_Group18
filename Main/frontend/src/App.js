import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from "react";
import { ContextProvider } from './context/context';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import RestaurantMenu from './components/RestaurantMenu/RestaurantMenu'
import Cart from './components/Cart/Cart'
import EnterMembers from './components/Table/EnterMembers';
import BookedTable from './components/Table/BookedTable';
import Home from './components/Welcome/Home'
// import { Navbar } from "./Navigations/navbar";
import _404NotFound from './components/_404NotFound/_404NotFound'
import Feedback from './components/Feedback/feedback'
import { About } from './components/About/About';
import  AdminMenu from './components/AdminMenu/AdminMenu'
import { Feed } from '@mui/icons-material';



function App() {

  const [loading, setLoading] = useState(true);
  
  return (
    <>
      <Header />
      <ContextProvider>
          <Router>
            <Routes>
              <Route path='/menu' element={<RestaurantMenu />} />
              <Route path='/cart' element={<Cart />} />
              { localStorage.getItem("table_id") ? 
                (<Route path='/tablebooking' element={<BookedTable />} />) :
                (<Route path='/tablebooking' element={<EnterMembers />} />)
              }
              <Route path='/' element={<Home userName="User" />} />
              <Route path='/aboutus' element={<About />} />
              <Route path='/adminmenu' element={<AdminMenu />} />
              <Route path='/feedback' element={<Feedback />} />
              <Route path='/*' element={<_404NotFound />} />
            </Routes>
          </Router>
      </ContextProvider>
      <Footer />
    </>
  );
}

export default App;
