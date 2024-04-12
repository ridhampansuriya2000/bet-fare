import React from 'react';
import styles from './InfoPoints.module.css';

const InfoPoints = ({data}) =>{
    return(
        <div className={styles.mainContainer}>
            <div className={styles.InfoPointsBox}>
                <div>
                    <ul>
                        {data?.map((item,index)=>(
                          <li>{item?.point}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default InfoPoints;