import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from "react";
import { ContextProvider } from './context/context'; 

import Header from './components/Header/Header' 
import Footer from './components/Footer/Footer'
import RestaurantMenu from './components/RestaurantMenu/RestaurantMenu'
import Cart from './components/Cart/Cart'
import EnterMembers from './components/Table/EnterMembers'; 
import SelectTable from './components/Table/SelectTable'; 
import BookedTable from './components/Table/BookedTable'; 
import Home from './components/Welcome/Home';
import { ShopContextProvider } from './context/shop-context';
// import { Navbar } from "./Navigations/navbar";
import  _404NotFound  from './components/_404NotFound/_404NotFound'
import Feedback from './components/Feedback/Feedback'
import { About } from './components/About/About'; 
import { Feed } from '@mui/icons-material';



function App() {  

  const [totalMembers, setTotalMembers] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null); 
  const handleMembersConfirmed = (members) => {
    setTotalMembers(members);
  };
  
  const handleTableSelected = (tableNumber) => {
    setSelectedTable(tableNumber);
  };
  const tables = [
    { number: 1, capacity: 4 },
    { number: 2, capacity: 6 },
    { number: 3, capacity: 2 },
    { number: 4, capacity: 4 },
    { number: 5, capacity: 6 },
    { number: 6, capacity: 2 },
    { number: 7, capacity: 4 },
    { number: 8, capacity: 6 },
    { number: 9, capacity: 2 },
    { number: 10, capacity: 4 },
    { number: 11, capacity: 6 },
    { number: 12, capacity: 2 },
  ];
  return (
    <> 
    <Header/>
      <ContextProvider>
        <ShopContextProvider>
        <Router>
          <Routes>
            <Route path='/menu' element={<RestaurantMenu />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/tablebooking' element={totalMembers === null ? (
          <EnterMembers onMembersConfirmed={handleMembersConfirmed} />
        ) : selectedTable === null ? (
          <SelectTable tables={tables} onTableSelected={handleTableSelected} />
        ) : (
          <BookedTable tableNumber={selectedTable} />
        )} />  
        <Route path='/' element={<Home userName="User" />} />
            {/* <Route path='/selecttable' element={<SelectTable tables={tables} onTableSelected={handleTableSelected} />} /> 
            <Route path='/bookedtable' element={<BookedTable tableNumber={selectedTable}/>} /> */}
            <Route path='/aboutus' element={<About />} />
            <Route path='/feedback' element={<Feedback />} />
            <Route path='/*' element={<_404NotFound />} />
          </Routes>
        </Router>
        </ShopContextProvider>
      </ContextProvider> 
      <Footer/>
    </>
  );
}

export default App;
