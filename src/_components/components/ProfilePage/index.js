import React from 'react';


import styles from './ProfilePage.module.css';
import LoyaltyCard from "../LoyaltyCard";
import TurnoverAchievement from "../TurnoverAchievement";
import ProfileDetailsCard from "../ProfileDetailsCard";
import BackwardNavBar from "../BackwardNavBar";
import {useSelector} from "react-redux";

const ProfilePage = () => {

    let {  user } = useSelector((state)=>({
        user : state.auth.data?.user,
    }));

    return (
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={"Profile"}/>
            <div className={styles.innerContainer}>
                <section className={styles.profileSection}>
                    <div className={`row`}>
                        <div className={`col col-md-6 col-sm-12`}>
                            <div className={styles.titleBox}>
                                <h4 className={styles.title}>
                                    Your Details
                                </h4>
                                <span><img src="images/edit-icon.svg" alt="Edit Icon"/> <span className={styles.greenText}>Profile</span></span>
                            </div>
                            <ProfileDetailsCard user={user}/>
                        </div>
                        <div className={`col col-md-6 col-sm-12`}>
                            <div className={styles.titleBox}>
                                <h4 className={styles.title}>
                                    Loyalty
                                </h4>
                            </div>
                            <LoyaltyCard/>
                        </div>
                    </div>
                </section>
                <section className={styles.turnoverAchievementSection}>
                    <TurnoverAchievement/>
                </section>
            </div>
        </div>
    )
};

export default ProfilePage;