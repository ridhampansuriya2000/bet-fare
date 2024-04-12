import React from 'react';
import styles from './LoyaltyCard.module.css';

const LoyaltyCard = () =>{
    return(
        <div className={styles.mainContainer}>
            <div className={styles.loyaltyCard}>
                <div className={styles.logoWrapper}>
                    <h3 className={styles.packActivated}>Blue</h3>
                    <img src="images/logo.png" alt="Logo"/>
                </div>
                <div className={styles.clientNameWrapper}>
                    <h4 className={styles.clientName}>John Doe</h4>
                    <a className={styles.linkStripe} href="#">Learn about your loyalty benefits &gt; &gt;</a>
                </div>
            </div>
        </div>
    )
};

export default LoyaltyCard;