import React from 'react';
import styles from './FeatureCard.module.css';

const Logo = ({width}) =>{
    return(
        <div className={styles.logoBox} style={{width : width}}>
            <img src="images/ten-sports-logo.png" alt="Logo" className="mb-4" width='100%' />
        </div>
    )
};

export default Logo;