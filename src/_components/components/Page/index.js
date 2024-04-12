import React from 'react';


import styles from './Page.module.css';
import BackwardNavBar from "../BackwardNavBar";

const Page = () =>{
    return(
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={"Page"}/>
            <div className={styles.innerContainer}>

            </div>
        </div>
    )
};

export default Page;