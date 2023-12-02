import React,{ useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {category as categoryAxios} from '../AxiosCreate';
import './AdminCat.css'
import Category from './category';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AdminCategory() {

    // console.log("nik in admin category");
    const navigate = useNavigate();

    if(!localStorage.getItem("isAdminAuth")) {
        navigate('/adminlogin');
    }

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [categoryCnt, setCategoryCnt] = useState(0);

    useEffect(() => {
        setLoading(true)
        categoryAxios.get('/')
          .then((response) => {
            // console.log([response.data][0].data)
            setCategoryCnt([response.data][0].count);
            setCategory([response.data][0].data)
            setLoading(false);
          })
          .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
          });
      }, [categoryCnt]);


    const [modal,setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }
      
    
    const addCategory = async(e) => {
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
            toast.error("Authorization error.");
            return;
        }

        const data = {
            categoryName: categoryName,
        }
        await categoryAxios.post('/', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then((response) => {
            // console.log([response.data][0].data)
            setCategoryCnt(categoryCnt + 1);
            setCategoryName("");
            console.log([response.data][0].message);
            setModal(!modal)
            setLoading(false);
            if(response.status === 201){
            toast.success("Category created succesfully.");
            }
            })
            .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
            toast.error("Category is not created. Database error.");
            });
    }
    
    return(
    <div className='adm-cat'>
        <div className="addi-cat">
            <div className='w-cat'>
                <h2 className='ti-cat'>Categories  </h2>
                <button className="but-list-cat" onClick={toggleModal}>Add Category</button>
            </div>
        </div>
        { modal ? (
            <div className='overlay-cat' onClick={toggleModal}>
                <div className='content-ct' onClick={ (event) => event.stopPropagation()} >
                <form className='mrow-cat' onSubmit={addCategory}>
                <div className="row-cat">
                    <div className='catName'>
                        <label htmlFor="title" ><p>Category Name : </p></label>
                    </div>
                    <div>
                        <input type="text" style={{width: '100%'}} className="in-ad" name="category" required value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                    </div>
                </div>
                <div className='bu-fo-cat'>
                    <button className="but2-list-cat" type="submit">ADD</button>
                    <button className="but2-list-cat" onClick={toggleModal}>CLOSE</button>
                </div>
            </form>
                </div>
        </div>) : (
            <section className="item-list">
            {
                category.map( (item) => (
                    <Category key={item.category_id} data={item} categoryCnt={categoryCnt} setCategoryCnt={setCategoryCnt} />
                  ))
            }
            </section>
        )}    
        </div>
    )
}