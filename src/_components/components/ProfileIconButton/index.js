import React from 'react';
import styles from './ProfileIconButton.module.css';

const ProfileIconButton = ({size,bg,color,name='JD',content='Hi, John Doe',contentSize='20', direction="column", onClick}) =>{
    return(
        <div className={styles.mainContainer} style={{flexDirection : direction}}>
            <div className={styles.iconLogo} style={{height :`${size}px`, width:`${size}px`, background:bg, color:color}} onClick={onClick}>
                    {name}
            </div>

            {content && <div style={{fontSize:`${contentSize}px`}}>
                {content}
            </div>}
        </div>
    )
};

export default ProfileIconButton;