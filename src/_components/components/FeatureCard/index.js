import React from 'react';
import styles from './FeatureCard.module.css';

const FeatureCard = ({src, title, subTitle, contentInfo, selected, ...rest}) =>{
    return(
        <div className={`${styles.mainContainer} ${selected && styles.selected}`} {...rest}>
            <span className={styles.iconBox}>
                <img src={src} alt={title || subTitle}/>
            </span>
            {title && <span>{title}</span>}
            {subTitle && <span className={styles.subTitle}>{subTitle}</span>}
            {contentInfo && <span className={styles.contentInfo}>{contentInfo}</span>}
        </div>
    )
};

export default FeatureCard;