import './Table.scss'
import { useEffect, useState } from 'react';
import { table } from '../AxiosCreate'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Table() {

    const [dinnTable, setDinnTable] = useState([]);
    const [selectTable, setSelectTable] = useState(0)

    const [showAvailable, setShowAvailable] = useState(false);   // for React-Modal
    const [showOccupied, setShowOccupied] = useState(false);   // for React-Modal
    const handleClose = () => 
    {
        setShowAvailable(false);
        setShowOccupied(false);
    }


    const handleShow = (table) => {
        console.log(table);
        console.log("nik0")
        console.log(table.status);
        if(table.status=='available') {
            console.log("nik1");
        }
        else {
            console.log("nik2");
        }
        return;
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
                    <span onClick={handleShow(item)} className={`status ${item.status === 'occupied' ? 'occupied' : item.status === 'reserved' ? 'reserved' : 'available'}`}>{item.status}</span>
                </td>
            </tr>
            // </Link>
        );
    });

    return (
        <>
            <Modal show={showAvailable} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Get Table</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to dine at table-{} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Yup!
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showOccupied} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Occupied!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to dine at table-{} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Yup!
                    </Button>
                </Modal.Footer>
            </Modal>


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