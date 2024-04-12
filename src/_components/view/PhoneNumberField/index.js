import React from 'react';
import styles from './PhoneNumberField.module.css';
import {acceptOnlyNumber} from "../../../utils/helperFunctions";

const PhoneNumber = ({
                         placeholder='',
                        label='',
                        containerStyle={},
                         error='',
                        value='',
                        onChange=(e)=>{e},
                         ...rest}) =>{
    const [newValue,setNewValue] = React.useState(value);
    const handleChange = (e) =>{
        setNewValue(acceptOnlyNumber(e.target.value));
        onChange(e);
    }
    return(
        <div className={styles.mainContainer} style={containerStyle}>
                {label && <label htmlFor="p-no" className="form-label">{label}</label>}
                <div className={styles.phoneField}>
                    {/*<span className={styles.countryBox}><img src="images/ind-flag.png" /></span>*/}
                    <input type="tel" className={styles.phoneInput} id="p-no" placeholder={placeholder} value={acceptOnlyNumber(newValue)} onChange={handleChange} {...rest} />
                </div>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
};

export default PhoneNumber;