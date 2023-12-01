import React,{ useState } from 'react';
import axios from 'axios';
import {restaurantMenu as menuAxios} from '../AxiosCreate';
import './Items.css'

export default function Product(props) {

    // console.log(props.data)
    const [loading, setLoading] = useState(true);
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
            })
            .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
            });
    }

    return(
        <div className='card-it'>
            <img className='im-it' 
                src={props.data.img}
                alt={props.data.menu_name} />
                <div className='wrp-it'>
                    <h3 className='te-it'>{props.data.menu_name}</h3>
                    <p className='cat-it'>{props.data.categoryName}</p>
                </div>
            <p className='cat2-it-1'><span className='te-it-1'>Price :</span> {props.data.price}$</p>
            <p className='cat2-it-1'><span className='te-it-1'>Profit :</span> {props.data.profit}$</p>
            <button className='but-it'onClick={toggleModal}>Edit</button>
            <button className='but-it'onClick={deleteProduct}>Delete</button>
            {modal && (
         
         <div className='overlay-it' onClick={toggleModal}>
             <div className='content-it' onClick={(event) => event.stopPropagation()} >
             <form className='mrow-it' onSubmit={editProduct}>
             <div className="row-it">
                 <div>
                     <label htmlFor="title" ><p>Item Name : </p></label>
                 </div>
                 <div>
                    <input type="text" className="in-it" name="menu_name" required value={menuName} onChange={(e) => setMenuName(e.target.value)} />
                 </div>
             </div>
             <div className="row-it">
                 <div>
                     <label htmlFor="title"><p>Category Name : </p></label>
                 </div>
                 <div>
                     <input type="text" className="in-it" name="categoryName" required value={category} onChange={(e) => setCategory(e.target.value)} />
                 </div>
             </div>
             <div className="row-it">
                 <div>
                     <label htmlFor="author"><p>Short Description : </p></label>
                 </div>
                 <div >
                     <input type="text" className="in-it" name="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
                 </div>
             </div>
             <div className="row-it">
                 <div>
                     <label htmlFor="img"><p>Image URL : </p></label>
                 </div>
                 <div>
                        {/* <input type="file" className="in-ad" name="img" onChange={(e) => handleImageChange(e)} /> */}
                        <input type="text" className="in-ad" name="img" value={img}/>
                 </div>
             </div>
             <div className="row-it">
                 <div >
                     <label htmlFor="content" ><p>Price :</p></label>
                 </div>
                 <div>
                 <input type="text" className="in-it" name="price" required value={price} onChange={(e) => setPrice(e.target.value)} />
                 </div>
             </div>
             <div className="row-it">
                 <div>
                     <label htmlFor="content" ><p>Profit :</p></label>
                 </div>
                 <div >
                    <input type="text" className="in-it" name="profit" required value={profit} onChange={(e) => setProfit(e.target.value)} />
                 </div>
             </div>
             <div>
                 <button className="but-it" type="submit">Edit</button>
                 <button className="but-it" onClick={toggleModal}>CLOSE</button>
             </div>
         </form>
             </div>
     </div>)}
        </div>
    )
}