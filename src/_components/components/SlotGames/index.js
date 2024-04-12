import React from 'react';
import styles from './SlotGames.module.css';
import {useRouter} from "next/router";
import TextField from "../../view/TextField";
import SearchDropdownField from "../../view/SearchDropdownField";

const SlotGames = ({data}) =>{

    const router = useRouter();
    const tabValue = router.query.tab;
    const gameId = router.query.gameId;
    const [slotType, setSlotType] = React.useState('All');
    const [searchvalue,setSearchvalue] = React.useState('');

    React.useEffect(()=>{
        setSearchvalue('');
        return ()=>{
            setSearchvalue('');
        }
    },[])

    const getGameData = React.useMemo(()=>{
        return searchvalue ? data?.[slotType]?.filter((item)=> item?.name?.toLowerCase()?.includes(searchvalue?.toLowerCase())) : data?.[slotType]
    },[searchvalue,gameId,tabValue,data,slotType])

    const getBannerImage = React.useCallback((url)=>{
        // return (<img src={url} width='100%' height='100%' onError={()=>{}} /> ?? null)
        return (
            getGameData?.map((item,index)=>(
                <div className={`col col-xl-2 col-lg-3 col-sm-4 col-xs-6 ${styles.backgroundTextContainer}`} key={index}>
                            <span className={styles.imgBox} onClick={()=>{handleSelectgame(item?.game_id)}}>
                                {/*{getBannerImage(`https://b2c.lordofdevs.com/img/evo-slots/NetEnt/${item?.game_id}.png`)}*/}
                                {<img src={`https://b2c.lordofdevs.com/img/evo-slots/${item?.game_provider}/${item?.game_id}.png`} width='100%' height='100%' onError={()=>{}} /> ?? null}
                                <span className={styles.gameName}>
                                {item?.name}
                                </span>
                            </span>
                </div>
            ))
        )
    },[slotType])

    const handleSelectgame = (game_id) =>{
        router.push({
            pathname: '/listing',
            query: { tab: tabValue, gameId : game_id },
        });
    }
    return(
        <div className={styles.mainContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.headerBox}>
                    <div className={styles.filterBox}>
                        <div className={styles.header}>Slot Game</div>
                        <div className={`${styles.filterBtn} ${slotType === "All" && styles.activeFilterBtn}`} onClick={()=>setSlotType("All")}>All</div>
                        <div className={`${styles.filterBtn} ${slotType === "" && styles.activeFilterBtn}`} onClick={()=>setSlotType("")}><div><img src='https://b2c.lordofdevs.com/img/evo-slots/btg_logo_white.png' width='100%' /></div></div>
                        <div className={`${styles.filterBtn} ${slotType === "NetEnt" && styles.activeFilterBtn}`} onClick={()=>setSlotType("NetEnt")}><div><img src='https://b2c.lordofdevs.com/img/evo-slots/netent_logo.png' width='100%' /></div></div>
                        <div className={`${styles.filterBtn} ${slotType === "Red Tiger" && styles.activeFilterBtn}`} onClick={()=>setSlotType("Red Tiger")}><div><img src='https://b2c.lordofdevs.com/img/evo-slots/rt.png' width='100%' /></div></div>
                    </div>
                    <div>
                        <TextField
                            type='text'
                            inputContainerStyle={{borderRadius:'30px',border: "1px solid #212d3b", background : '#16202c', height:'40px'}}
                            style={{borderRadius:'30px', height:'35px'}}
                            placeholder='Search'
                            startIcon={<i className='fa-solid fa-magnifying-glass' style={{fontSize : '15px'}}/>}
                            onChange={(e)=>setSearchvalue(e.target.value)}
                            // disabled={!isLogin}
                        />
                    </div>
                </div>
                <div className={`row`}>
                    {getBannerImage()}
                </div>
            </div>
        </div>
    )
};

export default SlotGames;