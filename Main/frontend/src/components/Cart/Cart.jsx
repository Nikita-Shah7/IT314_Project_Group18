import { useState } from "react";
import { Link } from "react-router-dom";

// function Cart() {

//     const [cart, setCart] = useState([{
//         dishName: 'Spaghetti Carbonara',
//         rate: 12.99,
//         quantity: 2,
//         totalPrice: 12.99 * 2,
//       },
//       {
//         dishName: 'Chicken Parmesan',
//         rate: 15.49,
//         quantity: 1,
//         totalPrice: 15.49,
//       },
//       {
//         dishName: 'Tiramisu',
//         rate: 7.99,
//         quantity: 3,
//         totalPrice: 7.99 * 3,
//       }]);

//     const [totalBillAmt, setTotalBillAmt] = useState(0)


    
//     const handleDecrement = (cart_id) => {
//         setCart(cart =>
//             cart.map((item) =>
//                 cart_id === item.id ? { ...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0) } : item
//             )
//         );
//         // updateCartQuantity(cart_id, "dec");
//     }

//     const handleIncrement = (cart_id) => {
//         setCart(cart =>
//             cart.map((item) =>
//                 cart_id === item.id ? { ...item, product_qty: item.product_qty + (item.product_qty < 10 ? 1 : 0) } : item
//             )
//         );
//         // updateCartQuantity(cart_id, "inc");
//     }

//     function updateCartQuantity(cart_id,scope){

//         // axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then(res=>{
//         //     if(res.data.status === 200){
//                 // swal("Success",res.data.message,"success");
//             // }
//         // });
//     }


//     var cart_HTML = '';
//     if (cart.length > 0) {
//         cart_HTML = 
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
//                         {cart.map((item) => {
//                             setTotalBillAmt(totalBillAmt + item.rate * item.quantity);

//                             return (
//                                 <tr>
//                                     <td width="10%">
//                                         <img alt="nik" width="50px" height="50px" />
//                                     </td>
//                                     <td>nik</td>
//                                     <td width="15%" className="text-center">{item.dishName}</td>
//                                     <td width="15%">
//                                         <div className="input-group">
//                                             <button type="button" onClick={() => handleDecrement(1)} className="input-group-text">-</button>
//                                             <div className="form-control text-center">{item.quantity}</div>
//                                             <button type="button" onClick={() => handleIncrement(1)} className="input-group-text">+</button>
//                                         </div>
//                                     </td>
//                                     <td width="15%" className="text-center">{item.rate*item.quantity}</td>
//                                     {/* <td width="10%">
//                                         <button type="button" onClick={(e) => deleteCartItem(e, 1)} className="btn btn-danger btn-sm">Remove</button>
//                                     </td> */}
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
//     }
//     else {
//         cart_HTML = <div>
//             <div className="card card-body py-5 text-center shadow-sm">
//                 <h4>Your Shopping Cart is Empty</h4>
//             </div>
//         </div>
//     }


//     return (
//         <div>
//             <div className="py-3 bg-warning">
//                 <div className="container">
//                     <h6>My Cart</h6>
//                 </div>
//             </div>

//             <div className="py-4">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-12">
//                             {cart_HTML}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

function Cart() {
    return (
        <h2>Cart</h2>
    );
}

export default Cart;