import React, {useState} from 'react';
import './App.css';
import Form from "./components/Form/Form";
import Container from "./components/Container/Container";
import Modal from "./components/Modal/Modal";

function App() {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <div>
            <Container>
                <Form showModal={setShowModal}/>
                {showModal && <Modal showModal={setShowModal}/>}
            </Container>
        </div>
    );
}

export default App;
