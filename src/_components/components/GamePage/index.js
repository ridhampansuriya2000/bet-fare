import React from 'react';
import BackwardNavBar from "../BackwardNavBar";
import AccordionContainer from "../../view/AccordianContainer";
import SubNav from "../SubNav";
import GameInfo from "../GameInfo";
import BetSlip from "../BetSlip";
import AddToFavourite from "../AddToFavourite";
import MatchList from "../MatchList";
import Table from "../Table";
import Label from "../Label";
import fetchData from "../../../utils/httpAction";
import {useRouter} from "next/router";
import OpenBets from "../OpenBets";
import OneClickStake from "../OneClickStake";
import styles from './GamePage.module.css';
import {useSelector} from "react-redux";
import {isOddsDisable} from "../../../utils/commonConditions";
import {emitToSocket, subscribeToSocket} from "../../../Socket/socket";
import MatchListNavBar from "../MatchListNavBar";
import {calculateSizeOfOdds, moveToTarget} from "../../../utils/helperFunctions";

const SubData = () => (
    <div className={styles.subContent}>
        <div className={styles.subContentItem}><img src="images/cricket.svg" width='20px' srcSet=""/>Cricket <span
            className="rounded-circle badge ms-auto">8</span></div>
        <div className={styles.subContentItem}><img src="images/tennis.svg" width='20px' srcSet=""/>Tennis</div>
        <div className={styles.subContentItem}><img src="images/soccer.svg" width='20px' srcSet=""/>Soccer</div>
        <div className={styles.subContentItem}><img src="images/badminton.svg" width='20px' srcSet=""/>Badminton</div>
        <div className={styles.subContentItem}><img src="images/basketball.svg" width='20px' srcSet=""/>Basketball</div>
    </div>
);

const betInfoTab = [
    { title : 'Open Bets', path : '' },
    { title : 'Bet Slip', path : '' },
    { title : 'One Click Bet', path : '' },
];

const tab2=[
    { title : 'markets', path : '' },
];

const HorseInfo = ({rowData,data}) =>{
    return(
        <div className={styles.s}>
            <div>{data}</div>
            <div className={styles.horseSubInfoBox}>
                <div className={styles.horseInfoTitle}>Jockey : <span>{rowData?.JOCKEY_NAME}</span></div>
                <div className={styles.horseInfoTitle}>Trainer : <span>{rowData?.TRAINER_NAME}</span></div>
                <div className={styles.horseInfoTitle}>Age : <span>{rowData?.AGE}</span></div>
            </div>
        </div>
    )
};

const getLiveOddsObj = ({oddsObj,LiveOddsObj}) =>{
    return  {
        ...oddsObj,
        back_odds : oddsObj?.back_odds?.map((item,index)=> !LiveOddsObj?.BO?.[index] ? item : {price : LiveOddsObj?.BO?.[index]?.O || item?.price ,size : LiveOddsObj?.BO?.[index]?.S || item?.size}),
        lay_odds : oddsObj?.lay_odds?.map((item,index)=> !LiveOddsObj?.LO?.[index] ? item : {price : LiveOddsObj?.LO?.[index]?.O || item?.price,size : LiveOddsObj?.LO?.[index]?.S  || item?.size}),
    }
}

const getLiveBookmakersOddsObj = ({oddsObj,LiveOddsObj}) =>{
    return  {
        ...oddsObj,
        B : LiveOddsObj?.B ? LiveOddsObj?.B : oddsObj?.B,
        L : LiveOddsObj?.L ? LiveOddsObj?.L : oddsObj?.L,
        S : LiveOddsObj?.S ? LiveOddsObj?.S : oddsObj?.S,
        colspan:['B',(LiveOddsObj?.S ? LiveOddsObj?.S : oddsObj?.S) === "ONLINE" ? 1 : 2]
    }
};

const getLiveFancyMarketOddsObj = ({oddsObj,LiveOddsObj}) =>{
    return  {
        ...oddsObj,
        RN : LiveOddsObj?.RN ? LiveOddsObj?.RN : oddsObj?.RN,
        RY : LiveOddsObj?.RY ? LiveOddsObj?.RY : oddsObj?.RY,
        ON : LiveOddsObj?.ON ? LiveOddsObj?.ON : oddsObj?.ON,
        OY : LiveOddsObj?.OY ? LiveOddsObj?.OY : oddsObj?.OY,
        S : LiveOddsObj?.S ? LiveOddsObj?.S : oddsObj?.S,
        // colspan:['RN',(LiveOddsObj?.S ? LiveOddsObj?.S : oddsObj?.S) !== "ONLINE" ? 2 : 1]
    }
};

