import React from 'react';


import styles from './UnderagePage.module.css';
import Logo from "../Logo";


const UnderagePage = () =>{
    return(
        <div className={styles.mainContainer}>
            <div className={styles.innerContainer}>
                <div className={`${styles.justifyCenter} mt-20 mb-20`}>
                    <Logo/>
                </div>
                <dl className={`${styles.contentBox}`}>
                    <span className={styles.title}>Protection of minors</span>
                    <dd className={styles.content}>It is illegal for anybody under the age of 18 to gamble.</dd>
                    <dd className={styles.content}>Our site has strict policies and verification measures to prevent access to minors.</dd>
                    <dd className={styles.content}>We encourage parents consider the use of internet use protection tools. You may find the following links useful.</dd>
                </dl>
            </div>
        </div>
    )
};

export default UnderagePage;