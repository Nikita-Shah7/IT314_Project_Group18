import React,{ useState } from 'react';
import {table as tableAxios} from '../AxiosCreate';
import './Tab.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AdminTable(props) {

    // console.log(props.data)
    const [loading, setLoading] = useState(true);
    const [tableid, setTableid] = useState(props.data.table_id);
    const [capacity, setCapacity] = useState(props.data.capacity);
    const [availabilityStatus, setAvailabilityStatus] = useState(props.data.availability_status);

    const [modal,setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }
    const editTable = async(e) => {
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
            table_id: tableid,
            capacity: capacity,
            availability_status: availabilityStatus           
        }
        await tableAxios.put(`/${props.data.table_id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then((response) => {
            // console.log([response.data][0].data)
            console.log([response.data][0].message);
            setModal(!modal)
            // just re-render all items
            props.setDinnTableCnt(props.dinnTableCnt+1);
            props.setDinnTableCnt(props.dinnTableCnt-1);
            setLoading(false);
            if(response.status===200){
                toast.success("Edited Successfully");
            }
            })
            .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
            toast.error("Database error.")
            });
    }

    const deleteTable = async () => {
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

        await tableAxios.delete(`/${props.data.table_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then((response) => {
            // console.log([response.data][0].data)
            console.log([response.data][0].message);
            props.setDinnTableCnt(props.dinnTableCnt-1);
            setLoading(false);
            if(response.status===200){
                toast.success("Table removed successfully");
            }
            })
            .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
            toast.error("Database error.")
            });
    }

    return(
        <div className='card-tab'>
        {props.data.availability_status=="Available"?(<div className='g-tab'></div>):(<div className='r-tab'></div>)}
            <div className='wrp-tab-2'>
                <div className='wrp-tab'>
                    <h3 className='te-tab'>T{props.data.table_id}</h3>
                    <p className='cat-tab'>Capacity : {props.data.capacity}</p>
                    <p className='cat-tab'>Availability Status : {props.data.availability_status}</p>
                </div>
            <button className='but-tab' onClick={toggleModal}>Edit</button>
            <button className='but-tab' onClick={deleteTable}>Delete</button>
            </div>
            { modal && (
            <div className='overlay-tab' onClick={toggleModal}>
                <div className='content-tab' onClick={(event) => event.stopPropagation()} >
                <form className='mrow-tab' onSubmit={editTable}>
                <div className="row-tab">
                        <label htmlFor="title" >Table No. :</label>
                        <input type="number" className="in-it" name="table_id" required value={tableid} onChange={(e) => setTableid(e.target.value)} />
                </div>
                <div className="row-tab">
                    <label htmlFor="title" >Capacity :</label>
                    <input type="number" className="in-it" name="capacity" required value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                </div>
                <div className="row-tab">
                    <label htmlFor="title" >Availability Status:</label>
                    <select className="in-it" name="avail_stat" required value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value)}>
                                        <option value="Available">Available</option>
                                        <option value="Occupied">Occupied</option>
                    </select>
                </div>
                <div className='bu-fo-tab'>
                    <button className="but2-list-tab" type="submit">EDIT</button>
                    <button className="but2-list-tab" onClick={toggleModal}>CLOSE</button>
                </div>
            </form>
                </div>
        </div>)}    
        </div>
    )
}