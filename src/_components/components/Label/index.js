import React from 'react';
import styles from './Label.module.css';

const Label = ({bgColor,changedBgColor,count1='',count2=null, count3=null, width='100%', minWidth='65px',disable=false,onClick=()=>{},isBeep=false, ...rest}) =>{

    const [showBeeper, setShowBeeper] = React.useState(false);

    React.useEffect(() => {
       if(isBeep){
        // Change color when count1 prop changes
           setShowBeeper(true);

        // Revert color after 1 second
        const timeoutId = setTimeout(() => {
            setShowBeeper(false);
        }, 100);

        // Clean up timeout
        return () => clearTimeout(timeoutId);}
    }, [count1,count2]);

    return(
        <div
            className={`${styles.mainContainer}`}
            style={{background:bgColor, width:width, minWidth:minWidth,}}
            onClick={()=>!disable && onClick()}
            {...rest}
        >
            <div  className={`${styles.innerContainer} ${disable && styles.disable}`}>
                <span className={styles.label_1}>{count1}</span>
                {count2 && <span className={styles.label_2}>{count2}</span>}
                {count3 && <span className={styles.label_2}>{count3}</span>}
            </div>
            <div className={`${styles.overlayLayer} ${!showBeeper ? styles.none : ''}`} style={{background : changedBgColor}} />
        </div>
    )
};

export default Label;