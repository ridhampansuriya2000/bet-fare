import React from 'react';


import styles from './ListingPage.module.css';
import BackwardNavBar from "../BackwardNavBar";
import AccordionContainer from "../../view/AccordianContainer";
import SubNav from "../SubNav";
import GameInfo from "../GameInfo";
import GameInfo2 from "../GameInfo2";
import BetSlip from "../BetSlip";
import fetchData from "../../../utils/httpAction";
import {useRouter} from "next/router";
import CasinoGameBet from "../CasinoGameBet";
import RacingGameBets from "../RacingGameBets";
import OpenBets from "../OpenBets";
import MatchListNavBar from "../MatchListNavBar";
import {convertBtwSportIdAndGameName} from "../../../utils/helperFunctions";
import {useDispatch, useSelector} from "react-redux";
import {fetchScoreByMarket} from "../../../store/action/gameAction";
import {emitToSocket, subscribeToSocket} from "../../../Socket/socket";

const SubData = () => (
    <div className={styles.subContent}>
        <div className={styles.subContentItem}><img src="images/cricket.svg" width='20px' srcSet=""/>Cricket <span className="rounded-circle badge ms-auto">8</span></div>
        <div className={styles.subContentItem}><img src="images/tennis.svg" width='20px' srcSet=""/>Tennis</div>
        <div className={styles.subContentItem}><img src="images/soccer.svg" width='20px' srcSet=""/>Soccer</div>
        <div className={styles.subContentItem}><img src="images/badminton.svg" width='20px' srcSet=""/>Badminton</div>
        <div className={styles.subContentItem}><img src="images/basketball.svg" width='20px' srcSet=""/>Basketball</div>
    </div>
);

const accordionData1 = [
    {title: 'Sports', content: <SubData/>},
    {title: 'Games', content: <SubData/>},
    {title: 'Live Casino', content: <SubData/>},
    // Add more dummy data as needed
];

const betInfoTab = [
    { title : 'Open Bets', path : '' },
    { title : 'Bet Slip', path : '' },
];

const data = [
    { title: 'Unmatched Bets', content: '',emptyContent: <img src="images/caution-icon.svg" alt="caution icon"/> },
    { title: 'Matched Bets', content: '', emptyContent: <img src="images/caution-icon.svg" alt="caution icon"/>  },
    { title: 'Premium Sportsbook Transaction', content: '', emptyContent: <img src="images/caution-icon.svg" alt="caution icon"/>  },
    // Add more dummy data as needed
];

let casinoTab = ['Ezugi','Evolution','Slot Games'];
let raceTab = ['Horse','Greyhound'];

const getIdForGame = (tab) =>{
    switch(tab){
        case 'Horse' : return 116;
        break;
        case 'Greyhound' : return 113;
        break;
        default: return -1;
    }
};

function getEventIds(data) {
    let eventIds = [];
    // Iterate through each sport
    Object.values(data).forEach(sport => {
        // Iterate through each event in the sport
        sport.forEach(event => {
            if (event.event_id !== null) {
                eventIds.push(event.event_id);
            }
            if (event.betfair_event_id !== null) {
                eventIds.push(event.betfair_event_id);
            }
        });
    });
    return eventIds;
}

