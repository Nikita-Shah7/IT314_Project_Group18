import React,{ useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {table as tableAxios} from '../AxiosCreate';
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
        tableAxios.get(`/`)
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
        await tableAxios.post(`/`, data, {
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
            if(response.status===201){
                toast.success("Table created successfully");
            }
            })
            .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
            toast.error("Table already exists.")
            });
    }

    return(
    <div className='adm-ad'>
        <div className="addi-ad">
            <div className='w-ad'>
                <h2 className='ti-ad'>Tables </h2>
                <button className="but-list-ad" onClick={toggleModal}>Add DinnTable</button>
            </div>
        </div>
        { modal&&(
            <div className='overlay-ad' onClick={toggleModal}>
                <div className='content-ad' onClick={(event) => event.stopPropagation()} >
                <form className='mrow-ad' onSubmit={addTable}>
                <div className="row-ad">
                        <label htmlFor="title" >Table No. : </label>
                    <input type="number" className='in-ad' name="table_id" required value={tableid} onChange={(e) => setTableid(e.target.value)} />
                </div>
                <div className="row-ad">
                    <label htmlFor="title" >Capacity :</label>
                    <input type="number"  className="in-ad" name="capacity" required value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                </div>
                < div className="row-ad">
                        <label htmlFor="title" >Availability Status :</label>
                    <select className="in-ad"  name="avail_stat" required value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value)}>
                                       <option value="">Select availability status</option>
                                        <option value="Available">Available</option>
                                        <option value="Occupied">Occupied</option>
                    </select>
                </div>
                <div className='bu-fo-ad'>
                    <button className="but2-list-ad" type="submit">ADD</button>
                    <button className="but2-list-ad" onClick={toggleModal}>CLOSE</button>
                </div>
            </form>
                </div>
        </div>)}
            <section className="item-list-ad">
            {
                dinnTable.map( (table) => (
                    <Table key={table.table_id} data={table} dinnTableCnt={dinnTableCnt} setDinnTableCnt={setDinnTableCnt} />
                  ))
            }
            </section>
        </div>
    )
}