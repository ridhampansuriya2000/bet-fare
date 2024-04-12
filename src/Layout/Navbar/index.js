import React from 'react';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';

const navItems = [
    {
        name : "Inplay",
        icon : "images/in-play.png",
        sport_id : '',
    },
    {
        name : "Cricket",
        icon : "images/cricket.svg",
        sport_id : 30,
    },
    {
        name : "Tennis",
        icon : "images/tennis.svg",
        sport_id : 188,
    },
    {
        name : "Football",
        icon : "images/soccer.svg",
        sport_id : 171,
    },
    {
        name : "Horse",
        icon : "images/horse-3.svg",
        sport_id : 116,
    },
    {
        name : "Greyhound",
        icon : "images/dog-3.svg",
        sport_id : 113,
    },
    {
        name : "Ezugi",
        icon : "images/casino.svg",
        sport_id : 1001,
    },
    {
        name : "Evolution",
        icon : "images/casino.svg",
        sport_id : 1002,
    },
    {
        name : "Slot Games",
        icon : "images/casino.svg",
        sport_id : 1003,
    },
    // {
    //     name : "Badminton",
    //     icon : "images/badminton.svg",
    // },
    // {
    //     name : "BasketBall",
    //     icon : "images/basketball.svg",
    // },
    // {
    //     name : "Premium Sportbook",
    //     icon : "images/premium.svg",
    // },
    // {
    //     name : "Live Casino",
    //     icon : "images/casino.svg",
    // }
]

const Navbar = () =>{

    const router = useRouter();
    const {tab, sport_id, tournament_id} = router.query;

    const [activeTab, setActiveTab] = React.useState();

    React.useEffect(()=>{
        if(router.pathname.includes(['/listing', '/game']))
        handleSetTab({tab : sport_id ? navItems?.find((item)=> item?.sport_id == sport_id)?.name : '', sport_id : sport_id || '', tournament_id : tournament_id});
        setActiveTab(sport_id === '' ? '' : navItems?.findIndex((item)=> item?.sport_id === parseInt(sport_id)) );
    },[sport_id])

    const handleSetTab = ({tab,sport_id,tournament_id}) => {
        router.push({
            pathname: '/listing',
            query: { tab: tab, sport_id, tournament_id },
        });
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.navBarBox}>
                {
                    navItems?.map((item,index)=>(
                        <div
                            className={`${styles.navItem} ${index === 0 && styles.silverItem} ${activeTab === index && styles.activeTab}`}
                            onClick={() => {
                                if (index) {
                                    handleSetTab({tab : item.name, sport_id : item?.sport_id})
                                    // setActiveTab(index)
                                } else {
                                    handleSetTab({tab : '', sport_id : ''})
                                    setActiveTab('');
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

export default Navbar;