import React from 'react';
import styles from './Switch.module.css';

const Switch = ({checked,onChange=()=>{}}) =>{
    return(
        <div className={styles.switch}>
            <input type="checkbox" id="c1" checked={checked} onChange={onChange}/>
            <label htmlFor="c1">
                <span className={styles.span}/>
            </label>
        </div>
    )
};

export default Switch;