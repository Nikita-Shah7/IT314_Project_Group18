import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ContextProvider } from './context/context';

import Shop from './components/Home/Home'
import MenuList from './components/Menu/MenuList'
import MenuListDetails from './components/Menu/MenuItemDetails'
import Cart from './components/Cart/Cart'
import Table from './components/Table/Table';
import { ShopContextProvider } from './context/shop-context';
import { Navbar } from "./Navigations/navbar";
import  _404NotFound  from './components/_404NotFound/_404NotFound'

function App() {
  return (
    <>
      <ContextProvider>
        <ShopContextProvider>
        <Router>
          <Routes>
            <Route path='/home' element={<Shop />} />
            <Route path='/menu' element={<MenuList />} />
            <Route path='/menu/:id' element={<MenuListDetails />} />
            <Route path='/mycart' element={<Cart />} />
            <Route path='/table' element={<Table />} />
            <Route path='/*' element={<_404NotFound />} />
          </Routes>
        </Router>
        </ShopContextProvider>
      </ContextProvider>
    </>
  );
}

export default App;
