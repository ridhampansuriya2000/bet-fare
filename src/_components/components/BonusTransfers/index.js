import React from 'react';
import styles from './BonusTransfers.module.css';
import Button from "../../view/Button";

const BonusTransfers = () => {
    return (
        <div className={styles.mainContainer}>
            <h4 className={styles.heading}>
                PENDING BONUS TRANSFERS
            </h4>
            <div className={styles.contentBox}>
                <div className={styles.innerEmptyContent}>
                    No Pending Transactions Found!
                </div>
            </div>
        </div>
    )
};

export default BonusTransfers;