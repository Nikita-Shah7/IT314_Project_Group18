import React, { useState } from 'react';
import { category as categoryAxios } from '../AxiosCreate';
import './Cat.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ButtonComponent from '../Button/ButtonComponent';

export default function Category(props) {

    // console.log(props.data)
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState(props.data.categoryName);

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }
    const editCategory = async (e) => {
        e.preventDefault();

        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken)
        if (!accessToken) {
            setLoading(false);
            // alert('An error happened. Please Check console');
            // enqueueSnackbar('UNAUTHORIZED !!', { variant: 'error' });
            console.log("UNAUTHORIZED!!");
            toast.error("Authorization error.");
            return;
        }

        const data = {
            categoryName: categoryName
        }
        await categoryAxios.put(`/${props.data.category_id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then((response) => {
                // console.log([response.data][0].data)
                console.log([response.data][0].message);
                setModal(!modal)
                // just re-render all items
                props.setCategoryCnt(props.categoryCnt + 1);
                props.setCategoryCnt(props.categoryCnt - 1);
                setLoading(false);
                if (response.status === 200)
                    toast.success("Category name edited succesfully.");
            })
            .catch((error) => {
                console.log("ERROR MESSAGE ::", error);
                toast.error("Category already exists");
                setLoading(false);
            });
    }

    const deleteCategory = async () => {
        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken)
        if (!accessToken) {
            setLoading(false);
            // alert('An error happened. Please Check console');
            // enqueueSnackbar('UNAUTHORIZED !!', { variant: 'error' });
            console.log("UNAUTHORIZED!!");
            return;
        }

        await categoryAxios.delete(`/${props.data.category_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then((response) => {
                // console.log([response.data][0].data)
                console.log([response.data][0].message);
                props.setCategoryCnt(props.categoryCnt - 1);
                setLoading(false);
                if (response.status === 200)
                    toast.success("Category deleted succesfully.");
            })
            .catch((error) => {
                console.log("ERROR MESSAGE ::", error)
                setLoading(false);
                toast.error("Category is not deleted due to database error.");
            });
    }

    return (
        <div className='card-t p-3 my-2' >
            <div className='wrp-2-t'>
                <div className='wrp-t'>
                    <h3 className='te-t'>{props.data.categoryName}</h3>
                    <p className='cat-t'>Item count: {props.data.item_count}</p>
                </div>
                <div className='admin-category-button'>
                    <ButtonComponent color={"button5"} message={"Edit"} func={toggleModal} />
                    <ButtonComponent color={"button5"} message={"Delete"} func={deleteCategory} />
                </div>
            </div>
            {modal && (
                <div className='overlay-t' onClick={toggleModal}>
                    <div className='content-t' onClick={(event) => event.stopPropagation()} >
                        <form className='mrow-t' onSubmit={editCategory}>
                            <div className="row-t">
                                <label htmlFor="title" >Category Name: </label>
                                <input type="text" required className='in-t' name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                            </div>
                            <div className='bu-fo-t'>
                                <ButtonComponent color={"primary"} message={"Edit"} />
                                <ButtonComponent color={"secondary"} message={"Close"} func={toggleModal} />
                            </div>
                        </form>
                    </div>
                </div>)}
        </div>
    )
}