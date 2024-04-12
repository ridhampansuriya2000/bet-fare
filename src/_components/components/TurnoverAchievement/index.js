import React from 'react';
import styles from './TurnoverAchievement.module.css';

const TurnoverAchievement = () =>{
    return(
        <div className={styles.mainContainer}>
                <div className={styles.currentPackage}>
                    <p>Your Current Turnover from 30-03-2022 to 26-09-2022 is <span>
                            <i className="fa-solid fa-indian-rupee-sign"/> 0</span></p>

                    <ul className={styles.packTimeline}>
                        <li className={styles.bluePack}>
                            <div className={styles.packInner}>
                                <span className={styles.packName}>blue</span>
                                <span className={styles.turnover}>(<i className="fa-solid fa-indian-rupee-sign"/>0 to blue)</span>
                            </div>
                        </li>
                        <li className={styles.silverPack}>
                            <div className={styles.packInner}>
                                <span className={styles.packName}>silver</span>
                                <span className={styles.turnover}>(<i className="fa-solid fa-indian-rupee-sign"/>0 to silver)</span>
                            </div>
                        </li>
                        <li className={styles.goldPack}>
                            <div className={styles.packInner}>
                                <span className={styles.packName}>gold</span>
                                <span className={styles.turnover}>(<i className="fa-solid fa-indian-rupee-sign"/>0 to gold)</span>
                            </div>
                        </li>
                        <li className={styles.platinumPack}>
                            <div className={styles.packInner}>
                                <span className={styles.packName}>Platinum</span>
                                <span className={styles.turnover}>(<i className="fa-solid fa-indian-rupee-sign"/>0 to platinum)</span>
                            </div>
                        </li>
                    </ul>

                </div>
        </div>
    )
};

export default TurnoverAchievement;