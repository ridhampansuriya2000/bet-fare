import React from 'react';
import styles from './Button.module.css'

const Button = ({children, className, text='Submit', type='',shep='',disabled=false, ...rest}) =>{
    return(
            <button
                className={`${styles.btn} 
                ${type === 'primary' && styles.primaryBtn}
                ${disabled && styles.disabled}
                ${shep === 'square' && styles.square}
                ${className}
                `}
                {...rest}
                disabled={disabled}
            >
                {children || text}
            </button>
    )
};

export default Button;