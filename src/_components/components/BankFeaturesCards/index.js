import React from 'react';
import styles from './BankFeaturesCards.module.css';
import FeatureCard from "../FeatureCard";

const BankFeaturesCards = ({data,selectFeatures=()=>{}}) =>{
    const [selectedIndex,setSelectedIndex] = React.useState();
    return(
        <div className={styles.mainContainer}>
            {
                data?.map((item,index)=>(
                    <div className={styles.featureCard} key={index} onClick={()=>{selectFeatures(item); setSelectedIndex(index)}}>
                        <FeatureCard {...item} style={{minWidth:'100px',minHeight:'100px'}} selected={selectedIndex === index}/>
                    </div>
                ))
            }
        </div>
    )
};

export default BankFeaturesCards;