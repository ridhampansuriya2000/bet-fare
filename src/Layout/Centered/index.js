import React from 'react';
import style from './Centered.module.css';

const Centered = ({children}) =>{
    return(
        <div className={style.mainContainer}>
            {children}
        </div>
    )
};

export default Centered;