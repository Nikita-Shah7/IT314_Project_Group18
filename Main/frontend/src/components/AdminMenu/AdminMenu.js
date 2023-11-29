import React,{ useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {restaurantMenu as menuAxios} from '../AxiosCreate';
import './AdminMenu.css'
import Product from './product';

export default function() {

    // console.log("nik in admin menu");
    const navigate = useNavigate();

    if(!localStorage.getItem("isAdminAuth")) {
        navigate('/adminlogin');
    }

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [menuItemsCnt, setMenuItemsCnt] = useState(0);
    const [menuName, setMenuName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [profit, setProfit] = useState(0);
    const [img, setImg] = useState("abc");

    useEffect(() => {
        setLoading(true)
        menuAxios.get('/')
          .then((response) => {
            // console.log([response.data][0].data)
            setMenuItemsCnt([response.data][0].count);
            setProducts([response.data][0].data)
            setLoading(false);
          })
          .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
          });
      }, [menuItemsCnt]);


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
      
    
    const addItem = async(e) => {
        e.preventDefault();
        setLoading(true)
        
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

        if(!img) img = "abc";
        const data = {
            menu_name: menuName,
            categoryName: category,
            description: description,
            price: price,
            profit,
            img: img
        }
        await menuAxios.post('/', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then((response) => {
            // console.log([response.data][0].data)
            setMenuItemsCnt(menuItemsCnt + 1);
            setMenuName("");
            setCategory("");
            setDescription("");
            setPrice(0);
            setProfit(0);
            setImg("");
            console.log([response.data][0].message);
            setModal(!modal)
            setLoading(false);
            })
            .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
            });
    }

    return(
        <div className='adm'>
        <div className="addi-ad">
        <h2 className='ti-ad'>Menu Items : </h2>
        <button className="but-list-ad" onClick={toggleModal}>Add Item</button>
        </div>
        { modal ? (
            <div className='overlay-ad' onClick={toggleModal}>
                <div className='content-ad' onClick={(event) => event.stopPropagation()} >
                <form className='mrow-ad' onSubmit={addItem}>
                <div className="row-ad">
                    <div >
                        <label htmlFor="title" ><p>Item Name : </p></label>
                    </div>
                    <div>
                    <input type="text" className="in-ad" name="menu_name" required value={menuName} onChange={(e) => setMenuName(e.target.value)} />
                    </div>
                </div>
                <div className="row-ad">
                    <div >
                        <label htmlFor="text" ><p>Category Name : </p></label>
                    </div>
                    <div>
                    <input type="text" className="in-ad" name="categoryName" required value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                </div>
                <div className="row-ad">
                    <div>
                        <label htmlFor="author"><p>Short Description : </p></label>
                    </div>
                    <div>
                    <input type="text" className="in-ad" name="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div className="row-ad">
                    <div>
                        <label htmlFor="img"><p>Image : </p></label>
                    </div>
                    <div>
                        <input type="file" className="in-ad" name="img" onChange={(e) => handleImageChange(e)} />
                    </div>
                </div>
                <div className="row-ad">
                    <div>
                        <label htmlFor="content"><p>Price : </p></label>
                    </div>
                    <div >
                    <input type="text" className="in-ad" name="price" required value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>
                <div className="row-ad">
                    <div >
                        <label htmlFor="content" ><p>Profit : </p></label>
                    </div>
                    <div>
                    <input type="text" className="in-ad" name="profit" required value={profit} onChange={(e) => setProfit(e.target.value)} />
                    </div>
                </div>
                <div>
                    <button className="but-it" type="submit">ADD</button>
                    <button className="but-it" onClick={toggleModal}>CLOSE</button>
                </div>
            </form>
                </div>
        </div>) : (
        <section className="item-list">
        {
            products.map( (product) => (
                <Product key={product.menu_id} data={product} menuItemsCnt={menuItemsCnt} setMenuItemsCnt={setMenuItemsCnt} />
              ))
        }
        </section>)}
        </div>
    )
}