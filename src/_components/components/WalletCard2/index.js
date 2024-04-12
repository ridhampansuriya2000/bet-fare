import React from 'react';
import styles from './WalletCard2.module.css';

const WalletCard2 = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={`row`}>
                <div className={`col col-md-4 col-sm-12`}>
                    <div className={styles.detailsField}>
                                <span className={styles.label}>
                                    eligible interest bonus
                                </span>
                        <span className={styles.amount}>
                                    <i className="fa-solid fa-indian-rupee-sign"/>0
                                </span>
                    </div>
                </div>
                <div className={`col col-md-4 col-sm-12`}>
                    <div className={styles.detailsField}>
                                <span className={styles.label}>
                                    eligible interest bonus
                                </span>
                        <span className={styles.amount}>
                                    <i className="fa-solid fa-indian-rupee-sign"/>10,000
                                </span>
                    </div>
                </div>
                <div className={`col col-md-4 col-sm-12`}>
                    <div className={styles.detailsField}>
                                <span className={styles.label}>
                                   release date
                                </span>
                        <span className={styles.amount}>
                                    <i className="fa-solid fa-indian-rupee-sign"/>10,000
                                </span>
                    </div>
                </div>
            </div>

            <div className={styles.noteBox}>
                <div className={styles.note}>
                    * Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt.
                </div>
            </div>
        </div>
    )
};

export default WalletCard2;