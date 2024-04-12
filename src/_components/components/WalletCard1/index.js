import React from 'react';
import styles from './WalletCard1.module.css';
import Button from "../../view/Button";

const WalletCard1 = () =>{
    return(
        <div className={styles.mainContainer}>
            <div className={`row`}>
                <div className={`col col-md-8 col-sm-12`}>
                    <div className={`row`}>
                        <div className={`col col-md-6 col-sm-12`}>
                            <div className={styles.detailsGroup}>
                                <div className={styles.detailsField}>
                                <span className={styles.label}>
                                    wallet amount
                                </span>
                                    <span className={styles.amount}>
                                    <i className="fa-solid fa-indian-rupee-sign"/>10,000
                                </span>
                                </div>
                                <div className={styles.detailsField}>
                                <span className={styles.label}>
                                    net exposure
                                </span>
                                    <span className={styles.amount}>
                                    <i className="fa-solid fa-indian-rupee-sign"/>0
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className={`col col-md-6 col-sm-12`}>
                            <div className={styles.detailsGroup}>
                            <div className={styles.detailsField}>
                                <span className={styles.label}>
                                    available withdrawal
                                </span>
                                <span className={styles.amount}>
                                    <i className="fa-solid fa-indian-rupee-sign"/>0
                                </span>
                            </div>
                            <div className={styles.detailsField}>
                                <span className={styles.label}>
                                    bonus
                                </span>
                                <span className={styles.amount}>
                                    <i className="fa-solid fa-indian-rupee-sign"/>0
                                </span>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col col-md-4 col-sm-12`}>
                    <div className={styles.btnGroup}>
                        <Button type="submit" className={styles.submitBtn}>Deposit</Button>
                        <Button type="submit" className={styles.submitBtn}>Instant Withdrawal</Button>
                        <Button type="submit" className={styles.submitBtn}>Withdrawal</Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default WalletCard1;