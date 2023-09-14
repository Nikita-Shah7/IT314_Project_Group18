import './Table.scss'
import { useEffect, useState } from 'react';
import { table } from '../AxiosCreate'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

// // to set tableID variable that is declared globally
import { useContext } from 'react';
import { Context } from '../../context';
import ContextProvider from '../../context';


function Table() {

    const [dinnTable, setDinnTable] = useState([]);
    // const [selectedTable, setSelectedTable] = useState(null);  // get it from context.jsx
    const { selectedTable, setSelectedTable } = useContext(Context)

    const [showAvailable, setShowAvailable] = useState(false);   // for React-Modal
    const [showOccupied, setShowOccupied] = useState(false);   // for React-Modal

    const handleClose = () => {
        setShowAvailable(false);
        setShowOccupied(false);
    }

    const handleShowAvailable = (table) => {
        setSelectedTable(table);
        setShowAvailable(true);
    }

    const handleShowOccupied = (table) => {
        setSelectedTable(table);
        setShowOccupied(true);
    }

    useEffect(() => {
        table.get('').then((response) => {
            setDinnTable(response.data);
        })
    }, []);

    const renderTableList = dinnTable.map((item) => {
        console.log(item);
        return (
            // <Link to={`/menu/${item.dishID}`} state={item}>
            <tr key={item.tableID}>
                <td>{item.tableID}</td>
                <td>{item.capacity}</td>
                <td>
                <span
                        onClick={() => {
                            if (item.status === 'occupied' || item.state === 'reserved') {
                                handleShowOccupied(item);
                            } else if (item.status === 'available') {
                                handleShowAvailable(item);
                            }
                        }}
                        className={`status ${item.status === 'occupied' ? 'occupied' : item.status === 'reserved' ? 'reserved' : 'available'}`}>
                        {item.status}
                    </span>
                </td>
            </tr>
        );
    });

    return (
        <>
            <Modal show={showAvailable} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Reservation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to reserve table {selectedTable?.tableID}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {/* <Link to={'/menu'} state={selectedTable?.tableID}> */}
                    <Link to={'/menu'}>
                        <Button variant="primary" onClick={handleClose}>
                            Yup!
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>

            {/* 
            <!--works perfectly fine; but i don't think i need it-->
            <Modal show={showOccupied} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Table Occupied</Modal.Title>
                </Modal.Header>
                <Modal.Body>Table {selectedTable?.tableID} is currently occupied.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}


            <table className="table">
                <thead>
                    <tr>
                        <th>Table ID</th>
                        <th>Capacity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableList}
                </tbody>
            </table>
        </>
    );
}

export default Table;