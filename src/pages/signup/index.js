import React from 'react';
import styles from './signup.module.css';
import SignUpForm from "../../_components/components/Sign-up-Form";

const SignUp = () =>{
    return (
        <div className={`${styles.mainContainer}`}>
                <div className={`${styles.leftPerson}`}><img className={`${styles.leftPersonImg}`} src="images/signup-left-man.png" alt="left person" /></div>
                <div className={styles.formContainer}>
                    <SignUpForm />
                </div>
                <div className={`${styles.rightPerson}`}><img className={`${styles.rightPersonImg}`} src="images/signup-right-man.png" alt="right person" /></div>
        </div>
    )
};

export default SignUp;

export async function getServerSideProps() {

    // Redirect away from the signup route if app_type is B2B
    if (process.env.APP_TYPE === 'B2B') {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    // If no redirection needed, return an empty object
    return { props: {} };
}