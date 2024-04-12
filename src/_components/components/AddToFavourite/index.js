import React from 'react';
import styles from './AddToFavourite.module.css';

const AddToFavourite = () =>{
    return(
        <div className={styles.mainContainer}>
                <div>
                    <i className='fa-regular fa-star favourite-icon'/>
                </div>
                <div>
                    Add to favourite
                </div>
        </div>
    )
};

export default AddToFavourite;