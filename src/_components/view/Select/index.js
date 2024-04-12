import React from 'react';
import styles from './Select.module.css';

const Select = ({id, options,label, ...rest}) => {
    return (
        <div className={styles.mainContainer}>
            <span className={styles.selectInput}>
                <label htmlFor={id}>{label}</label>
            <select {...rest} id={id}>
                {options?.map((item, index) => (
                    <option
                        value={item.value}
                        selected={item?.selected}
                    >
                        {item?.label}
                    </option>
                ))}
            </select>
            </span>
        </div>
    )
};

export default Select;