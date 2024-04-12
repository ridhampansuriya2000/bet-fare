import React from 'react';
import { useRouter } from 'next/router';
import styles from './Backward.module.css';


const BackwardNavBar = ({pageName,endContent, reference, maxWidth=1000}) =>{

    const router = useRouter();

    const handleBackward = () => {
        router.back();
    };

    return(
        <div className={styles.mainContainer}>
            <div className={styles.navBox} style={{ maxWidth : `${maxWidth}px`}}>
                <div>
                    <span className={styles.cursorPointer} onClick={handleBackward}><i className="fa fa-angle-left"/></span>
                    {pageName}
                </div>

                <div>
                    {endContent ? endContent : reference && <div className={styles.reference}>Ref & earn</div>}
                </div>
            </div>
        </div>
    )
};

export default BackwardNavBar;