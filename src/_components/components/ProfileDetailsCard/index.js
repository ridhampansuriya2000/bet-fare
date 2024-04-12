import React from 'react';
import styles from './ProfileDetailsCard.module.css';

const ProfileDetailsCard = ({user}) =>{
    return(
        <div className={styles.mainContainer}>
            <div className={`row ${styles.innerContainer}`}>
                <div className={`col col-sm-6 col-xs-12 ${styles.formField}`}>
                    <div className={styles.label}>First Name</div>
                    <input type="text" className={`${styles.details}`} value={user?.username}/>
                </div>
                {/*<div className={`col col-sm-6 col-xs-12 ${styles.formField}`}>*/}
                {/*    <div className={styles.label}>Last Name</div>*/}
                {/*    <input type="text" className={`${styles.details}  ${styles.activeInput}`} value={'Doe'}/>*/}
                {/*</div>*/}
                <div className={`col col-sm-6 col-xs-12 ${styles.formField}`}>
                    <div className={styles.label}>Mobile</div>
                    <input type="text" className={styles.details} value={user?.phone_number}/>
                </div>
                <div className={`col col-sm-6 col-xs-12 ${styles.formField}`}>
                    <div className={styles.label}>Gender</div>
                    <input type="text" className={styles.details} value={'Male'}/>
                </div>
            </div>
        </div>
    )
};

export default ProfileDetailsCard;