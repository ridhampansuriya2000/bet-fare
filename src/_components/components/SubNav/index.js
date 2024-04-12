import React from 'react';
import styles from './SubNav.module.css';
import {useRouter} from "next/router";


{/**--------------------- Dummy props ---------------------------*/}
const dummyTabs = [
    { title : 'first deposit bonus', path : '/promotions' },
    { title : 'referral bonus', path : '/promotions' },
    { title : 'Weekly average bonus', path : '/promotions' },
    { title : 'bank transfer deposit', path : '/promotions' },
    { title : 'crypto deposit', path : '/promotions' },
]

const SubNav = ({
                    tabs=dummyTabs,
                    currentTab=0,
                    tabHandler=()=>{},
                    score=false,
                    share=false,
}) =>{

    const router = useRouter();

    const [activeTab,setActiveTab] = React.useState(currentTab);

    React.useEffect(()=>{
        setActiveTab(currentTab);
    },[currentTab])

    return(
        <div className={styles.mainContainer}>
            <div className={styles.navItemsBox}>
                {tabs?.map((item,index)=>(
                    <span
                        key={`navItem_${index}`}
                        className={`${activeTab === index && styles.activeTab} ${styles.tab}`}
                        onClick={()=>{
                            setActiveTab(index);
                            tabHandler(index);
                        }}
                    >
                        <div onClick={()=>{
                            item?.path && router.push(item?.path);
                        }} key={`tab_${index}`}>
                            {item?.title}
                        </div>
                    </span>
                ))}
            </div>
            <div className={styles.iconsBox}>
                {score && <div className={styles.scoreBtn}><i className='fa-solid fa-eye-slash'/> Score</div>}
                {share && <div className={styles.shareBtn}><i className='fa-solid fa-share'/></div>}
            </div>
        </div>
    )
};

export default SubNav;