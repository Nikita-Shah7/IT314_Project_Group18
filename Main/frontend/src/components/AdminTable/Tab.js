import React,{ useState } from 'react';
import axios from 'axios';
import './Tab.css'

export default function Product(props) {

    // // console.log(props.data)
    // const [loading, setLoading] = useState(true);
    // const [menuName, setMenuName] = useState(props.data.menu_name);
    // const [category, setCategory] = useState(props.data.categoryName);
    // const [description, setDescription] = useState(props.data.description);
    // const [price, setPrice] = useState(props.data.price);
    // const [profit, setProfit] = useState(props.data.profit);
    // const [img, setImg] = useState(props.data.img);

    const [modal,setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }
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
        // await axios.put(`http://localhost:5555/menu/${props.data.menu_id}`, data, {
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

    //     await axios.delete(`http://localhost:5555/menu/${props.data.menu_id}`, {
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
        <div className='card-tab'>
                {props.as=="AVAILABLE"?(<dic className='g-tab'></dic>):(<dic className='r-tab'></dic>)}
            <div className='wrp-tab-2'>
                <div className='wrp-tab'>
                    <h3 className='te-tab'>T{props.tableno}</h3>
                    <p className='cat-tab'>Capacity : {props.cap}</p>
                </div>
            <button className='but-tab' onClick={toggleModal}>Edit</button>
            <button className='but-tab'>Delete</button>
            </div>
            { modal && (
            <div className='overlay-tab' onClick={toggleModal}>
                <div className='content-ta' onClick={(event) => event.stopPropagation()} >
                <form className='mrow-tab'>
                <div className="row-tab">
                    <div >
                        <label htmlFor="title" ><p>Table No. : </p></label>
                    </div>
                    <div>
                    <input type="text" placeholder={props.tableno} className='in-tab' name="tableno"/>
                    </div>
                </div>
                <div className="row-tab">
                    <div >
                        <label htmlFor="title" ><p>Capacity : </p></label>
                    </div>
                    <div>
                    <input type="text" placeholder={props.cap} className='in-tab' name="capacity"/>
                    </div>
                </div>
                <div className='bu-fo-tab'>
                    <button className="but2-list-tab" type="submit">ADD</button>
                    <button className="but2-list-tab" onClick={toggleModal}>CLOSE</button>
                </div>
            </form>
                </div>
        </div>)}    
        </div>
    )
}