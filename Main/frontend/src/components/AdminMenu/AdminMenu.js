import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantMenu as menuAxios, category as categoryAxios } from '../AxiosCreate';
import './AdminMenu.css';
import Product from './product';
import AdminCategory from '../AdminCategory/AdminCategory'; // Import the AdminCategory component
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export default function() {

    // console.log("nik in admin menu");
    const navigate = useNavigate();
    if(!localStorage.getItem("isAdminAuth")) {
        navigate('/adminlogin');
    }
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [menuItemsCnt, setMenuItemsCnt] = useState(0);
    const [menuName, setMenuName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [profit, setProfit] = useState();
    const [img, setImg] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorModalMessages, setErrorModalMessages] = useState([]);
    const toggleErrorModal = (messages) => {
        setErrorModalMessages(messages);
        setShowErrorModal(!showErrorModal);
      };
      const validateInput = () => {
        const errors = [];
    
        if (price <= 0) {
          errors.push('Price must greater or equal to zero');
        }
    
        if (profit < 0 || profit > price ) {
          errors.push('Profit must be between 0 and Price');
        }
    
        return errors;
      };
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
    const [modal,setModal] = useState(false);

    const toggleModal = () => {
        setMenuItemsCnt(menuItemsCnt + 1);
            setMenuName("");
            setCategory("");
            setDescription("");
            setPrice();
            setProfit();
            setImg("");
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
        const validationErrors = validateInput();

    if (validationErrors.length > 0) {
      setLoading(false);
      toggleErrorModal(validationErrors);
      return;
    }
        const data = {
            menu_name: menuName,
            categoryName: category,
            description: description,
            price: price,
            profit: profit,
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
            setPrice();
            setProfit();
            setImg("");
            console.log([response.data][0].message);
            setModal(!modal)
            setLoading(false);
            if (response.status === 201) {
                toast.success("MenuItem created successfully ");
              } 

            })
            .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
            toast.error("MenuItem can't be created.");
            });
    }

    return(
        <div className='adm'>
            {/* <AdminCategory setCategory={setCategories} /> Pass setCategories as a prop */}
        <div className="addi-a">
        <h2>Menu Items  </h2>
        <button className="but-list-a" onClick={toggleModal}>Add Item</button>
        </div>
        { modal && (
            <div className='overlay-a' onClick={toggleModal}>
                <div className='content-a' onClick={(event) => event.stopPropagation()} >
                <form className='mrow-a' onSubmit={addItem}>
                <div className="row-a">
                        <label htmlFor="title" >Item Name :</label>
                    <input type="text" className="in-a" name="menu_name" required value={menuName} onChange={(e) => setMenuName(e.target.value)} />
                </div>
                <div className="row-a">
                <label htmlFor="text">Category Name :</label>
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
                <div className="row-a">
                        <label htmlFor="author">Short Description :</label>
                    <input type="text" className="in-a" name="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="row-a">
                        <label htmlFor="img">Image URL:</label>
                        <input type="text" className="in-ad" name="img" required value={img} onChange={(e) => setImg(e.target.value)} />
                </div>
                <div className="row-a">
                    <label htmlFor="content">Price :</label>
                    <input type="number" className="in-a" name="price" required value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="row-a">
                    <label htmlFor="content" >Profit :</label>
                    <input type="number" className="in-a" name="profit" required value={profit} onChange={(e) => setProfit(e.target.value)} />
                </div>
                <div className='bu-fo-a'>
                    <button className="but2-list-a" type="submit">ADD</button>
                    <button className="but2-list-a" onClick={toggleModal}>CLOSE</button>
                </div>
            </form>
                </div>
        </div>)}
        <section className="item-list">
        {
            products.map( (product) => (
                <Product key={product.menu_id} data={product} menuItemsCnt={menuItemsCnt} setMenuItemsCnt={setMenuItemsCnt} />
              ))
        }
        </section>
        <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
        <Modal.Header closeButton={false} style={{ backgroundColor: '#942D2D', color: '#EBF2D5' }}>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: '#942D2D', backgroundColor: '#EBF2D5' }}>
          {errorModalMessages.map((message, index) => (
            <p key={index}>&#8226; {message}</p>
          ))}
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: '#EBF2D5' }}>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)} style={{ backgroundColor: '#942D2D', color: '#EBF2D5' }}>
            Close
          </Button> 
        </Modal.Footer>
      </Modal>
        </div>
    )
}