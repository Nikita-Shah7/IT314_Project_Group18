import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
    console.log('nik enter')
    const [cart, setCart] = useState([{
        id: 1,
        dishName: 'Spaghetti Carbonara',
        rate: 100,
        quantity: 2,
      },
      {
        id: 2,
        dishName: 'Chicken Parmesan',
        rate: 150,
        quantity: 1,
      },
      {
        id: 3,
        dishName: 'Tiramisu',
        rate: 200,
        quantity: 3,
      }]);

    // const [cart, setCart] = useState([])
    // console.log(cart)

    const [totalBillAmt, setTotalBillAmt] = useState(cart.reduce((total, item) => total + item.rate*item.quantity, 0));
    
    useEffect(() => {
        // Calculate the total bill amount whenever the cart changes
        console.log("nik in useEffect1")
        setTotalBillAmt(cart.reduce((total, item) => total + item.rate*item.quantity, 0))
        // updateTotalBillAmount(cart);
    }, [cart]);

    
    const updateTotalBillAmount = (updatedCart) => {
        console.log("nik in updateFunc")
        const totalAmount = updatedCart.reduce((total, item) => total + item.rate * item.quantity, 0);
        setTotalBillAmt(totalAmount);
    }


    const handleDecrement = (cart_id) => {
        // setCart(cart =>
        //     cart.map((item) =>
        //         cart_id === item.id ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) } : item
        //     )
        // );

        // console.log(cart)
        // updateCartQuantity(cart_id, "dec");
        
        const updatedCart = cart.map((item) =>
        cart_id === item.id ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) } : item
        );
        setCart(updatedCart);
        updateTotalBillAmount(cart);
    }
    
    const handleIncrement = (cart_id) => {
        console.log("nik in incre")
        // setCart(cart =>
        //     cart.map((item) =>
        //     cart_id === item.id ? { ...item, quantity: item.quantity + (item.quantity < 10 ? 1 : 0) } : item
        //     ));
        // console.log(cart)
        // updateCartQuantity(cart_id, "inc");
        
        const updatedCart = cart.map((item) =>
        cart_id === item.id ? { ...item, quantity: item.quantity + (item.quantity < 10 ? 1 : 0) } : item
        );
        setCart(updatedCart);
        updateTotalBillAmount(cart);
        }


        const deleteCartItem = (cart_id) => {
            console.log(cart_id)
            // setCart(cart =>
            //     cart.map((item) =>
            //     cart_id === item.id ? { ...item, quantity: 0 } : item
            // ));
    
            const updatedCart = cart.filter((item) => item.id !== cart_id);
            setCart(updatedCart)
            // setTimeout(() => {}, 2000);
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
    //                                 // console.log(typeof totalBillAmt, typeof item.rate, typeof item.quantity);
    //                             // setTotalBillAmt( totalBillAmt + item.rate * item.quantity );
    
    //                             return (
    //                                 <tr key={item.id}>
    //                                     <td width="10%">
    //                                         <img alt="nik" width="50px" height="50px" />
    //                                     </td>
    //                                     <td width="15%" className="text-center">{item.dishName}</td>
    //                                     <td width="15%" className="text-center">{item.rate}</td>
    //                                     <td width="15%">
    //                                         <div className="input-group">
    //                                             <button type="button" onClick={() => handleDecrement(item.id)} className="input-group-text">-</button>
    //                                             <div className="form-control text-center">{item.quantity}</div>
    //                                             <button type="button" onClick={() => handleIncrement(item.id)} className="input-group-text">+</button>
    //                                         </div>
    //                                     </td>
    //                                     <td width="15%" className="text-center">{item.rate*item.quantity}</td>
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
                                                    <tr key={item.id}>
                                                        <td width="10%">
                                                            <img alt="nik" width="50px" height="50px" />
                                                        </td>
                                                        <td width="15%" className="text-center">{item.dishName}</td>
                                                        <td width="15%" className="text-center">{item.rate}</td>
                                                        <td width="15%">
                                                            <div className="input-group">
                                                                <button type="button" onClick={() => handleDecrement(item.id)} className="input-group-text">-</button>
                                                                <div className="form-control text-center">{item.quantity}</div>
                                                                <button type="button" onClick={() => handleIncrement(item.id)} className="input-group-text">+</button>
                                                            </div>
                                                        </td>
                                                        <td width="15%" className="text-center">{item.rate * item.quantity}</td>
                                                        <td width="10%">
                                                            <button type="button" onClick={(e) => deleteCartItem(item.id)} className="btn btn-danger btn-sm">Remove</button>
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