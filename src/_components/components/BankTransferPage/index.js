import React from 'react';


import styles from './BankTransferPage.module.css';
import BackwardNavBar from "../BackwardNavBar";
import FeatureCard from "../FeatureCard";
import BankFeaturesCards from "../BankFeaturesCards";
import InfoPoints from "../InfoPoints";
import AmountForm from "../AmountForm";

const listCard = [
    {src: 'images/bank-icon.svg', contentInfo: 'Bank Transfers'},
    {src: 'images/instant-withdrawal.svg', contentInfo: 'Payment Gateway'}
];

const infoPoints = [
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
];

const BankTransferPage = () => {
    return (
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={"Choose Deposit Method"} endContent={<div className={styles.reference}>Ref & earn</div>}/>
            <div className={styles.innerContainer}>
                <section className={styles.BankFeaturesSection}>
                    <BankFeaturesCards data={listCard}/>
                </section>

                <section className={styles.balanceInfoSection}>
                    <div className={styles.balanceInfoBox}>
                        <img src="images/wallet-1.svg" alt="Current Balance"/>
                        <span>
                            Balance:</span>
                        <span className="amount">
                            <i className="fa-solid fa-indian-rupee-sign"/>
                            <span>10,000
                            </span>
                        </span>
                    </div>
                    <div className={styles.balanceInfoBox}>
                        <img src="images/wallet-1.svg" alt="Current Balance"/>
                        <span>
                            available withdrawal:</span>
                        <span className="amount">
                            <i className="fa-solid fa-indian-rupee-sign"/>
                            <span>0
                            </span>
                        </span>
                    </div>
                </section>

                <section className={styles.amountFromSection}>
                    <AmountForm />
                </section>

                <section>
                    <InfoPoints data={infoPoints}/>
                </section>

            </div>
        </div>
    )
};

export default BankTransferPage;