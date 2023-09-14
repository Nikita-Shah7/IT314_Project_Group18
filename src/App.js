import './App.css';
import {BrowserRouter as Router, Routes, Route}from "react-router-dom"
import { Navbar } from './Components/Navbar';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Feedback } from './pages/Feedback';
import { Cart } from './pages/Cart';
import { Contact } from './pages/ContactUs'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
        </div>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/Menu" element = {<Menu />} />
        <Route path="/ContactUs" element = {<Contact />} />
        <Route path="/Feedback" element = {<Feedback />} />
        <Route path="/Cart" element = {<Cart />} />

      </Routes>
  </Router>
    </div>
  );
}

export default App;