const ListingPage = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const tabValue = router.query.tab;
    const {sport_id, tournament_id} = router.query;

    const [currentTab,setCurrentTab] = React.useState(0);
    const [gameData,setGameData] = React.useState({});
    const [oddsData,setOddsData] = React.useState([]);
    const [loader, setLoader] = React.useState({
        eventListing: false,
        odds : false
    });

    const getGamesData = async (id) =>{
        let token = JSON.parse(localStorage.getItem('token'));
        try {
            setLoader((preState)=>({...preState, eventListing : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/event-listing', payload: {token, payload :{id:id}}});
            if(res?.statusCode === 200){
                setGameData(!raceTab?.includes(tabValue) ? res?.matches[0] : res?.markets_grouped_by_match || {});
                let newArr = [];
                let matchesObj = res?.matches[0];
                Object.keys(matchesObj).map((item)=>res?.matches[0][item].forEach((elm => newArr.push(elm.matchodds?.[0]?.market_id))));
                dispatch(fetchScoreByMarket({event_ids : getEventIds(matchesObj)}));
                getOdds({ "market_ids" : newArr},token);
            }else{
                // setDisabled(false);
            }
            setLoader((preState)=>({...preState, eventListing : false}));
        }catch (e) {
            console.log("something wrong",e);
            setLoader((preState)=>({...preState, eventListing : false}));
        }
    };

    const getOdds = async (payload,token) =>{
        console.log("token",token)
        try{
            setLoader((preState)=>({...preState, odds : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/odds-by-market', payload: {payload, token}});
            if(res?.statusCode === 200){
                setOddsData(res?.data);
            }else{
                // setDisabled(false);
            }
            setLoader((preState)=>({...preState, odds : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, odds : false}));
        }
    }

    React.useEffect(()=>{
                !casinoTab?.includes(tabValue) && getGamesData(getIdForGame(tabValue));
        emitToSocket({
            eventName:`event_scores`,
            roomtype:'public'
        })
        subscribeToSocket({
            eventName:`event_scores`,
            cb:data => {
                console.log("event_scores",data)
            },
        });
    },[]);

    const tabHandler = (tab) =>{
        setCurrentTab(tab);
    }

    return (
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={"Favourite"} maxWidth='1250'/>
            {casinoTab.includes(tabValue) ?
                <CasinoGameBet type={tabValue}/>
                :
                <div className={styles.innerContainer}>
                <section className={`row`}>
                    <div className={`col col-xl-2 col-md-4 col-sm-12`}>
                        <section className={styles.leftSideContent}>
                            <MatchListNavBar/>
                            {/*<AccordionContainer*/}
                            {/*    data={accordionData1}*/}
                            {/*    accordionHeaderStyle={{background: '#16202c'}}*/}
                            {/*/>*/}

                            {/*<GameInfo name='Cricket' title='England Women Vs India Women.' logo='images/cricket.svg'/>*/}
                            {/*<GameInfo name='Soccer' title='Juventus Vs Real Madrid' logo='images/soccer.svg'/>*/}
                        </section>
                    </div>
                    <div className={`col col-xl-6 col-md-8 col-sm-12`}>
                        <section>
                            {(loader.eventListing || loader?.odds) ?
                                "Loading..."
                                : raceTab.includes(tabValue)
                                    ? <RacingGameBets
                                        gameData={gameData}
                                    />
                                    : Object.keys(gameData)?.filter((item)=> sport_id ? convertBtwSportIdAndGameName(sport_id, false) === item : true).map((item,index)=>(
                                        <span key={index}>
                                    <GameInfo2
                                        name={item}
                                        data={gameData[item].filter((match)=> tournament_id ? tournament_id == match?.tournament_id : true)}
                                        index={index}
                                        oddsData={oddsData}
                                    />
                                </span>
                                    ))}

                            {/*<GameInfo2 name='SOCCER' title='Juventus Vs Real Madrid' logo='images/cricket.svg'/>*/}
                        </section>
                    </div>
                    <div className={`col col-xl-4 col-md-12 col-sm-12`}>
                        <section className={styles.rightSideContent}>
                            <SubNav tabs={betInfoTab} currentTab={currentTab} tabHandler={tabHandler}/>

                            {currentTab === 0 ?
                                <>
                                    {/*<AccordionContainer data={data}/>*/}
                                    <OpenBets/>
                                </>
                            :
                            <div>
                                <BetSlip />
                            </div>}
                        </section>
                    </div>
                </section>
            </div>}
        </div>
    )
};

export default ListingPage;