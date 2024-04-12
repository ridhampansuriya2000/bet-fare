import React from 'react';
import styles from './TopHead.module.css';

const TopHead = () =>{
    return (
        <div className={styles.container}>
            <div className={styles.socialButton}>
                <a className={styles.supportBtn} href="">
                    <i className="fa-regular fa-circle-question" />
                    Support
                </a>

                <div className={styles.socialLinks}>
                        <a href="">
                            <i className="fa-brands fa-facebook-f"/>
                        </a>
                        <a href="">
                            <i className="fa-brands fa-twitter"/>
                        </a>
                        <a href="">
                            <i className="fa-brands fa-instagram"/>
                        </a>
                        <a href="">
                            <i className="fa-brands fa-youtube"/>
                        </a>
                </div>
            </div>

            <div className={styles.localityBox}>
                <div>
                    <span className={styles.countryBox}>
                        <img src="images/ind-flag.png" alt="Country Flag"/>
                        <i className="fa-solid fa-caret-down"/>
                    </span>
                </div>
                <div>
                    <span className={styles.countryBox}>
                        EN
                        <i className="fa-solid fa-caret-down"/>
                    </span>
                </div>
            </div>
        </div>
    )
};

export default TopHead;