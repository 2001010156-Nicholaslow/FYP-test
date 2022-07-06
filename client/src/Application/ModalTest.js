import Modal from "react-modal";
import React from "react";
import UserApplicationModal from "./UserApplicationModal";
import { useState } from "react"

function ModalTest(){
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    return(
    <div>
        <button onClick={toggleModal}>Open modal</button>

        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="My dialog"
        >
            <UserApplicationModal oppId='1'></UserApplicationModal>
        </Modal>
    </div>)
}

export default ModalTest;