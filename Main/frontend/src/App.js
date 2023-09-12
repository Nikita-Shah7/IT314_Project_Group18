import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home'
import MenuList from './components/Menu/MenuList'
import MenuListDetails from './components/Menu/MenuItemDetails'
import Cart from './components/Cart/Cart'


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/menu' element={<MenuList/>} />
        <Route path='/menu/:id' element={<MenuListDetails/>} />
        <Route path='/mycart' element={<Cart/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;