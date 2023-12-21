import React, { useState } from 'react';
import { table as tableAxios } from '../AxiosCreate';
import './Tab.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import ButtonComponent from '../Button/ButtonComponent';
export default function AdminTable(props) {

    // console.log(props.data)
    const [loading, setLoading] = useState(true);
    const [tableid, setTableid] = useState(props.data.table_id);
    const [capacity, setCapacity] = useState(props.data.capacity);
    const [availabilityStatus, setAvailabilityStatus] = useState(props.data.availability_status);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorModalMessages, setErrorModalMessages] = useState([]);
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }
    const toggleErrorModal = (messages) => {
        setErrorModalMessages(messages);
        setShowErrorModal(!showErrorModal);
    };
    const validateInput = () => {
        const errors = [];

        if (tableid <= 0 || tableid >= 50) {
            errors.push('Table ID must be between 1 and 49');
        }

        if (capacity <= 0 || capacity >= 20) {
            errors.push('Capacity must be between 1 and 19');
        }

        return errors;
    };

    const editTable = async (e) => {
        e.preventDefault();

        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken)
        if (!accessToken) {
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
                props.setDinnTableCnt(props.dinnTableCnt + 1);
                props.setDinnTableCnt(props.dinnTableCnt - 1);
                setLoading(false);
                if (response.status === 200) {
                    toast.success("Edited Successfully");
                }
            })
            .catch((error) => {
                console.log("ERROR MESSAGE ::", error)
                setLoading(false);
                toast.error("Table already exists.")
            });
    }

    const deleteTable = async () => {
        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken)
        if (!accessToken) {
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
                props.setDinnTableCnt(props.dinnTableCnt - 1);
                setLoading(false);
                if (response.status === 200) {
                    toast.success("Table removed successfully");
                }
            })
            .catch((error) => {
                console.log("ERROR MESSAGE ::", error)
                setLoading(false);
                toast.error("Database error.")
            });
    }

    return (
        <div className='card-tab my-2'>
            {props.data.availability_status == "Available" ? (<div className='g-tab'></div>) : (<div className='r-tab'></div>)}
            <div className='wrp-tab-2 py-2'>
                <div className='wrp-tab'>
                    <h3 className='te-tab'>T{props.data.table_id}</h3>
                    <p className='cat-tab'>Capacity : {props.data.capacity}</p>
                    <p className='cat-tab'>Availability Status : {props.data.availability_status}</p>
                </div>
                <ButtonComponent color={"button5"} message={"Edit"} func={toggleModal} />
                <ButtonComponent color={"button5"} message={"Delete"} func={deleteTable} />
            </div>
            {modal && (
                <div className='overlay-tab' onClick={toggleModal}>
                    <div className='content-tab' onClick={(event) => event.stopPropagation()} >
                        <form className='mrow-tab' onSubmit={editTable}>
                            <div className="row-tab">
                                <label htmlFor="title" >Table No. :</label>
                                <input type="number" className="in-tab" name="table_id" required value={tableid} onChange={(e) => setTableid(e.target.value)} />
                            </div>
                            <div className="row-tab">
                                <label htmlFor="title" >Capacity :</label>
                                <input type="number" className="in-tab" name="capacity" required value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                            </div>
                            <div className="row-tab">
                                <label htmlFor="title" >Availability Status:</label>
                                <select className="in-tab" name="avail_stat" required value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value)}>
                                    <option value="Available">Available</option>
                                    <option value="Occupied">Occupied</option>
                                </select>
                            </div>
                            <div className='bu-fo-tab'>
                                <ButtonComponent color={"primary"} message={"Edit"} />
                                <ButtonComponent color={"secondary"} message={"Close"} func={toggleModal} />
                            </div>
                        </form>
                    </div>
                </div>)}
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
                <Modal.Header closeButton={false} style={{ backgroundColor: '#942D2D', color: '#EBF2D5' }}>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ color: '#942D2D', backgroundColor: '#EBF2D5' }}>
                    {errorModalMessages.map((message, index) => (
                        <p key={index}>&#8226; {message}</p>
                    ))}
                </Modal.Body>
                <Modal.Footer >
                    <ButtonComponent color={"secondary"} message={"CLOSE"} func={() => setShowErrorModal(false)} />
                </Modal.Footer>
            </Modal>
        </div>
    )
}