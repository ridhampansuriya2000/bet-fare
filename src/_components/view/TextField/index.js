import React, {memo} from 'react';
import styles from './TextField.module.css';

const TextField = ({
                        placeholder='',
                        label='',
                        containerStyle={},
                        inputContainerStyle={},
                        inputStyle={},
                        id='',
                        endIcon,
                        startIcon,
                        error='',
                       labelMarker=undefined,
                         ...rest}) =>{
    return(
        <div className={styles.mainContainer} style={containerStyle}>
            {label && <div className={styles.labelBox}><label htmlFor={id} >{label}</label> <span>{labelMarker}</span></div>}
                <div className={styles.textField} style={inputContainerStyle}>
                    {startIcon}<input type="tel" id={id} className={styles.textInput} style={inputStyle} placeholder={placeholder} {...rest} />{endIcon}
                </div>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
};

export default memo(TextField);