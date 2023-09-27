import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartItems } from "../AxiosCreate";

function Cart() {
    console.log('nik enter')
    /*
    const [cart, setCart] = useState([{
        id: 1,
        dishName: 'Spaghetti Carbonara',
        itemCost: 100,
        quantity: 2,
      },
      {
        id: 2,
        dishName: 'Chicken Parmesan',
        itemCost: 150,
        quantity: 1,
      },
      {
        id: 3,
        dishName: 'Tiramisu',
        itemCost: 200,
        quantity: 3,
      }]);

    // const [cart, setCart] = useState([])
    */

      const [cart, setCart] = useState([]);

      useEffect(() => {
        console.log("nik in getAxios")
        cartItems.get('').then((response) => {
            setCart(response.data);
        })
    }, []);


    // update quantity of items
    // useEffect( () => {

    // },[]);
    

    console.log(cart)

    const [totalBillAmt, setTotalBillAmt] = useState(cart.reduce((total, item) => total + item.itemCost*item.quantity, 0));
    
    useEffect(() => {
        // Calculate the total bill amount whenever the cart changes
        console.log("nik in useEffect1")
        setTotalBillAmt(cart.reduce((total, item) => total + item.itemCost*item.quantity, 0))
    }, [cart]);

    
    const updateTotalBillAmount = (updatedCart) => {
        // make the changes to get reflected on frontend
        console.log("nik in updateFunc")
        const totalAmount = updatedCart.reduce((total, item) => total + item.itemCost * item.quantity, 0);
        setTotalBillAmt(totalAmount);

        // post the changes to server also
        // to make a POST request from a React frontend to /api/... Django API endpoint.

    }


    const handleDecrement = (cart_id,dish_id) => {
        // console.log(cart)
        // updateCartQuantity(cart_id, "dec");
        
        const updatedCart = cart.map((item) =>
        cart_id === item.id ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) } : item
        );
        setCart(updatedCart);
        updateTotalBillAmount(cart);
    }
    
    const handleIncrement = (cart_id,dish_id) => {
        // console.log("nik in incre")
        // console.log(cart)
        // updateCartQuantity(cart_id, "inc");
        
        // make the changes to get reflected on frontend
        const updatedCart = cart.map((item) =>
            cart_id === item.id ? { ...item, quantity: item.quantity + (item.quantity < 10 ? 1 : 0) } : item
        );
        setCart(updatedCart);
        updateTotalBillAmount(cart);

        // post the changes to server also
        // cartItems.post('',);
    }

    const deleteCartItem = (cart_id,dish_id) => {
        console.log(cart_id,dish_id)

        const updatedCart = cart.filter((item) => item.id !== cart_id);
        setCart(updatedCart)
        // console.log(cart);
        updateTotalBillAmount(updatedCart);
        console.log(updatedCart)
        console.log('nik0')
    }
        
    
    // function updateCartQuantity(cart_id,scope){

        // axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then(res=>{
        //     if(res.data.status === 200){
        //         swal("Success",res.data.message,"success");
        //     }
        // });
    // }

    
    // console.log(cart.length)
    // const [cart_HTML, setcart_HTML] = useState()

    // useEffect( () => {
    //     if (cart.length > 0) {
    //         setcart_HTML(
    //         <div>
    //             <div className="table-responsive">
    //                 <table className="table table-bordered">
    //                     <thead>
    //                         <tr>
    //                             <th>Image</th>
    //                             <th>Product</th>
    //                             <th className="text-center">Price</th>
    //                             <th className="text-center">Quantity</th>
    //                             <th className="text-center">Total Price</th>
    //                             <th>Remove</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                             {cart.map((item) => {
    //                                 // console.log(typeof totalBillAmt, typeof item.itemCost, typeof item.quantity);
    //                             // setTotalBillAmt( totalBillAmt + item.itemCost * item.quantity );
    
    //                             return (
    //                                 <tr key={item.id}>
    //                                     <td width="10%">
    //                                         <img alt="nik" width="50px" height="50px" />
    //                                     </td>
    //                                     <td width="15%" className="text-center">{item.dishName}</td>
    //                                     <td width="15%" className="text-center">{item.itemCost}</td>
    //                                     <td width="15%">
    //                                         <div className="input-group">
    //                                             <button type="button" onClick={() => handleDecrement(item.id)} className="input-group-text">-</button>
    //                                             <div className="form-control text-center">{item.quantity}</div>
    //                                             <button type="button" onClick={() => handleIncrement(item.id)} className="input-group-text">+</button>
    //                                         </div>
    //                                     </td>
    //                                     <td width="15%" className="text-center">{item.itemCost*item.quantity}</td>
    //                                     <td width="10%">
    //                                         <button type="button" onClick={(e) => deleteCartItem(item.id)} className="btn btn-danger btn-sm">Remove</button>
    //                                     </td>
    //                                 </tr>
    //                             )
    //                         })}
    //                     </tbody>
    //                 </table>
    //             </div>
    //             <div className="row">
    //                 <div className="col-md-8"></div>
    //                 <div className="col-md-4">
    //                     <div className="card card-body mt-3">
    //                         <h4>Grand Total:
    //                             <span className="float-end">{totalBillAmt}</span>
    //                         </h4>
    //                         <hr />
    //                         <Link to="/home" className="btn btn-primary"> Checkout </Link>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    // )}
    //     else {
    //         setcart_HTML(
    //         <div>
    //             <div className="card card-body py-5 text-center shadow-sm">
    //                 <h4>Your Shopping Cart is Empty</h4>
    //             </div>
    //         </div>
    //     )}
    // },[cart]);


    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>My Cart</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {cart.length > 0 ? (
                                <div>
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Product</th>
                                                    <th className="text-center">Price</th>
                                                    <th className="text-center">Quantity</th>
                                                    <th className="text-center">Total Price</th>
                                                    <th>Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((item) => (
                                                    <tr key={`${item.cartID}-${item.dishID}`}>
                                                        <td width="10%">
                                                            <img alt="nik" width="50px" height="50px" />
                                                        </td>
                                                        <td width="15%" className="text-center">{item.dishName}</td>
                                                        <td width="15%" className="text-center">{item.itemCost}</td>
                                                        <td width="15%">
                                                            <div className="input-group">
                                                                <button type="button" onClick={() => handleDecrement(item.cartID,item.dishID)} className="input-group-text">-</button>
                                                                <div className="form-control text-center">{item.quantity}</div>
                                                                <button type="button" onClick={() => handleIncrement(item.cartID,item.dishID)} className="input-group-text">+</button>
                                                            </div>
                                                        </td>
                                                        <td width="15%" className="text-center">{item.itemCost * item.quantity}</td>
                                                        <td width="10%">
                                                            <button type="button" onClick={(e) => deleteCartItem(item.cartID,item.dishID)} className="btn btn-danger btn-sm">Remove</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-8"></div>
                                        <div className="col-md-4">
                                            <div className="card card-body mt-3">
                                                <h4>Grand Total:
                                                    <span className="float-end">{totalBillAmt}</span>
                                                </h4>
                                                <hr />
                                                <Link to="/menu" className="btn btn-primary">Back</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="card card-body py-5 text-center shadow-sm">
                                        <h4>Your Shopping Cart is Empty</h4>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// function Cart() {
//     return (
//         <h2>Cart</h2>
//     );
// }

export default Cart;