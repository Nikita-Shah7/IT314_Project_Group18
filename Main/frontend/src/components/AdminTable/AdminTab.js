import React,{ useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './AdminTab.css'
import Cat from './Tab';
import data from './data'
export default function() {

    // // console.log("nik in admin menu");
    // const navigate = useNavigate();

    // if(!localStorage.getItem("isAdminAuth")) {
    //     navigate('/adminlogin');
    // }

    const [loading, setLoading] = useState(true);
    const [cats, setCat] = useState([]);
    const [catCnt, setCartItemsCnt] = useState(0);
    const [category, setCategory] = useState("");

    // useEffect(() => {
    //     setLoading(true)
    //     axios.get(`http://localhost:5555/menu`)
    //       .then((response) => {
    //         // console.log([response.data][0].data)
    //         setCartItemsCnt([response.data][0].count);
    //         setCat([response.data][0].data)
    //         setLoading(false);
    //       })
    //       .catch((error) => {
    //         console.log("ERROR MESSAGE ::", error)
    //         setLoading(false);
    //       });
    //   }, [menuItemsCnt]);


    const [modal,setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }
      
    
    // const addItem = async(e) => {
    //     e.preventDefault();
    //     setLoading(true)
        
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

    //     const data = {
    //         categoryName: category,
    //     }
    //     await axios.post(`http://localhost:5555/menu`, data, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         }
    //     })
    //         .then((response) => {
    //         // console.log([response.data][0].data)
    //         setCartItemsCnt(catCnt + 1);
    //         setCategory("");
    //         console.log([response.data][0].message);
    //         setModal(!modal)
    //         setLoading(false);
    //         })
    //         .catch((error) => {
    //         console.log("ERROR MESSAGE ::", error)
    //         setLoading(false);
    //         });
    // }
    const allitem = data.map((item)=>{
        return (
            <Cat 
            id = {item.id}
            tableno = {item.tableno}
            cap = {item.capacity}
            as = {item.availabilityStatus}
            />
        )
    })
    return(
    <div className='adm-tab'>
        <div className="addi-tab">
            <div className='w-tab'>
                <h2 className='ti-tab'>Tables : </h2>
                <button className="but-list-tab" onClick={toggleModal}>Add Item</button>
            </div>
        </div>
        <section className="item-list-tab">
        {allitem}
        {/* {products.map( (product) => (
                <Cat key={product.menu_id} data={product} menuItemsCnt={menuItemsCnt} setMenuItemsCnt={setMenuItemsCnt} />
              ))} */}
        </section>
        { modal && (
            <div className='overlay-tab' onClick={toggleModal}>
                <div className='content-ta' onClick={(event) => event.stopPropagation()} >
                <form className='mrow-tab'>
                <div className="row-tab">
                    <div >
                        <label htmlFor="title" ><p>Table No. : </p></label>
                    </div>
                    <div>
                    <input type="text" placeholder='Table no.' className='in-tab' name="tableno"/>
                    </div>
                </div>
                <div className="row-tab">
                    <div >
                        <label htmlFor="title" ><p>Capacity : </p></label>
                    </div>
                    <div>
                    <input type="text" placeholder='Capacity' className='in-tab' name="capacity"/>
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