import React from 'react';
import styles from './Navbar2.module.css';
import {useRouter} from "next/router";

const navItems = [
    {
        name : "Inplay",
        icon : "images/in-play.png",
    },
    {
        name : "Cricket",
        icon : "images/cricket.svg",
    },
    {
        name : "Tennis",
        icon : "images/tennis.svg",
    },
    {
        name : "Soccer",
        icon : "images/soccer.svg",
    },
    {
        name : "Badminton",
        icon : "images/badminton.svg",
    },
    {
        name : "BasketBall",
        icon : "images/basketball.svg",
    },
    {
        name : "Premium Sportbook",
        icon : "images/premium.svg",
    },
    {
        name : "Live Casino",
        icon : "images/casino.svg",
    }
]

const Navbar2 = () =>{
    const router = useRouter();

    const [activeTab, setActiveTab] = React.useState(1);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.navBarBox}>
                {
                    navItems?.map((item,index)=>(
                        <div
                            className={`${styles.navItem} ${index === 0 && styles.silverItem} ${activeTab === index && styles.activeTab}`}
                            onClick={()=> {
                                if(index){
                                    setActiveTab(index)
                                }else {
                                    router.push('/listing')
                                }
                            }}
                            key={`navItem_${index}`}
                        >
                            <img src={item.icon}/>
                            <span className={styles.navItemText}>{item.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Navbar2;