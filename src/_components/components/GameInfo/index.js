import React from 'react';
import styles from './GameInfo.module.css';
import Label from "../Label";

const GameInfo = ({
                      name='Cricket',
                      title='England Women Vs India Women.',
                      logo='images/cricket.svg',
                      labelList=[]
                  }) =>{
    return(
        <div className={styles.mainContainer}>
            <div className={styles.header}>
                <img src={logo} alt={logo} width='20px'/>
                <span>{name}</span>
            </div>
            <div className={styles.titleBox}>
                <span className={styles.title}>{title}</span>
                <span className={styles.startIcon}><i className="fa-solid fa-star" /></span>
            </div>
            <div className={`row`}>
                <div className={`col col-xs-6 p-5`}>
                    <Label />
                </div>
                <div className={`col col-xs-6 p-5`}>
                    <Label bgColor='#0d5eac'/>
                </div>
                <div className={`col col-xs-6 p-5`}>
                    <Label />
                </div>
                <div className={`col col-xs-6 p-5`}>
                    <Label bgColor='#0d5eac'/>
                </div>

            </div>
        </div>
    )
};

export default GameInfo;