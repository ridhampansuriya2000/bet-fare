import React from 'react';
import styles from './LoyaltyCard.module.css';

const LoyaltyCard = (props) =>{
    return(
        <div className={styles.mainContainer} key={props.key}>
            <div className={styles.cardTitle}>{props?.title || 'Silver'}</div>
            <div>
                <h4 className={styles.turnoverCount}>{props?.turnover || '₹10L'}</h4>
                <span className={styles.turnoverCountTitle}>Turnover</span>
            </div>
            <div className={styles.benifitHeader}>Benifits</div>
            <div>
                {
                    props.benifits?.map((item,index)=>(
                        <span className={styles.benifit} key={index}><img src='images/circle-check.png' width='15'/><span>{item}</span></span>
                    ))
                }
            </div>
        </div>
    )
};

export default LoyaltyCard;