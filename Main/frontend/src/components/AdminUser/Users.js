import React,{ useState } from 'react';
import axios from 'axios';
import './User.css'

export default function Users(props) {

    // // console.log(props.data)
    // const [loading, setLoading] = useState(true);
    // const [menuName, setMenuName] = useState(props.data.menu_name);
    // const [category, setCategory] = useState(props.data.categoryName);
    // const [description, setDescription] = useState(props.data.description);
    // const [price, setPrice] = useState(props.data.price);
    // const [profit, setProfit] = useState(props.data.profit);
    // const [img, setImg] = useState(props.data.img);

    // const editProduct = async(e) => {
    //     e.preventDefault();

    //     const accessToken = localStorage.getItem("accessToken");
    //     // console.log(accessToken)
    //     if(!accessToken)
    //     {
    //         setLoading(false);
    //         // alert('An error happened. Please Check console');
    //         // enqueueSnackbar('UNAUTHORIZED !!', { variant: 'error' });
    //         console.log("UNAUTHORIZED!!");
    //         return;
    //     }

        // const data = {
        //     menu_name: menuName,
        //     categoryName: category,
        //     description: description,
        //     price: price,
        //     profit,
        //     img: img
        // }
        // await menuAxios.put(`${props.data.menu_id}`, data, {
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //     }
        // })
    //         .then((response) => {
    //         // console.log([response.data][0].data)
    //         console.log([response.data][0].message);
    //         setModal(!modal)
    //         // just re-render all items
    //         props.setMenuItemsCnt(props.menuItemsCnt+1);
    //         props.setMenuItemsCnt(props.menuItemsCnt-1);
    //         setLoading(false);
    //         })
    //         .catch((error) => {
    //         console.log("ERROR MESSAGE ::", error)
    //         setLoading(false);
    //         });
    // }

    // const deleteProduct = async () => {
    //     const accessToken = localStorage.getItem("accessToken");
    //     // console.log(accessToken)
    //     if(!accessToken)
    //     {
    //         setLoading(false);
    //         // alert('An error happened. Please Check console');
    //         // enqueueSnackbar('UNAUTHORIZED !!', { variant: 'error' });
    //         console.log("UNAUTHORIZED!!");
    //         return;
    //     }

    //     await menuAxios.delete(`${props.data.menu_id}`, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         }
    //     })
    //         .then((response) => {
    //         // console.log([response.data][0].data)
    //         console.log([response.data][0].message);
    //         props.setMenuItemsCnt(props.menuItemsCnt-1);
    //         setLoading(false);
    //         })
    //         .catch((error) => {
    //         console.log("ERROR MESSAGE ::", error)
    //         setLoading(false);
    //         });
    // }

    return(
        <div className='card-use'>
                <div className='wrp-use'>
                    <h3 className='te-use'>{props.username}</h3>
                    <p className='cat-use'>E-mail : {props.email}</p>
                    <p className='cat-use'>Coins : {props.coins}</p>
                </div>
        </div>
    )
}