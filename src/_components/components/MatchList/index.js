import React from 'react';
import styles from './MatchList.module.css';

const MatchList = ({name, list}) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.name}>
                <span><img src={'images/cricket.svg'} alt='Cricket Icon'/></span>
                <span>{name}</span>
            </div>
            <div>
                {list?.map((item, index) => (
                    <div className={styles.matchTitleBox} key={`match_title_${index}`}>
                        <div className={styles.matchTitle} key={`match_title_${index}`}>{item}</div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default MatchList;