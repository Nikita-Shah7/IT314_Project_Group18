import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Items.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { restaurantMenu as menuAxios, category as categoryAxios } from '../AxiosCreate';
export default function Product(props) {

    // console.log(props.data)
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [menuName, setMenuName] = useState(props.data.menu_name);
    const [category, setCategory] = useState(props.data.categoryName);
    const [description, setDescription] = useState(props.data.description);
    const [price, setPrice] = useState(props.data.price);
    const [profit, setProfit] = useState(props.data.profit);
    const [img, setImg] = useState(props.data.img);

    const [modal,setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }
    useEffect(() => {
        setLoading(true);
        categoryAxios
            .get('/')
            .then((response) => {
                setCategories(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('ERROR MESSAGE ::', error);
                setLoading(false);
            });
    }, []);
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          const reader = new FileReader();
          reader.onloadend = () => {
            // The result will be a base64-encoded image
            const base64Image = reader.result;
            // Do something with the base64Image, such as setting it in state or displaying it
            // console.log(base64Image); // For demonstration, logging the base64 string
            setImg(base64Image);
          };
          reader.readAsDataURL(selectedFile);
        }
    };

    const editProduct = async(e) => {
        e.preventDefault();

        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken)
        if(!accessToken)
        {
            setLoading(false);
            // alert('An error happened. Please Check console');
            // enqueueSnackbar('UNAUTHORIZED !!', { variant: 'error' });
            console.log("UNAUTHORIZED!!");
            return;
        }

        const data = {
            menu_name: menuName,
            categoryName: category,
            description: description,
            price: price,
            profit,
            img: img
        }
        await menuAxios.put(`/${props.data.menu_id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then((response) => {
            // console.log([response.data][0].data)
            console.log([response.data][0].message);
            setModal(!modal)
            // just re-render all items
            props.setMenuItemsCnt(props.menuItemsCnt+1);
            props.setMenuItemsCnt(props.menuItemsCnt-1);
            setLoading(false);
            if(response.status===200){
                toast.success("MenuItem edited successfully ");
            }
            })
            .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
            });
    }

    const deleteProduct = async () => {
        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken)
        if(!accessToken)
        {
            setLoading(false);
            // alert('An error happened. Please Check console');
            // enqueueSnackbar('UNAUTHORIZED !!', { variant: 'error' });
            console.log("UNAUTHORIZED!!");
            return;
        }

        await menuAxios.delete(`/${props.data.menu_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then((response) => {
            // console.log([response.data][0].data)
            console.log([response.data][0].message);
            props.setMenuItemsCnt(props.menuItemsCnt-1);
            setLoading(false);
            if(response.status===200){
                toast.success("MenuItem deleted successfully ");
            }
            })
            .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
            toast.error("Database error, Can't delete.");
            });
    }

    return(
        <div className='card-i'>
            <img className='im-i' 
                src={props.data.img}
                alt={props.data.menu_name} />
                <div className='wrp-i'>
                    <h3 className='te-i'>{props.data.menu_name}</h3>
                    <p className='cat-i'>{props.data.categoryName}</p>
                </div>
            <p className='cat2-i-1'><span className='te-i-1'>Price :</span> {props.data.price}$</p>
            <p className='cat2-i-1'><span className='te-i-1'>Profit :</span> {props.data.profit}$</p>
            <button className='but-i'onClick={toggleModal}>Edit</button>
            <button className='but-i'onClick={deleteProduct}>Delete</button>
            {modal && (
         
         <div className='overlay-i' onClick={toggleModal}>
             <div className='content-i' onClick={(event) => event.stopPropagation()} >
             <form className='mrow-i' onSubmit={editProduct}>
             <div className="row-i">
                     <label htmlFor="title" >Item Name :</label>
                    <input type="text" className="in-i" name="menu_name" required value={menuName} onChange={(e) => setMenuName(e.target.value)} />
             </div>
             <div className="row-i">
                     <label htmlFor="title">Category Name :</label>
                     {/* Use a dropdown for category selection */}
                     <select className="in-a" name="categoryName" required value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.category_id} value={cat.categoryName}>
                                            {cat.categoryName}
                                        </option>
                                    ))}
                                </select>
             </div>
             <div className="row-i">
                     <label htmlFor="author">Short Description :</label>
                     <input type="text" className="in-i" name="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
             </div>
             <div className="row-i">
                     <label htmlFor="img">Image URL :</label>
                        {/* <input type="file" className="in-ad" name="img" onChange={(e) => handleImageChange(e)} /> */}
                        <input type="text" className="in-i" name="img" value={img}/>
             </div>
             <div className="row-i">
                     <label htmlFor="content" >Price :</label>
                 <input type="number" className="in-i" name="price" required value={price} onChange={(e) => setPrice(e.target.value)} />
             </div>
             <div className="row-i">
                     <label htmlFor="content" >Profit :</label>
                    <input type="number" className="in-i" name="profit" required value={profit} onChange={(e) => setProfit(e.target.value)} />
             </div>
             <div className='bu-fo-i'>
                 <button className="but-i-2" type="submit">Edit</button>
                 <button className="but-i-2" onClick={toggleModal}>CLOSE</button>
             </div>
         </form>
             </div>
     </div>)}
        </div>
    )
}