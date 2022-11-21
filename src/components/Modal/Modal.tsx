import React, {FC} from 'react';
import ReactDOM from "react-dom";
import classes from './Modal.module.scss';

interface ModalProps {
    showModal: (value: boolean) => void;
}

const Modal: FC<ModalProps> = ({showModal}) => {
    const closeModal = () => {
        showModal(false);
    }

    return ReactDOM.createPortal(
        <>
            <div className={classes.overlay} onClick={closeModal}/>
            <div className={classes.modal}>
                <button className={classes.closeBtn}
                        onClick={closeModal}>&times;</button>
                <p>Успешно сохранено</p>
            </div>
        </>,
        document.querySelector("#modal-root")!
    );
};

export default Modal;