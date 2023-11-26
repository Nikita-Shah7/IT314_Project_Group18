import React,{ useState } from 'react';
import axios from 'axios';
import './Cat.css'

export default function Category(props) {

    // console.log(props.data)
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState(props.data.categoryName);

    const [modal,setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }
    const editCategory = async(e) => {
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
            categoryName: categoryName
        }
        await axios.put(`http://localhost:5555/category/${props.data.category_id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then((response) => {
            // console.log([response.data][0].data)
            console.log([response.data][0].message);
            setModal(!modal)
            // just re-render all items
            props.setCategoryCnt(props.categoryCnt+1);
            props.setCategoryCnt(props.categoryCnt-1);
            setLoading(false);
            })
            .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
            });
    }

    const deleteCategory = async () => {
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

        await axios.delete(`http://localhost:5555/category/${props.data.category_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then((response) => {
            // console.log([response.data][0].data)
            console.log([response.data][0].message);
            props.setCategoryCnt(props.categoryCnt-1);
            setLoading(false);
            })
            .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
            });
    }

    return(
        <div className='card-cat'>
                <div className='wrp-cat'>
                    <h3 className='te-cat'>{props.data.categoryName}</h3>
                    <p className='cat-cat'>Item count : {props.data.item_count}</p>
                </div>
            <button className='but-cat' onClick={toggleModal}>Edit</button>
            <button className='but-cat' onClick={deleteCategory}>Delete</button>
            { modal && (
            <div className='overlay-cat' onClick={toggleModal}>
                <div className='content-ct' onClick={(event) => event.stopPropagation()} >
                <form className='mrow-cat' onSubmit={editCategory}>
                <div className="row-cat">
                    <div >
                        <label htmlFor="title" ><p>Category Name : </p></label>
                    </div>
                    <div>
                        <input type="text" required className='in-ca' name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                    </div>
                </div>
                <div className='bu-fo-cat'>
                    <button className="but2-list-cat" type="submit">Edit</button>
                    <button className="but2-list-cat" onClick={toggleModal}>CLOSE</button>
                </div>
            </form>
                </div>
        </div>)}
        </div>
    )
}