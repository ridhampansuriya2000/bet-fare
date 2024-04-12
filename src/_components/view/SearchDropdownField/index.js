import React from 'react';
import styles from './SearchDropdownField.module.css';

const SearchDropdownField = ({
                        placeholder='',
                        label='',
                        containerStyle={},
                        inputContainerStyle={},
                        inputStyle={},
                        id='',
                        endIcon,
                        startIcon,
                        error='',
                        dropdownOptions,
                        onSelect=()=>{},
                         ...rest}) =>{

    const ref = React.useRef();

    const [showDropdown, setShowDropdown] = React.useState(false);
    const toggleDropdown = (e) => {
        e.stopPropagation();
        setShowDropdown(!showDropdown);
    };



    return(
        <div className={styles.mainContainer} style={containerStyle}>
                <div className={styles.innerContainer}>
                    {label && <label htmlFor={id} >{label}</label>}
                    <div className={styles.textField} style={inputContainerStyle}>
                        {startIcon}<input type="tel" id={id}
                                          className={styles.textInput}
                                          style={inputStyle}
                                          placeholder={placeholder}
                                          onFocus={toggleDropdown} // Show dropdown when input is focused
                                          // onBlur={toggleDropdown}
                                          ref={ref}
                                          {...rest}
                    />{endIcon}
                    </div>
                    {/*{error && <span className={styles.error}>{error}</span>}*/}
                    {showDropdown && dropdownOptions?.length > 0 && ref?.current?.value && (
                        <div className={styles.dropDownOptionsListBox}>
                            {dropdownOptions?.map((option, index) => (
                                <div
                                    key={index}
                                    className={styles.dropDownOptionBox}
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        onSelect(option?.data);
                                        toggleDropdown(e);
                                    }}
                                >{option?.content}</div>
                            ))}
                        </div>
                    )}
                </div>
        </div>
    )
};

export default SearchDropdownField;