import React from 'react';
import styles from './PaymentMethods.module.css';

const PaymentMethods = () =>{
    return(
        <div className={styles.mainContainer}>
            <h2 className={styles.paymentHeading}> our Payment Methods </h2>
            <div className={styles.paymentCards}>
                <div className={styles.paymentCard}><img src="images/upi.png" width={110} height={50}
                                                         alt="UPI Payment"/></div>
                <div className={styles.paymentCard}><img src="images/ethereum.png" width={110} height={50}
                                                         alt="ethereum Payment"/></div>
                <div className={styles.paymentCard}><img src="images/bitcoin.png" width={110} height={50}
                                                         alt="Bitcoin Payment"/></div>
                <div className={styles.paymentCard}><img src="images/cards.png" width={110} height={50}
                                                         alt="Card Payment"/></div>
            </div>
        </div>
    )
};

export default PaymentMethods;