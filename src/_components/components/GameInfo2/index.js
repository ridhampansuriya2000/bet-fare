import React from 'react';
import styles from './GameInfo2.module.css';
import Label from "../Label";
import {useRouter} from "next/router";
import {isOddsDisable} from "../../../utils/commonConditions";
import fetchData from "../../../utils/httpAction";
import {emitToSocket, subscribeToSocket} from "../../../Socket/socket";
import {useSelector} from "react-redux";


const getLiveScore = ({liveScoreByMarket=[],matchInfo}) =>{
    let obj = liveScoreByMarket?.find((scoreInfo)=> (scoreInfo?.eventId === matchInfo?.betfair_event_id) || (scoreInfo?.eventId === matchInfo?.event_id));
    return obj;
}
const MatchInfo = ({item,index,oddsData,playIcon,outLineStarIcon,fillStarIcon,getOddsByIndex,handleMatchSelect,title2}) =>{

    const {liveScoreByMarket} = useSelector((state) =>({
        liveScoreByMarket : state?.game?.scoreByMarket
    }));

    let status = item?.currently_live === 1 ? "Live" : "Upcoming"
    const [bookMakersData, setBookMakersData] = React.useState([])
    const [matchFancyData, setMatchFancyData] = React.useState([])
    const [liveOddsData, setLiveOddsData] = React.useState([]);
    const [loader, setLoader] = React.useState({
        betSlip: false,
    });

    React.useEffect(()=>{
        if(!item?.matchodds?.length && item?.matchodds?.[0]?.status !== 'CLOSED'){
            getEvents()
        }
        emitToSocket({
            eventName:`match_odds_${item?.id}`,
            roomtype:'public'
        })
        subscribeToSocket({
            eventName:`match_odds_${item?.id}`,
            cb:data => {
                setLiveOddsData(data?.message?.BF?.SL);
            },
        });
    },[]);


    const getEvents = async () => {
        let token = JSON.parse(localStorage.getItem('token'));
        let payload = {
            querys: `/${item?.sport_id}/${item?.tournament_id}/${item?.id}`
        };
        try {
            setLoader((preState) => ({...preState, matchData: true}));
            let res = await fetchData({
                method: 'POST',
                endPoint: '/api/game/event-details',
                payload: {...payload, token}
            });
            if (res?.statusCode === 200) {
                setBookMakersData(res?.match?.bookmaker?.[0]?.selection_lists);
                getBookMakerOdds(token,item?.id,res?.match?.bookmaker?.[0]?.selection_lists);
                getFancyOdds(token,item?.id,res?.match?.bookmaker?.[0]?.selection_lists);
            } else {
                // setDisabled(false);
            }
            setLoader((preState) => ({...preState, matchData: false}));
        } catch (e) {
            setLoader((preState) => ({...preState, matchData: false}));
        }
    }

    const getBookMakerOdds = async (token,match_id,data) =>{
        try{
            setLoader((preState)=>({...preState, bookMakersOdds : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/get-bookmaker-odds-from-api', payload: {payload : {match_id}, token}});
            if(res?.statusCode === 200){
                let newData = data?.map((item) =>({...item,S : item?.selectionStatus, ...res?.B?.[0]?.SL?.find((elm)=> elm?.I === item?.selectionId)}));
                setBookMakersData(newData);
                if(!res?.B?.length){
                    // getFancyOdds(token,match_id,data)
                }
            }else{
                // setDisabled(false);
            }
            setLoader((preState)=>({...preState, bookMakersOdds : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, bookMakersOdds : false}));
        }
    };

    const getFancyOdds = async (tokend,match_id,data) =>{
        let token = JSON.parse(localStorage.getItem('token'));
        try{
            setLoader((preState)=>({...preState, fancyOdds : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/odds-by-match-fancy', payload: {payload : {match_ids: [match_id]}, token}});
            if(res?.statusCode === 200){
                let newData = res?.data?.find((elm)=> elm?.matchId === match_id)?.selectionList;
                let arr = data?.map((item)=>({...item, ...newData?.find((elm)=> elm?.selectionId === item?.selectionId)}));
                // let newData = data?.map((item) =>{debugger
                //     let odds = res?.data?.find((elm)=> elm?.marketId === item?.market_id)?.selectionList?.find((elm)=> elm?.selectionId === item?.selectionId) ?? {};
                //     let newItem = {...item, selectionId : item?.id}
                //     // if(newItem?.status === "SUSPEND") newItem = {...newItem, S : 'SUSPEND', colspan : ["RN",2]}
                //     if(odds?.S === "SUSPEND") newItem = {...newItem, S : 'SUSPEND', colspan : ["RN",2]}
                //     return{...newItem, ...odds}
                // });
                setMatchFancyData(arr);
            }else{
                // setDisabled(false);
            }
            setLoader((preState)=>({...preState, fancyOdds : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, fancyOdds : false}));
        }
    };
    const getLiveOddsObj = ({oddsObj,LiveOddsObj}) =>{
        return  {
            ...oddsObj,
            back_odds : oddsObj?.back_odds?.map((item,index)=> !LiveOddsObj?.BO?.[index] ? item : {price : LiveOddsObj?.BO?.[index]?.O || item?.price, size : LiveOddsObj?.BO?.[index]?.S || item?.size}),
            lay_odds : oddsObj?.lay_odds?.map((item,index)=> !LiveOddsObj?.LO?.[index] ? item : {price : LiveOddsObj?.LO?.[index]?.O || item?.price, size : LiveOddsObj?.LO?.[index]?.S || item?.size}),
        }
    };

    let liveRun = React.useMemo(()=>{
        let obj = getLiveScore({liveScoreByMarket,matchInfo:item});
        obj = {away : obj?.score?.away,home : obj?.score?.home};
        return obj;
    },[liveScoreByMarket]);

    return(
        <div className={styles.matchInfoBox} key={index}>
            <div className={styles.titleBox}>
                {status && <div className={`${styles.statusLabel} ${status === 'Live' ? styles.live : styles.upComing}`}>{status ? status === 'Live' ? "Live" : 'Upcoming' : ''}</div>}
                <div className={styles.titleGroupBox}>
                    <span className={styles.title}>{`${item?.team_a} Vs ${item?.team_b}`}</span>
                    <span className={styles.title2}>{title2}</span>
                </div>
                <span className={styles.startIcon}>
                    {playIcon && <i className="fa fa-play" style={{color:'#0d6efd', fontSize:'15px'}} />}
                    {outLineStarIcon && <i className="fa-regular fa-star favourite-icon" style={{color:'#fadb00', fontSize:'15px'}}/>}
                    {fillStarIcon && <i className="fa-solid fa-star" style={{color:'#fadb00', fontSize:'15px'}}/>}
                </span>
            </div>
            {item?.matchodds?.length > 0 ?
            item?.matchodds?.[0]?.selection_lists?.map((elm,index)=>{
                let tempObj = oddsData?.find((itm)=> (itm?.market_id === item?.matchodds?.[0]?.market_id))?.selections?.find((sItem)=> sItem?.selection_id === elm?.selectionId);
                let liveMatchOdds = liveOddsData?.find((item)=> item?.I === tempObj?.selection_id);
                tempObj = getLiveOddsObj({oddsObj: tempObj,LiveOddsObj: liveMatchOdds})
                return(
                    <div className={`${styles.row}`} key={`${index}_${elm?.selectionName}`} >
                        <div className={styles.label}>
                            {liveRun?.away && <Label count2={index%2 === 0 ? liveRun?.home.games : liveRun?.away.games} count3={index%2 === 0 ? liveRun?.home.sets : liveRun?.away.sets} width='35px' minWidth='35px'/>}{elm?.selectionName}
                        </div>
                        <div className={styles.labelsBox}>
                            {item?.matchodds?.[0]?.status !== 'CLOSED' ? <>
                                {getOddsByIndex({oddsArray : tempObj?.back_odds})?.map((odd,index)=>(
                                    <span key={`back_${index}`}>
                                        <Label count1={odd?.price ?? '-'} count2={odd?.size} isBeep={true} changedBgColor='#ffffff' disable={isOddsDisable({odds:odd?.price, selectionStatus : tempObj?.status })}  onClick={()=>{ handleMatchSelect({sport_id : item?.sport_id,tournament_id : item?.tournament_id,match_id : item?.id}) }} key={`back_${index}`}/>
                                    </span>
                                ))}
                                {getOddsByIndex({oddsArray : tempObj?.lay_odds})?.map((odd, index)=>(
                                    <span key={`lay_${index}`}>
                                        <Label count1={odd?.price ?? '-'} count2={odd?.size} isBeep={true} changedBgColor='#ffffff' disable={isOddsDisable({odds:odd?.price})} bgColor='#0d5eac'  onClick={()=>{ handleMatchSelect({sport_id : item?.sport_id,tournament_id : item?.tournament_id,match_id : item?.id}) }} key={`lay_${index}`}/>
                                    </span>
                                ))}
                            </>
                            : <Label count1='CLOSED' width='100%' bgColor='#ffab2d' disable={true} />}
                        </div>
                    </div>
                )})
            : matchFancyData?.length > 0
                    ? matchFancyData?.map((elm,index)=>{
                return(
                    <div className={`${styles.row}`} key={index}>
                        <div className={styles.label}>
                            {elm?.selectionName}
                        </div>
                        <div className={styles.labelsBox}>
                            {(elm?.S === 'ONLINE' || elm?.selectionStatus === 'ONLINE')?
                            <>
                                {['','',elm?.B || elm?.backOdds]?.map((odd,index)=>(
                                    <span key={`back_${index}`}>
                                    <Label count1={odd || '-'} disable={isOddsDisable({odds:odd})} onClick={()=>{ handleMatchSelect({sport_id : item?.sport_id,tournament_id : item?.tournament_id,match_id : item?.id}) }} key={`back_${index}`}/>
                                    </span>
                                ))}
                                {[elm?.L || elm?.layOdds,'','']?.map((odd,index)=>(
                                    <span key={`lay_${index}`}>
                                    <Label count1={odd || '-'}  disable={isOddsDisable({odds:odd})} bgColor='#0d5eac' onClick={()=>{ handleMatchSelect({sport_id : item?.sport_id,tournament_id : item?.tournament_id,match_id : item?.id}) }} key={`lay_${index}`}/>
                                    </span>
                                ))}
                            </>
                                : <Label count1='SUSPEND' width='100%' bgColor='#ffab2d' disable={true} />}
                        </div>
                    </div>
                )
                })
            : <div className={`${styles.row}`} key={index}>
                        <div className={styles.label}>
                            {`${item?.team_a} Vs ${item?.team_b}`}
                        </div>
                        <div className={styles.labelsBox}>
                            <Label count1='See more markets &nbsp; &nbsp; >>' width='100%' bgColor='#0d6efd' onClick={()=>{ handleMatchSelect({sport_id : item?.sport_id,tournament_id : item?.tournament_id,match_id : item?.id}) }} />
                        </div>
                    </div>}
        </div>
    )
}

const GameInfo2 = ({
                      name='',
                      data=[],
                      title2='',
                      playIcon=false,
                      outLineStarIcon=false,
                      fillStarIcon=false,
                      status='',
                      oddsData=[],
                      index,
                  }) =>{

    const router = useRouter();
    const tabValue = router.query.tab;

    const handleMatchSelect = ({sport_id,tournament_id,match_id}) =>{
        router.push({
            pathname: '/game',
            query: {sport_id,tournament_id,match_id},
        });
    };

    const getOddsByIndex = ({oddsArray=[]}) =>{
        return ['','','']?.map((item,index)=>oddsArray[index] ? oddsArray[index] : '-');
    }

    return(
        <div className={styles.mainContainer} key={index}>
            <div className={styles.name}>
                <span>{name}</span>
            </div>

            {
                data?.map((item, index)=>(
                    <span key={index}>
                        <MatchInfo
                            item={item}
                            index={index}
                            playIcon={playIcon}
                            outLineStarIcon={outLineStarIcon}
                            fillStarIcon={fillStarIcon}
                            getOddsByIndex={getOddsByIndex}
                            handleMatchSelect={handleMatchSelect}
                            oddsData={oddsData}
                            title2={title2}
                        />
                    </span>
                ))
            }
        </div>
    )
};

export default GameInfo2;