import React,{ useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './AdminTab.css'
import Table from './Table';

export default function() {

    // console.log("nik in admin table");
    const navigate = useNavigate();

    if(!localStorage.getItem("isAdminAuth")) {
        navigate('/adminlogin');
    }

    const [loading, setLoading] = useState(true);
    const [dinnTable, setDinnTable] = useState([]);
    const [dinnTableCnt, setDinnTableCnt] = useState(0);
    const [tableid, setTableid] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [availabilityStatus, setAvailabilityStatus] = useState("");

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5555/table`)
          .then((response) => {
            // console.log([response.data][0].data)
            setDinnTableCnt([response.data][0].count);
            setDinnTable([response.data][0].data)
            setLoading(false);
          })
          .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
          });
      }, [dinnTableCnt]);


    const [modal,setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }
      
    
    const addTable = async(e) => {
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

        const data = {
            table_id: tableid,
            capacity: capacity,
            availability_status: availabilityStatus,
        }
        await axios.post(`http://localhost:5555/table`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then((response) => {
            // console.log([response.data][0].data)
            setDinnTableCnt(dinnTable + 1);
            setTableid(0);
            setCapacity(0);
            setAvailabilityStatus("");
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
    <div className='adm-tab'>
        <div className="addi-tab">
            <div className='w-tab'>
                <h2 className='ti-tab'>Tables : </h2>
                <button className="but-list-tab" onClick={toggleModal}>Add Item</button>
            </div>
        </div>
        { modal ? (
            <div className='overlay-tab' onClick={toggleModal}>
                <div className='content-ta' onClick={(event) => event.stopPropagation()} >
                <form className='mrow-tab' onSubmit={addTable}>
                <div className="row-tab">
                    <div >
                        <label htmlFor="title" ><p>Table No. : </p></label>
                    </div>
                    <div>
                    <input type="number" className="in-ad" name="table_id" required value={tableid} onChange={(e) => setTableid(e.target.value)} />
                    </div>
                </div>
                <div className="row-tab">
                    <div >
                        <label htmlFor="title" ><p>Capacity : </p></label>
                    </div>
                    <div>
                    <input type="number" className="in-ad" name="capacity" required value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                    </div>
                </div>
                <div className="row-tab">
                    <div >
                        <label htmlFor="title" ><p>Availability Status : </p></label>
                    </div>
                    <div>
                    <input type="text" className="in-ad" name="avail_stat" required value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value)} />
                    </div>
                </div>
                <div className='bu-fo-tab'>
                    <button className="but2-list-tab" type="submit">ADD</button>
                    <button className="but2-list-tab" onClick={toggleModal}>CLOSE</button>
                </div>
            </form>
                </div>
        </div>) : (
            <section className="item-list">
            {
                dinnTable.map( (table) => (
                    <Table key={table.table_id} data={table} dinnTableCnt={dinnTableCnt} setDinnTableCnt={setDinnTableCnt} />
                  ))
            }
            </section>
        )}    
        </div>
    )
}