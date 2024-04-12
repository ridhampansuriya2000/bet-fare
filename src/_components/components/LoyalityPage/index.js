import React from 'react';
import styles from './LoyaltyPage.module.css';
import BackwardNavBar from "../BackwardNavBar";
import SubNav from "../SubNav";
import RulesRegulations from "../RulesRegulations";
import ClubLoyalty from "../ClubLoyalty";
import LoyaltyCard from "../LoyaltyCard";


const LoyaltyPage = () => {

    return (
        <div className={styles.mainContainer}>

            <BackwardNavBar pageName={"Profile"}/>

            <div className={styles.innerContainer}>

                <div className={styles.loyaltyCardSlider}>
                    <div className={styles.heading}>CLUB LOYALTY</div>
                    <ClubLoyalty />
                </div>

                <section className={styles.turnoverAchievementSection}>
                    <div className={styles.turnoverAchievementBox}>
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
                </section>

                <section className={styles.cardSection}>
                    <LoyaltyCard />
                </section>

                <section className={styles.rulesRegulationSection}>
                    <RulesRegulations />
                </section>
            </div>

        </div>
    )
};

export default LoyaltyPage;