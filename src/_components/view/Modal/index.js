import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ title='',body,onClose,closeBtn, hideCloseBtn=false }) =>{
    return(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    {!hideCloseBtn &&
                    (closeBtn ?
                            <span onClick={onClose}>closeBtn</span>
                            : <button className={styles.closeButton} onClick={onClose}>×</button>)}
                </div>
                <div className={styles.body}>
                    {body}
                </div>
            </div>
        </div>
    )
};

export default Modal;