import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function OccupiedModal({ show, handleClose }) {
    console.log("nikOcc")
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Occupied Table</Modal.Title>
            </Modal.Header>
            <Modal.Body>This table is currently occupied.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function ReservedModal({ show, handleClose }) {
    console.log("nikRes")
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Reserved Table</Modal.Title>
            </Modal.Header>
            <Modal.Body>This table is reserved.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* Additional buttons or actions */}
            </Modal.Footer>
        </Modal>
    );
}

function AvailableModal({ show, handleClose }) {
    console.log("nikAvai")
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Available Table</Modal.Title>
            </Modal.Header>
            <Modal.Body>This table is available.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* Additional buttons or actions */}
            </Modal.Footer>
        </Modal>
    );
}

export { OccupiedModal, ReservedModal, AvailableModal };
