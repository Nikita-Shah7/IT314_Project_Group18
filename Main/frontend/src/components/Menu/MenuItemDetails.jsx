import {restaurantMenu} from '../AxiosCreate'
import { useLocation, useNavigate } from 'react-router-dom';
import './MenuItemDetails.scss'

function MenuItemDetails() {

    const location = useLocation();
    // console.log(location.state.dishID)

    return (
        <div className="card" style={{width: '18rem'}}>
            <img src="https://images.unsplash.com/photo-1612886621865-47cd0e961fac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{location.state.dishName}</h5>
                    <p className="card-text">{location.state.description}</p>
                    <div className='card-price'>{location.state.rate} Rs. </div>
                    <a href="/menu" className="btn btn-primary">Add to My Food Basket</a>
                </div>
        </div>
    );
}

export default MenuItemDetails;