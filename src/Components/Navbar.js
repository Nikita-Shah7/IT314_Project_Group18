import {Link} from "react-router-dom"
export const Navbar = () => {
    return (
        <div>
        <Link to="/"> Home</Link>
        <Link to="/Menu"> Menu</Link>
        <Link to="/ContactUs"> Contact Us</Link>
        <Link to="/Feedback"> Feedback</Link>
        <Link to="/Cart"> Add-to-cart</Link>
        </div>    
    )
};