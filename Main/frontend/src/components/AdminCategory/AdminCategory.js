import React,{ useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './AdminCat.css'
import Category from './category';
import data from './data';


export default function AdminCategory() {

    // // console.log("nik in admin menu");
    // const navigate = useNavigate();

    // if(!localStorage.getItem("isAdminAuth")) {
    //     navigate('/adminlogin');
    // }

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    const [categoryCnt, setCategoryCnt] = useState(0);

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
            <Category
            id = {item.id}
            catname = {item.categoryName}
            cnt = {item.count}
            />
        )
    })
    return(
    <div className='adm-cat'>
        <div className="addi-cat">
            <div className='w-cat'>
                <h2 className='ti-cat'>Categories : </h2>
                <button className="but-list-cat" onClick={toggleModal}>Add Category</button>
            </div>
        </div>
        <section className="item-list-cat">
        {allitem}
        {/* {products.map( (product) => (
                <Cat key={product.menu_id} data={product} menuItemsCnt={menuItemsCnt} setMenuItemsCnt={setMenuItemsCnt} />
              ))} */}
        </section>
        { modal && (
            <div className='overlay-cat' onClick={toggleModal}>
                <div className='content-ct' onClick={ (event) => event.stopPropagation()} >
                <form className='mrow-cat'>
                <div className="row-cat">
                    <div >
                        <label htmlFor="title" ><p>Category Name : </p></label>
                    </div>
                    <div>
                    <input type="text" placeholder='Category Name' className='in-ca' name="categoryName" required value={category} onChange={(e) => setCategory(e.target.value)}/>
                    </div>
                </div>
                <div className='bu-fo-cat'>
                    <button className="but2-list-cat" type="submit">ADD</button>
                    <button className="but2-list-cat" onClick={toggleModal}>CLOSE</button>
                </div>
            </form>
                </div>
        </div>)}    
        </div>
    )
}