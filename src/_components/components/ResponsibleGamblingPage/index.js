import React from 'react';


import styles from './ResponsibleGamblingPage.module.css';
import Logo from "../Logo";


const ResponsibleGamblingPage = () =>{
    return(
        <div className={styles.mainContainer}>
            <div className={styles.innerContainer}>
                <div className={`${styles.justifyCenter} mt-20 mb-20`}>
                    <Logo/>
                </div>
                <div className={styles.contentBox}>

                    <div className={styles.title}>RESPONSIBLE GAMBLING</div>

                    <p className={styles.content}>The Site is committed to Responsible Gambling and we take our responsibilities towards our
                        customers very seriously. We aim to provide an environment in which you can bet in a safe, fair
                        and above all responsible manner. If you feel you may have a problem when it comes to
                        controlling your gambling, please consider using one of our tools aimed at helping this:</p>
                    <ul className={styles.noBullets}>
                        <li className={styles.content}>By selecting a deposit limit per day, week or month;</li>
                        <li className={styles.content}>By using our “time out” facility to allow you to suspend your account activity for the
                            following durations - 24 hours, one week, one month or any other period as you may
                            reasonably request up to a maximum of 6 weeks; or
                        </li>
                        <li className={styles.content}>Opting for a self-exclusion, the minimum period being six months which means your account
                            will be blocked for a set amount of time. Self-exclusions cannot be undone and may only be
                            unlocked by contacting customer services when the self-exclusion time runs out.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default ResponsibleGamblingPage;