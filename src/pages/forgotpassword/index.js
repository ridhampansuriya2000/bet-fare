import React from 'react';
import styles from './login.module.css';
import ForgotPasswordForm from "../../_components/components/ForgotPasswordForm";

const ForgotPassword = () =>{
    return (
        <div className={`${styles.mainContainer}`}>
                <div className={`${styles.leftPerson}`}><img className={`${styles.leftPersonImg}`} src="images/signup-left-man.png" alt="left person" /></div>
                <div className={styles.formContainer}>
                    <ForgotPasswordForm />
                </div>
                <div className={`${styles.rightPerson}`}><img className={`${styles.rightPersonImg}`} src="images/signup-right-man.png" alt="right person" /></div>
        </div>
    )
};

export default ForgotPassword;