const GamePage = () => {

    const router = useRouter();
    const {sport_id, tournament_id, match_id, market_id=''} = router.query;
    const {allow_betfair_horse_lay} = useSelector((state) =>({
        allow_betfair_horse_lay : state?.auth?.data?.user?.tripple_master?.allow_betfair_horse_lay
    }))

    const [currentTab, setCurrentTab] = React.useState(0);
    const [matchData, setMatchData] = React.useState({});
    const [bookMakersData, setBookMakersData] = React.useState([]);
    const [fancyData, setFancyData] = React.useState([]);
    const [selectedFancyDataIndex, setSelectedFancyDataIndex] = React.useState('');
    const [exposureData, setExposureData] = React.useState({});
    const [fancyBookMakersData, setFancyBookMakersData] = React.useState([]);
    let matchData_market_id = '';
    let bookMaker_market_id = '';
    let event_id = '';
    let selection_ids = [];
    let fancy_ids = [];
    let fancy_bkm_ids = [];
    const [matchOddsData, setMatchOddsData] = React.useState({});
    const [matchOddsDataAll, setMatchOddsDataAll] = React.useState([]);
    const [betDelay, setBetDelay] = React.useState(null);
    const [liveOddsData, setLiveOddsData] = React.useState([]);
    const [liveMarketsData, setLiveMarketsData] = React.useState({
        matchodds : [],
        bookmaker : [],
        fancymarkets : [],
        fancybookmaker_markets : [],
    });
    const [loader, setLoader] = React.useState({
        matchData: false,
        odds : false,
        bookMakersOdds : false,
        fancyOdds : false,
        fancyBookMakersOdds : false,
        stakeDetails: false,
    });

    React.useEffect(()=>{
        if(!sport_id || !tournament_id || !match_id){
            router.back();
        }
    },[sport_id, tournament_id, match_id]);

    const getEvents = async () =>{
        let token = JSON.parse(localStorage.getItem('token'));
        let payload = {
            querys : `/${sport_id}/${tournament_id}/${match_id}${market_id ? '/'+market_id : ''}`
        };
        try{
            setLoader((preState)=>({...preState, matchData : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/event-details', payload: {...payload, token}});
            if(res?.statusCode === 200){
                let market_id = res?.match?.matchodds?.[0]?.market_id;
                let all_matchbf_market_ids = res?.match?.all_matchbf_odds?.map((market)=> market?.market_id) || [];
                matchData_market_id = res?.match?.matchodds?.[0]?.market_id;
                bookMaker_market_id = res?.match?.bookmaker?.[0]?.match_id;
                event_id = res?.match?.event_id;
                selection_ids = res?.match?.bookmaker?.[0]?.selection_lists?.map((item)=> item?.selectionId);
                fancy_ids = res?.match?.fancymarkets?.map((item)=> item?.market_id);
                fancy_bkm_ids = res?.match?.fancybookmaker_markets?.map((item)=> item?.market_id);
                setMatchData(res);
                setBookMakersData(res?.match?.bookmaker?.[0]?.selection_lists);
                setFancyData(res?.match?.fancymarkets);
                getOdds({market_ids : [market_id, ...all_matchbf_market_ids]?.filter( item => item ? true : false)},token);
                if(sport_id == 30){
                    market_id = res?.match?.bookmaker?.[0]?.market_id;
                    getBookMakerOdds({token,match_id,data : res?.match?.bookmaker?.[0]?.selection_lists, MaxMin :res?.match?.bookmaker?.[0]?.MaxMin, selection_ids, event_id,market_id});
                    getFancyOdds({token,match_id,data :res?.match?.fancymarkets, fancy_ids, event_id});
                    getFancyBookMakersOdds({ token, match_id, data : res?.match?.fancybookmaker_markets, MaxMin:res?.match?.fancymarkets?.[0]?.MaxMin, fancy_bkm_ids, event_id_sky: event_id});
                }
            }else{
                // setDisabled(false);
            }
            setLoader((preState)=>({...preState, matchData : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, matchData : false}));
        }
    };

    const getOdds = async (payload,token) =>{
        setLoader((preState)=>({...preState, odds : true}));
        try{
            setLoader((preState)=>({...preState, odds : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/odds-by-market', payload: {payload, token}});
            if(res?.statusCode === 200){
                let newData = res?.data?.find((item)=> item?.market_id === matchData_market_id.toString());
                setMatchOddsData(newData);
                setMatchOddsDataAll(res?.data);
            }else{
                // setDisabled(false);
            }
            setLoader((preState)=>({...preState, odds : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, odds : false}));
        }
    };

    const getBookMakerOdds = async ({token,match_id,data,MaxMin, event_id, selection_ids,market_id}) =>{
        try{
            setLoader((preState)=>({...preState, bookMakersOdds : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/get-bookmaker-odds-from-api', payload: {payload : {match_id, event_id, selection_ids,market_id}, token}});
            if(res?.statusCode === 200){
                let newData = data?.map((item) =>{
                    let odds = res?.B?.[0]?.SL?.find((elm)=> elm?.I == item?.selectionId);
                    if(odds?.S !== "ONLINE") odds = {...odds, colspan:['B',2]}
                    return{...item, ...odds, MaxMin}
                })
                setBookMakersData(newData);
            }else{
                // setDisabled(false);
            }
            setLoader((preState)=>({...preState, bookMakersOdds : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, bookMakersOdds : false}));
        }
    };

    const getFancyOdds = async ({token,match_id,data, fancy_ids, event_id}) =>{
        try{
            setLoader((preState)=>({...preState, fancyOdds : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/get-fancy-odds-from-api', payload: {payload : {match_id, fancy_ids, event_id_sky: event_id},token}});
            if(res?.statusCode === 200){
                let newData = data?.map((item) =>{
                    let odds = res?.F?.find((elm)=> elm?.M === item?.market_id) ?? {};
                    let newItem = {...item, selectionId : item?.id}
                    if(newItem?.status === "SUSPEND") newItem = {...newItem, S : 'SUSPEND', colspan : ["RN",2]}
                    if(odds?.S === "SUSPEND") newItem = {...newItem, colspan : ["RN",2]}
                    return{...newItem, ...odds}
                });
                setFancyData(newData);
            }else{
                // setDisabled(false);
            }
            setLoader((preState)=>({...preState, fancyOdds : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, fancyOdds : false}));
        }
    };

    const getFancyBookMakersOdds = async ({token,match_id,data,MaxMin,fancy_bkm_ids, event_id_sky}) =>{
        try{
            setLoader((preState)=>({...preState, fancyBookMakersOdds : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/get-fancy-bookmaker-odds', payload: {payload:{match_id,fancy_bkm_ids,event_id_sky}, token}});
            if(res?.statusCode === 200){
                let newData = data?.map((item)=>{
                    let odds = {...item} || {};
                    // if(odds?.status === "SUSPEND" || odds?.selectionStatus === 'SUSPEND') odds = {...odds, S : 'SUSPEND', colspan : ["B",2]}
                    // if(odds?.S === "SUSPEND") odds = {...odds, colspan : ["B",2]}
                    let odds_selectionList = res?.B?.find((elm)=> elm?.M === item?.market_id);
                    // let selection_lists = item?.selection_lists?.map((item)=>({ ...item,MaxMin,S : item?.S, status : item?.S, marketData: odds, ...odds_selectionList?.SL?.find((elm)=>elm?.I === item?.selectionId)}))
                    let selection_lists = odds_selectionList?.SL?.map((oddsObj)=>({ ...oddsObj,MaxMin,S : oddsObj?.S, status : oddsObj?.S, marketData: odds,
                        // colspan : ["B",oddsObj?.S !== 'ONLINE' ? 2 : 1],
                        ...item?.selection_lists?.find((elm)=>elm?.selectionId == oddsObj?.I)}))
                    return{...odds,MaxMin, selection_lists}
                })
                setFancyBookMakersData(newData);
            }
            setLoader((preState)=>({...preState, fancyBookMakersOdds : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, fancyBookMakersOdds : false}));
        }
    };

    React.useEffect(()=>{
       if(sport_id && match_id && tournament_id){
           getEvents();
           emitToSocket({
               eventName:`match_odds_${match_id}`,
               roomtype:'public'
           })
           subscribeToSocket({
               eventName:`match_odds_${match_id}`,
               cb:data => {
                   setLiveOddsData(data?.message?.BF?.SL);
                   setLiveMarketsData((preState)=>({...preState, 'matchodds' : data?.message?.BF?.SL}));
               },
           });

           emitToSocket({
               eventName:`bookmaker_match_odds_${match_id}`,
               roomtype:'public'
           })
           subscribeToSocket({
               eventName:`bookmaker_match_odds_${match_id}`,
               cb:data => {
                   console.log("bookmaker_match_odds_",data);
                   setLiveMarketsData((preState)=>({...preState, 'bookmaker' : data?.B?.[0]?.SL}));
               },
           });

           emitToSocket({
               eventName:`fancy_match_odds_${match_id}`,
               roomtype:'public'
           })
           subscribeToSocket({
               eventName:`fancy_match_odds_${match_id}`,
               cb:data => {
                   console.log("fancy_match_odds_",data);
                   setLiveMarketsData((preState)=>({...preState, 'fancymarkets' : data?.F}));
               },
           });

           emitToSocket({
               eventName:`marketStatusUpdate`,
               roomtype:'public'
           })
           subscribeToSocket({
               eventName:`marketStatusUpdate`,
               cb:data => {
                   console.log("marketStatusUpdate",data);
                   // setLiveMarketsData((preState)=>({...preState, 'fancymarkets' : data?.F}));
               },
           });
       }
    },[sport_id,match_id,tournament_id]);

    const tabHandler = (tab) => {
        setCurrentTab(tab);
    };

    const [rowData,setRowData] = React.useState([]);

    React.useEffect(()=>{
        let arr1 = matchData?.match?.matchodds?.[0]?.selection_lists?.map((item,)=>({...item, matchData: matchData, match_odds : item?.selectionName, ...matchData?.match?.matchodds?.[0]?.runners_metadatas?.[item?.selectionId]}));
        setRowData(arr1);
    },[matchData?.match?.matchodds])

    React.useEffect(()=>{
        let arr = rowData?.map((item,index)=> ({...item, ...matchOddsData?.selections?.find((elm)=> elm?.selection_id === item.selectionId)}));
        setRowData(arr);
    },[matchOddsData?.selections]);

    const matchOdds = React.useMemo(()=>{
        return rowData?.map((item)=> ({...item,...getLiveOddsObj({oddsObj:item,LiveOddsObj: liveMarketsData?.matchodds?.find((elm)=> elm?.I == item?.selectionId)})}))
    },[liveMarketsData?.matchodds,liveOddsData,rowData]);

    const bookMakersLiveData = React.useMemo(()=>{
            return bookMakersData?.map((item)=> ({ ...getLiveBookmakersOddsObj({oddsObj: item, LiveOddsObj:liveMarketsData?.bookmaker?.find((elm)=> elm?.I == item?.I)})}))
        },[liveMarketsData?.bookmaker,bookMakersData]);

    const fancyMakersLiveData = React.useMemo(()=>{
                return fancyData?.map((item)=> ({ metaData:exposureData, ...getLiveFancyMarketOddsObj({oddsObj: item, LiveOddsObj:liveMarketsData?.fancymarkets?.find((elm)=> elm?.M === item?.M)})}))
            },[liveMarketsData?.fancymarkets,fancyData,exposureData]);

    const overUnderGoalData = React.useMemo(()=>{
        return matchData?.match?.all_matchbf_odds?.map((item)=>{
            let oddsObj = matchOddsDataAll?.find((oddsItem)=> oddsItem?.market_id === item?.market_id);
            return{
                ...item,
                selection_lists : item?.selection_lists?.map((list_item)=> ({...list_item, matchData: matchData, marketData:item, ...oddsObj?.selections?.find((oddsObjItem)=> oddsObjItem?.selection_id === list_item?.selectionId)}))
            }
        })
    },[matchOddsDataAll,matchData?.match?.all_matchbf_odds]);

    const [betCount, setBetCount] = React.useState(0);
    const [betData, setBetData] = React.useState({});
    const [selectedBetMarketType, setSelectedBetMarketType] = React.useState('');

    React.useEffect(()=>{
        if(!currentTab){
            setBetData({});
        }
        setOneClickBet(false)
    },[currentTab])

    /*---------------------One Click Bet  Start------------------------*/

    const [oneClickStakeDetails,setOneClickStakeDetails] = React.useState({});
    const [oneClickBet,setOneClickBet] = React.useState(false);


    const getOneClickStakeDetails = async () =>{
        let token = JSON.parse(localStorage.getItem('token'));
        try{
            setLoader((preState)=>({...preState, stakeDetails : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/bet-setting', payload: {token}});
            if(res?.statusCode === 200){
                setOneClickStakeDetails(res);
            }
            setLoader((preState)=>({...preState, stakeDetails : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, stakeDetails : false}));
        }
    };

    const handleOneClickBet = (odds,betData) =>{
        handleBetPlaced(odds,betData,oneClickStakeDetails?.one_click_bet_options?.find((item)=> item?.status === "1")?.amount);
    }

    const handleBetPlaced = async (odds,betData,stakeData) =>{
        let payload = {...betData, back_0 : {...betData?.back_0, odds_used_to_calculate : odds, run : odds, stake : stakeData}}
        let token = JSON.parse(localStorage.getItem('token'));
        try{
            setLoader((preState)=>({...preState, betSlip : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/bet-placed', payload: {payload, token}});
            if(res?.statusCode === 200){
                setCurrentTab(0);
                setBetCount(0);
            }else{
                // setDisabled(false);
            }
            setLoader((preState)=>({...preState, betSlip : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, betSlip : false}));
        }
    };

    React.useEffect(()=>{
        getOneClickStakeDetails();
    },[])

    /*---------------------One Click Bet  End------------------------*/

    const getMarketData = ({market_type,selectionId,selectedMarketsId}) =>{
        switch (market_type) {
            case 'matchodds' : return matchData?.match?.[market_type]?.[0];
            case 'bookmaker' : return matchData?.match?.[market_type]?.[0];
            case 'fancymarkets' : return matchData?.match?.[market_type]?.find((item)=> item?.id === selectionId);
            case 'fancybookmaker_markets' : return matchData?.match?.[market_type]?.find((item)=> item?.id === selectedMarketsId);
        }
    }

    const setBet = React.useCallback((betCount=0,rowData,data, type='back',market_type='',colIndex='',selectedMarketsId = '') =>{
        console.log("rowdata",rowData,data)
        setSelectedBetMarketType(market_type);
        moveToTarget({focus_target_id:'bet-Info-container', move_to_target_id:'bet-Info-container', focus_class:styles.highlight, focus_time:500,});
        if(market_type === 'matchodds') setBetDelay(matchOddsData?.betDelay);
        let odds = betCount;
        let payload;
        const marketodds = parseFloat(odds);
        /*switch (market_type) {
            case "bookmaker":
                const oddsUsedToCalculate = (marketodds / 100) + 1;
                payload = {
                    // accept_any_odds: mainViewModel.getAcceptAnyOdds().toString(),
                    back_0: {
                        market_name: 'bookmakers',
                        selection_id: rowData?.selectionId,
                        outcome_name: "",
                        run: marketodds,
                        type: type,
                        stake: "",
                        // mid: matchData?.match?.matchodds?.[0]?.market_id,
                        mid: getMarketData({market_type, selectionId : rowData?.selectionId})?.market_id,
                        match_id: match_id,
                        market_type: market_type,
                        market_odds: marketodds,
                        odds_used_to_calculate: oddsUsedToCalculate
                    },
                    li_id_back: "",
                    match_id: [match_id],
                    session: matchData?.session,
                    sky_bet: "0",
                    is_bookmaker: "1",
                    is_linemarket: "0",
                    betDelay: matchOddsData?.betDelay
                };
                break;
            default:
                payload = {
                    // accept_any_odds: mainViewModel.getAcceptAnyOdds().toString(),
                    back_0: {
                        market_name: 'MATCH_ODDS',
                        selection_id: rowData?.selectionId,
                        outcome_name: "",
                        run: marketodds,
                        type: type,
                        stake: '',
                        mid: matchData?.match?.matchodds?.[0]?.market_id,
                        match_id: match_id,
                        market_type: market_type,
                        market_odds: marketodds,
                        odds_used_to_calculate: marketodds,
                        market_sub_type: "MATCH_ODDS"
                    },
                    li_id_back: "",
                    match_id: [match_id],
                    session: matchData?.session,
                    sky_bet: "0",
                    is_bookmaker: "0",
                    is_linemarket: "0",
                    is_one_click_show: "0",
                    is_betradar: "0",
                    specifier: "",
                    betradar_selection_name: rowData?.selectionName || rowData?.name,
                    betDelay: matchOddsData?.betDelay,
                };
        }*/
        const oddsUsedToCalculate = (marketodds / 100) + 1;
        switch (market_type) {
            case 'matchodds':
                payload = {
                    back_0: {
                        market_name: getMarketData({market_type, selectionId : rowData?.selectionId})?.name,
                        selection_id: rowData?.selectionId,
                        outcome_name: '', // statick
                        run: parseFloat(betCount),
                        type: type,
                        stake: '',
                        mid: getMarketData({market_type, selectionId : rowData?.selectionId})?.market_id,
                        match_id: getMarketData({market_type, selectionId : rowData?.selectionId})?.match_id || match_id,
                        // market_type: getMarketData({market_type, selectionId : rowData?.selectionId})?.market_type,
                        market_type: 'matchodds', // question
                        market_odds: rowData?.[type === "back" ? 'back_odds' : 'lay_odds']?.[colIndex]?.size, // question
                        odds_used_to_calculate: parseFloat(betCount),
                        market_sub_type: 'MATCH_ODDS', // question bf_market_type
                    },
                    li_id_back: '', // question -  // statick
                    match_id: [match_id],
                    session: matchData?.session, // question
                    sky_bet: 0, // question
                    is_one_click_show: 0, // question
                    is_bookmaker: 0,
                    is_linemarket: 0, // question - // statick
                    is_betradar: 0, // question - // statick
                    specifier: '', // question  // statick
                    betradar_selection_name: '', // question
                    betDelay: matchOddsData?.betDelay, // question
                    accept_any_odds: false, // question
                };
                break;

            case 'bookmaker':
                payload = {
                    back_0: {
                        market_name: getMarketData({market_type, selectionId : rowData?.selectionId})?.name, // question
                        selection_id: rowData?.selectionId,
                        outcome_name: '',
                        run: parseFloat(betCount),
                        type: type,
                        stake: '',
                        mid: getMarketData({market_type, selectionId : rowData?.selectionId})?.market_id,
                        match_id: getMarketData({market_type, selectionId : rowData?.selectionId})?.match_id || match_id,
                        market_type: 'bookmaker',
                        market_odds: betCount, // question
                        odds_used_to_calculate: oddsUsedToCalculate,
                        market_sub_type: '',
                    },
                    li_id_back: '',
                    match_id: [match_id],
                    session: matchData?.session, // question
                    sky_bet: 0, // question
                    is_one_click_show: 0, // question
                    is_bookmaker: 1,
                    is_linemarket: 0, // question
                    is_betradar: 0, // question
                    specifier: '', // question
                    betradar_selection_name: '', // question
                    betDelay: matchOddsData?.betDelay, // question
                    accept_any_odds: false, // question
                };
                break;

            case 'fancymarkets':
                payload = {
                    back_0: {
                        market_name: getMarketData({market_type, selectionId : rowData?.selectionId})?.name,
                        selection_id: rowData?.selectionId,
                        outcome_name: '',
                        run: parseFloat(betCount),
                        actual_odds: rowData[type === 'back' ? 'OY' : 'ON'],
                        market_value: rowData[type === 'back' ? 'RY' : 'RN'],
                        type: type,
                        stake: '',
                        mid: getMarketData({market_type, selectionId : rowData?.selectionId})?.market_id,
                        match_id: getMarketData({market_type, selectionId : rowData?.selectionId})?.match_id || match_id,
                        market_type: 'matchodds', // question
                        market_odds: betCount, // question
                    },
                    li_id_back: 'betslip_li_1711716899', // question
                    match_id: [match_id],
                    session: matchData?.session,
                    is_one_click_show: 0, // question
                    sky_bet: 1, // question
                    is_bookmaker: 0, // question
                    is_linemarket: 0, // question
                    betDelay: matchOddsData?.betDelay, // question
                    is_betradar: 0, // question
                    accept_any_odds: false, // question
                };
                break;

            case 'fancybookmaker_markets':
                payload = {
                    back_0: {
                        market_name: getMarketData({market_type, selectionId : rowData?.selectionId})?.name,
                        selection_id: rowData?.selectionId,
                        outcome_name: '',
                        run: parseFloat(betCount),
                        type: type,
                        stake: '',
                        mid: getMarketData({market_type, selectionId : rowData?.selectionId, selectedMarketsId : selectedMarketsId})?.market_id,
                        match_id: getMarketData({market_type, selectionId : rowData?.selectionId, selectedMarketsId : selectedMarketsId})?.match_id || match_id,
                        market_type: 'bookmaker', // question
                        market_odds: betCount, // question
                        odds_used_to_calculate: oddsUsedToCalculate,
                        market_sub_type: 'FANCY_BOOKMAKER', // question
                    },
                    li_id_back: '', // question
                    match_id: [match_id], // question
                    session: matchData?.session, // question
                    sky_bet: getMarketData({market_type, selectionId : rowData?.selectionId})?.market_type === 'sky' ? 1 : 0, // question
                    is_one_click_show: 0, // question
                    is_bookmaker: 1, // question
                    is_linemarket: 0, // question
                    is_betradar: 0, // question
                    specifier: '', // question
                    betradar_selection_name: '', // question
                    betDelay: 0, // question
                    accept_any_odds: false, // question
                };
                break;

            default:
                console.error('Unsupported market type:', market_type);
                break;
        }

        if(oneClickBet){
            handleOneClickBet(betCount,payload)
        }else {
            setBetData(payload);
            setCurrentTab(1);
            setBetCount(betCount);
        }
    },[oneClickBet,matchData]);

    const rowData2= [
        {
            match_odds : "India",
            back : '200k',
            lay : '5',
        },
        {
            match_odds : "South Africa",
            back : 'Suspended',
            lay : 'Suspended',
            colspan:['back',2]
        },
    ];

    const getExposure = async ({rowIndex,data,rowData}) =>{
        let payload = {
            match_id:rowData?.match_id,
            source:'pageLoad',
            market_id:rowData?.market_id,
        }
        setSelectedFancyDataIndex((preData)=>preData === rowIndex ? '' : rowIndex)
        let token = JSON.parse(localStorage.getItem('token'));
        try{
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/get-exposure', payload: {token,payload}});
            if(res?.statusCode === 200){
                setExposureData(res?.ladders);
            }
        }catch (e) {
        }
    };

    const renderSubDataRow = ({rowData,rowIndex,metaData})=>{
        return<div>
            No Data
        </div>
    }


    const columnMatchOdds = React.useMemo(()=>{
        return [
            {fieldName : `match_odds`, title : <div>Match Odds  {matchOddsData?.betDelay ? <img src='images/timerIcon.svg'/> : null} {matchOddsData?.betDelay ? matchOddsData?.betDelay : null}</div>,  bodyCellStyle:{textAlign:'start', paddingLeft:'10px'}, headerCellStyle:{textAlign:'start', paddingLeft:'10px'}, render:(rowData,data)=>sport_id === '116' ? <HorseInfo rowData={rowData} data={data} /> : <div>{data}</div> },
            {fieldName : '1', title : '1',render:(rowData,data)=><div className={styles.customTableCell}><Label onClick={()=>setBet(rowData?.back_odds?.[0]?.price, rowData, data, 'back','matchodds', 0)} disable={isOddsDisable({type:"Back", odds :rowData?.back_odds?.[0]?.price,sport_id,allow_betfair_horse_lay})} isBeep={true} changedBgColor='#ffffff' count1={rowData?.back_odds?.[0]?.price || '-'} count2={calculateSizeOfOdds({oddSize : rowData?.back_odds?.[0]?.size,gbp_conversion:rowData?.matchData?.gbp_conversion,bet_fair_percentage:rowData?.matchData?.bet_fair_percentage,tripple_pt:rowData?.matchData?.tripple_pt}) || ''}/><Label onClick={()=>setBet(rowData?.lay_odds?.[0]?.price, rowData, data, 'lay','matchodds',0)} disable={isOddsDisable({type:"Lay", odds :rowData?.lay_odds?.[0]?.price,sport_id, allow_betfair_horse_lay})} isBeep={true} changedBgColor='#ffffff' count1={rowData?.lay_odds?.[0]?.price || '-'} bgColor='#0d5eac' count2={calculateSizeOfOdds({oddSize : rowData?.lay_odds?.[0]?.size,gbp_conversion:rowData?.matchData?.gbp_conversion,bet_fair_percentage:rowData?.matchData?.bet_fair_percentage,tripple_pt:rowData?.matchData?.tripple_pt}) || ''}/></div>},
            {fieldName : 'x', title : 'X',render:(rowData,data)=><div className={styles.customTableCell}><Label onClick={()=>setBet(rowData?.back_odds?.[1]?.price, rowData, data, 'back','matchodds',1)} disable={isOddsDisable({type:"Back", odds :rowData?.back_odds?.[1]?.price,sport_id,allow_betfair_horse_lay})} isBeep={true} changedBgColor='#ffffff' count1={rowData?.back_odds?.[1]?.price || '-'} count2={calculateSizeOfOdds({oddSize : rowData?.back_odds?.[1]?.size,gbp_conversion:rowData?.matchData?.gbp_conversion,bet_fair_percentage:rowData?.matchData?.bet_fair_percentage,tripple_pt:rowData?.matchData?.tripple_pt}) || ''} /><Label onClick={()=>setBet(rowData?.lay_odds?.[1]?.price, rowData, data, 'lay','matchodds',1)} disable={isOddsDisable({type:"Lay", odds :rowData?.lay_odds?.[1]?.price,sport_id, allow_betfair_horse_lay})} isBeep={true} changedBgColor='#ffffff' bgColor='#0d5eac' count1={rowData?.lay_odds?.[1]?.price || '-'} count2={calculateSizeOfOdds({oddSize : rowData?.lay_odds?.[1]?.size,gbp_conversion:rowData?.matchData?.gbp_conversion,bet_fair_percentage:rowData?.matchData?.bet_fair_percentage,tripple_pt:rowData?.matchData?.tripple_pt}) || ''}/></div>},
            {fieldName : '2', title : '2', render:(rowData,data)=><div className={styles.customTableCell}><Label onClick={()=>setBet(rowData?.back_odds?.[2]?.price, rowData, data, 'back','matchodds',2)} disable={isOddsDisable({type:"Back", odds :rowData?.back_odds?.[2]?.price,sport_id,allow_betfair_horse_lay})} isBeep={true} changedBgColor='#ffffff' count1={rowData?.back_odds?.[2]?.price || '-'} count2={calculateSizeOfOdds({oddSize : rowData?.back_odds?.[2]?.size,gbp_conversion:rowData?.matchData?.gbp_conversion,bet_fair_percentage:rowData?.matchData?.bet_fair_percentage,tripple_pt:rowData?.matchData?.tripple_pt}) || ''}/><Label  onClick={()=>setBet(rowData?.lay_odds?.[2]?.price, rowData, data, 'lay','matchodds',2)} disable={isOddsDisable({type:"Lay", odds :rowData?.lay_odds?.[2]?.price,sport_id, allow_betfair_horse_lay})} isBeep={true} changedBgColor='#ffffff' count1={rowData?.lay_odds?.[2]?.price || '-'} count2={calculateSizeOfOdds({oddSize : rowData?.lay_odds?.[2]?.size,gbp_conversion:rowData?.matchData?.gbp_conversion,bet_fair_percentage:rowData?.matchData?.bet_fair_percentage,tripple_pt:rowData?.matchData?.tripple_pt}) || ''} bgColor='#0d5eac'/></div>},
        ]
    },[rowData,oneClickBet]);

    const columnBookMakers = React.useMemo(()=>{
        return [
            {fieldName : 'selectionName', title : <div>Match Odds (Bookmaker) <img src={'/images/savingPersentage-icon.svg'}/></div>,  bodyCellStyle:{textAlign:'start', paddingLeft:'10px'}, headerCellStyle:{textAlign:'start', paddingLeft:'10px'}},
            {fieldName : 'B', title : 'Back',render:(rowData,data)=><div className={styles.customTableCell}><Label count1={(rowData?.S === 'ONLINE' ? data : rowData?.S) || '-'} onClick={()=>setBet(data, rowData, data, 'back','bookmaker')} disable={isOddsDisable({type:"Back", odds : data, sport_id, allow_betfair_horse_lay,selectionStatus : rowData?.S})} bgColor={rowData?.S !== 'ONLINE' ? '#ffab2d' : ''}/></div>},
            {fieldName : 'L', title : 'Lay',render:(rowData,data)=><div className={styles.customTableCell}><Label count1={data || '-'} onClick={()=>setBet(data, rowData, data, 'lay','bookmaker')} disable={isOddsDisable({type:"Lay", odds : data, sport_id, allow_betfair_horse_lay,selectionStatus : rowData?.S})} bgColor='#0d5eac' /></div>},
            {fieldName : 'MaxMin', title : '', render:(rowData,data)=><div className={styles.customTableCell4}><Label count2={`Max bet : ${rowData?.MaxMin?.max_bet}`} count3={`Max Market : ${rowData?.MaxMin?.max_market}`} bgColor='#212d3b'/></div>},
        ]
    },[bookMakersData,oneClickBet]);

    const columnFancy = React.useMemo(()=>{
        return [
            {fieldName : 'name', title : <div>Fancy</div>, bodyCellStyle:{textAlign:'start', paddingLeft:'10px'}, headerCellStyle:{textAlign:'start', paddingLeft:'10px'}},
            {fieldName : 'aaa', title : '',render:(rowData,data,rowIndex)=><div className={styles.customTableCell3} onClick={()=>getExposure({rowIndex,data,rowData})}><img src='images/ladder-icon.png' width='15px'/></div>,renderSubDataRow:({rowData,rowIndex,metaData})=>renderSubDataRow({rowData,rowIndex,metaData})},
            {fieldName : 'RN', title : 'No',render:(rowData,data)=><div className={styles.customTableCell3}><Label count1={(rowData?.S === 'ONLINE' ? data : rowData?.S) || '-'} count2={rowData?.S === 'ONLINE' && rowData?.ON} onClick={()=>setBet(data, rowData, data, 'lay','fancymarkets')} disable={isOddsDisable({type:"", odds : data, sport_id, allow_betfair_horse_lay})} bgColor={rowData?.S !== 'ONLINE' ? '#ffab2d' : '#0d5eac'} /></div>},
            {fieldName : 'RY', title : 'Yes', render:(rowData,data)=><div className={styles.customTableCell3}><Label count1={data || '-'} count2={rowData?.OY} onClick={()=>setBet(data, rowData, data, 'back','fancymarkets')} disable={isOddsDisable({type:"", odds : data, sport_id, allow_betfair_horse_lay})} /></div>},
            {fieldName : 'MaxMin', title : '', render:(rowData,data)=><div className={styles.customTableCell4}><Label count2={`Max bet : ${rowData?.MaxMin?.max_bet}`} count3={`Max Market : ${rowData?.MaxMin?.max_market}`} bgColor='#212d3b'/></div>},
        ]
    },[fancyData,oneClickBet]);

    const columnFancyBookMakers = React.useMemo(()=>{
        return [
            {fieldName : 'selectionName', title : <div>Fancy-bookmakr <img src={'/images/savingPersentage-icon.svg'}/></div>, bodyCellStyle:{textAlign:'start', paddingLeft:'10px'}, headerCellStyle:{textAlign:'start', paddingLeft:'10px'}},
            {fieldName : 'B', title : 'Back',render:(rowData,data)=><div className={styles.customTableCell3}><Label count1={(rowData?.S === 'ONLINE' ? data : rowData?.S) || '-'} onClick={()=>setBet(data, rowData, data, 'lay','fancybookmaker_markets',undefined,rowData?.marketData?.id)} disable={isOddsDisable({type:"", odds : data, sport_id, allow_betfair_horse_lay})} bgColor={rowData?.S !== 'ONLINE' ? '#ffab2d' : '#0d5eac'} /></div>},
            // {fieldName : 'L', title : 'Lay', render:(rowData,data)=><div className={styles.customTableCell3}><Label count1={rowData?.S === 'ONLINE' ? data :''} onClick={()=>setBet(data, rowData, data, 'back','fancybookmaker_markets',undefined,rowData?.marketData?.id)} disable={isOddsDisable({type:"", odds : data, sport_id, allow_betfair_horse_lay})} /></div>},
            {fieldName : 'MaxMin', title : '', render:(rowData,data)=><div className={styles.customTableCell4}><Label count2={`Max bet : ${rowData?.MaxMin?.max_bet}`} count3={`Max Market : ${rowData?.MaxMin?.max_market}`} bgColor='#212d3b'/></div>},
        ]
    },[fancyBookMakersData,oneClickBet]);

    const columnOverUnderGoal = React.useMemo(()=>{
        return [
            {fieldName : 'selectionName', renderColumn:({rows})=>rows?.[0]?.marketData?.name, bodyCellStyle:{textAlign:'start', paddingLeft:'10px'}, headerCellStyle:{textAlign:'start', paddingLeft:'10px'}},
            {fieldName : 'B', title : 'Back',render:(rowData,data)=><div className={styles.customTableCell3}><Label count1={(rowData?.selectionStatus === 'ACTIVE' ? rowData?.back_odds?.[0]?.price : rowData?.selectionStatus) || '-'} count2={calculateSizeOfOdds({oddSize : rowData?.back_odds?.[0]?.size,gbp_conversion:rowData?.matchData?.gbp_conversion,bet_fair_percentage:rowData?.matchData?.bet_fair_percentage,tripple_pt:rowData?.matchData?.tripple_pt}) || ''} onClick={()=>setBet(rowData?.back_odds?.[0]?.price, rowData, rowData?.back_odds?.[0]?.price, 'back','matchodds',undefined,rowData?.marketData?.id)} disable={isOddsDisable({type:"", odds : rowData?.back_odds?.[0]?.price, sport_id, allow_betfair_horse_lay})} bgColor={rowData?.selectionStatus !== 'ACTIVE' ? '#ffab2d' : '#0d5eac'} /></div>},
            {fieldName : 'L', title : 'Lay', render:(rowData,data)=><div className={styles.customTableCell3}><Label count1={rowData?.selectionStatus === 'ACTIVE' ? rowData?.lay_odds?.[0]?.price :''} count2={calculateSizeOfOdds({oddSize : rowData?.lay_odds?.[0]?.size,gbp_conversion:rowData?.matchData?.gbp_conversion,bet_fair_percentage:rowData?.matchData?.bet_fair_percentage,tripple_pt:rowData?.matchData?.tripple_pt}) || ''} onClick={()=>setBet(rowData?.lay_odds?.[0]?.price, rowData, rowData?.lay_odds?.[0]?.price, 'lay','matchodds',undefined,rowData?.marketData?.id)} disable={isOddsDisable({type:"", odds : rowData?.lay_odds?.[0]?.price, sport_id, allow_betfair_horse_lay})} /></div>},
        ]
    },[matchOddsDataAll,matchData,oneClickBet]);

    return (
        <div className={styles.mainContainer}>
            <BackwardNavBar
                pageName={` ${matchData?.match?.team_a} VS ${matchData?.match?.team_b}`}/>
            <div className={styles.innerContainer}>
                <section className={`row`}>
                    <div className={`col col-xl-2 col-md-4 col-sm-12`}>
                        <section className={styles.leftSideContent}>

                            <MatchListNavBar/>
                            {/*<div className={styles.categoryTitle}>Sports</div>*/}

                            {/*<MatchList name='Cricket' list={matchList}/>*/}

                            {/*<div className={styles.previousTitle}>*/}
                            {/*    <i className='fa fa-angle-left'/>*/}
                            {/*    <span> Previous</span>*/}
                            {/*</div>*/}
                            {/*<section className={`${styles.previousSection}`}>*/}
                            {/*    <div className={styles.heading}>Favourites</div>*/}
                            {/*    <AddToFavourite/>*/}

                            {/*    <GameInfo name='Cricket' title='England Women Vs India Women.'*/}
                            {/*              logo='images/cricket.svg'/>*/}
                            {/*    <GameInfo name='Soccer' title='Juventus Vs Real Madrid' logo='images/soccer.svg'/>*/}
                            {/*</section>*/}
                        </section>
                    </div>
                    <div className={`col col-xl-7 col-md-8 col-sm-12`}>
                        <section className={styles.scoreFramSection}>
                                <div>
                                    {/*<iframe id="scorecard_iframe" className="score_frame"*/}
                                    {/*        src="https://champ9.com/scorecard/353434" height="100%" frameBorder="0"*/}
                                    {/*        scrolling="auto" margins="0" width="100%"/>*/}
                                </div>
                            <SubNav tabs={tab2} score={true} share={true}/>
                        </section>

                        <section className={styles.TablesSection}>
                            {(!loader?.matchData && !loader?.odds) ?
                               (matchOdds?.length > 0 && <Table greenNote='' rows={matchOdds} column={columnMatchOdds} cellStyle={{paddingRight:'7px'}}/>) : <p>Loading...</p>}
                            {(!loader?.matchData && !loader?.bookMakersOdds) ?
                                (bookMakersLiveData?.length > 0 && <><div className={styles.infoNoteText}>Bookmaker (0% Commission and Instant Bet)</div>
                            <Table greenNote='' rows={bookMakersLiveData} column={columnBookMakers}/></>) : <p>Loading...</p>}
                            {(!loader?.matchData && !loader?.fancyOdds) ?
                                (fancyMakersLiveData?.length > 0 && <Table greenNote='' rows={fancyMakersLiveData} column={columnFancy} selectedRowIndex={selectedFancyDataIndex}/>) : <p>Loading...</p> }
                            {( !loader?.fancyBookMakersOdds) ?
                                ((fancyBookMakersData?.length > 0 && sport_id === "30") &&
                                    <>
                                        {fancyBookMakersData?.map((item)=>(
                                                <Table greenNote='' rows={item?.selection_lists} column={columnFancyBookMakers}/>
                                        ))}
                                    </>
                                    ) : <p>Loading...</p> }

                            {( !loader?.matchData && !loader?.odds) ?
                                // ((matchData?.match?.all_matchbf_odds?.length > 0 && sport_id === "171") &&
                                ((overUnderGoalData?.length > 0 && sport_id === "171") &&
                                    <>
                                        {overUnderGoalData?.map((item,index)=>(
                                            index <3 ? <Table greenNote='' rows={item?.selection_lists} column={columnOverUnderGoal}/> :''
                                        ))}
                                    </>
                                ) : <p>Loading...</p> }
                        </section>
                    </div>
                    <div className={`col col-xl-3 col-md-12 col-sm-12`}>
                        <section className={styles.rightSideContent}>
                            <div id="videoplayer" className={styles.videoPlayer} id={`target-bet`}>
                                <iframe width="100%" height="100%"
                                        src={`https://ss247.life/api/4b50fe2720dbe6dfdb23b57cd8d62cafc564ac15/Nstreamapi.php?chid=${matchData?.match?.video_channel_id}`}/>
                            </div>
                            <div className={`${styles.betInfoContainer}`} id={`bet-Info-container`}>
                                <SubNav tabs={betInfoTab} currentTab={currentTab} tabHandler={tabHandler}/>

                                {currentTab === 0 ?
                                    <OpenBets/>
                                    : currentTab === 1
                                        ? <div>
                                            <BetSlip
                                                odds={betCount}
                                                setBetCount={setBetCount}
                                                betData={betData}
                                                setCurrentTab={setCurrentTab}
                                                matchData={matchData}
                                                marketType={selectedBetMarketType}
                                                betDelay={betDelay}
                                            />
                                        </div>
                                        : <OneClickStake
                                            oneClickBet={oneClickBet}
                                            setOneClickBet={setOneClickBet}
                                            oneClickStakeDetails={oneClickStakeDetails}
                                            loader={loader}
                                        />}
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    )
};

export default GamePage;