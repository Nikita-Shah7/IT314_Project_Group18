import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ContextProvider } from './context';

import Home from './components/Home/Home'
import MenuList from './components/Menu/MenuList'
import MenuListDetails from './components/Menu/MenuItemDetails'
import Cart from './components/Cart/Cart'
import Table from './components/Table/Table';


function App() {
  return (
    <>
      <ContextProvider>
        <Router>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/menu' element={<MenuList />} />
            <Route path='/menu/:id' element={<MenuListDetails />} />
            <Route path='/mycart' element={<Cart />} />
            <Route path='/table' element={<Table />} />
          </Routes>
        </Router>
      </ContextProvider>
    </>
  );
}

export default App;
