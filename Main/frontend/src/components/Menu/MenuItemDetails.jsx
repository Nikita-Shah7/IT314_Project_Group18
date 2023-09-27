import { useContext, useState, useEffect } from 'react';
import { restaurantMenu } from '../AxiosCreate'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './MenuItemDetails.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';

import { cartItems } from '../AxiosCreate';

// to get tableID
import { Context } from '../../context';
import ContextProvider from '../../context';


function MenuItemDetails() {
    console.log("nik in MenuListDetails.jsx")

    // i use context.jsx since i have made the tableID variable
    // to be available globally
    const [tableID, setTableID] = useState(null)
    const [newItem, setnewItem] = useState({})
    const [cart, setCart] = useState([]);
    const { selectedTable } = useContext(Context)

    console.log("selectedTable => ", selectedTable)

    
    useEffect(() => {
        if (selectedTable) {
            console.log(selectedTable);
            console.log(selectedTable.tableID);
            setTableID(selectedTable.tableID);
        } else {
            console.log("table yet not selected!!");
        }
    }, [selectedTable]); // Add selectedTable as a dependency


    // to get details of a menuListItem selected
    const location = useLocation();
    console.log(location.state)


    const addToCart = () => {
        console.log("nik in addToCart")
        console.log(tableID)
        if (selectedTable) {
            setnewItem({
                "cartID": tableID,
                "dishID": location.state.dishID,
                "dishName": location.state.dishName,
                "quantity": 1,
                "itemCost": location.state.rate,
                "totalItemCost": location.state.rate
            });
            // newItem = {...newItem,totalItemCost: newItem.quantity*newItem.itemCost};
            console.log(newItem)            
        }
        else {
            console.log("Can't add to cart!!")
        }

        return;
    }

    // check apis with ThunderClient
    useEffect(() => {
        console.log("nik in getAxios")
        cartItems.get('').then((response) => {
            setCart(response.data);
        })
    }, []);

    useEffect(() => {
        console.log("nik in postAxios")
        console.log(newItem)
        cartItems.post('', newItem)
            .then((response) => {
                if (response.status === 400) {
                    // Handle the 400 response status here, even if the item was successfully added
                    // to avoid duplicates in cart
                    console.log("ERROR MESSAGE 404 ::")
                } else {
                    // Handle the successful response, update the cart, etc.
                    setCart([response.data, ...cart]);
                }
            })
            .catch((error) => {
                // Handle network errors or other exceptions here
                console.log("ERROR MESSAGE::",error)
            });
    }, [newItem]);


    return (
        <>
            <div className="card" style={{ width: '18rem' }}>
                <img src="https://images.unsplash.com/photo-1612886621865-47cd0e961fac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{location.state.dishName}</h5>
                    <p className="card-text">{location.state.description}</p>
                    <div className='card-price'>{location.state.rate} Rs. </div>
                    {tableID ? (
                        <a onClick={addToCart} className="btn btn-primary">Add to My Food Basket</a>
                    ) : (
                        <div class="alert alert-warning" role="alert">
                            Can't add to cart
                        </div>
                    )
                    }
                </div>
            </div>
            <Link to={'/menu'}>
                <button className="btn btn-primary">Back</button>
            </Link>

            <a href="/mycart" className="btn d-flex align-items-center justify-content-center rounded-circle shadow text-white border-0 bg-primary back-to-top">
                <FontAwesomeIcon icon={faBurger} />
            </a>
        </>
    );
}

export default MenuItemDetails;