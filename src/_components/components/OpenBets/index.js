import React from 'react';
import styles from './OpenBets.module.css';
import AccordionContainer from "../../view/AccordianContainer";
import fetchData from "../../../utils/httpAction";
import BetTable from "../BetTable";
import {fetchMatchedDetails, fetchUnMatchedDetails} from "../../../store/action/gameAction";
import {useDispatch, useSelector} from "react-redux";

const getProfitLiabilty = (rowData, data) => {
    let profit = 0;
    let liability = 0;
    if (rowData?.market_type === 'bookmaker') {
        let payout = parseInt(rowData?.run)*parseInt(rowData?.stake);
        if (rowData?.type === 'lay') {
            liability = payout - parseInt(rowData?.stake);
        } else if (rowData?.type === 'back') {
            profit = payout - parseInt(rowData?.stake);
            liability = parseInt(rowData?.stake);
        }
    }

    if (rowData?.market_type === 'fancy') {
        let payout = parseInt(rowData?.run)*parseInt(rowData?.stake);
        if (rowData?.type === 'lay') {
            liability = parseInt(rowData?.run)*parseInt(rowData?.stake) - parseInt(rowData?.stake);
            profit = parseInt(rowData?.stake);
        } else {
            profit = parseInt(rowData?.run)*parseInt(rowData?.stake) - parseInt(rowData?.stake);
            liability = parseInt(rowData?.stake);
        }
    }

    if (rowData?.market_type === 'matchodds') {
        let payout = parseInt(rowData?.run)*parseInt(rowData?.stake);
        if (rowData?.type === 'lay') {
            liability = payout - parseInt(rowData?.stake);
        } else if (rowData?.type === 'back') {
            profit = payout - parseInt(rowData?.stake);
            liability = parseInt(rowData?.stake);
        }
    }
    return `${profit}/${liability}`
}

const BetList = ({betsData,type,setLoader,loader,cancelBet}) =>{

    const column = (firstField,secondField) =>{
        let array = ([
            {fieldName : `selection_name`, title : "Match Odds", cellStyle:{}},
            {fieldName : `${firstField === 'Runs' ? 'run' : 'actual_odds'}`, title : firstField, cellStyle:{}},
            secondField === '(H-J)' ?
                {fieldName : `${secondField === '(H-J)' ? 'market_odds' : ''}`, title : secondField}
                : {},
            {fieldName : 'stake', title : 'Stake'},
            {fieldName : 'new_user', title : 'Profilt/Liability', render:(rowData,data)=><div>{getProfitLiabilty(rowData,data)}</div>},
            type === 'UnmatchedBets' ?
                {fieldName : '', title : 'Action', render:(rowData,data)=>(
                        <div onClick={()=>cancelBet({payload : {id :[rowData?.local_bet_id]}})}>
                            <i className="fas fa-times fa-2x" style={{ color: 'red', cursor: 'pointer' }} />
                        </div>
                    )}
                : {},
        ]?.filter((item)=> JSON.stringify(item) !== JSON.stringify({}) ));
        return array;
    };

    // const column1 = (firstField,secondField) =>([
    //     {fieldName : 'event_name', title : 'Match Odds', cellStyle:{}},
    //     {fieldName : 'market_odds', title : 'Odds'},
    //     {fieldName : 'stake', title : 'Stake'},
    //     {fieldName : 'new_user', title : 'Profilt/Liability', render:(rowData,data)=><div>{getProfitLiabilty(rowData,data)}</div>},
    // ]);
    //
    // const column2 = [
    //     {fieldName : 'run', title : 'Runs', cellStyle:{}},
    //     {fieldName : 'market_odds', title : 'Odds'},
    //     {fieldName : 'stake', title : 'Stake'},
    //     {fieldName : 'new_user', title : 'Profilt/Liability', render:(rowData,data)=><div>{getProfitLiabilty(rowData,data)}</div>},
    // ];

    return(
        <div className={styles.betListContainer}>
            <div className={`${loader?.cancelBet ? styles.loaderWrapper : ''}`}>
            {betsData?.map((item,index)=>(
                <div className={styles.betCard} key={index}>
                    <div className={styles.betMatchTitle}>{item?.[0]?.team_a} VS {item?.[0]?.team_b}</div>
                    <div className={`${styles.spaceBetween}`}>
                        <div className={styles.marketTypeTitle}>{item?.[0]?.market_type}</div>
                        {type === 'UnmatchedBets' &&
                        <div className={styles.cancelBtn} onClick={()=>cancelBet({payload : {id : betsData?.[0]?.map(item => item?.local_bet_id)}})}>
                            <div >Cancel</div>
                        </div>}
                    </div>
                    {/*<BetTable column={item?.[0]?.market_type === 'matchodds' ? column1() : column2} rows={item} />*/}
                    <BetTable
                        rows={item}
                        column={column(item?.[0]?.market_type &&
                        (item?.[0]?.market_type === 'matchodds' ||
                            item?.[0]?.market_type === 'bookmaker' ||
                            (item?.[0]?.market_type === 'fancy' &&
                                item?.[0]?.bf_market_type === 'FANCY_BOOKMAKER')) ? item?.[0]?.name : 'Runs',
                        item?.[0]?.market_type &&
                        (item?.[0]?.market_type !== 'matchodds' &&
                            item?.[0]?.market_type !== 'bookmaker' &&
                            !(item?.[0]?.market_type === 'fancy' &&
                                item?.[0]?.bf_market_type === 'FANCY_BOOKMAKER')) ?
                            '(H-J)' : null)}/>
                </div>
                ))}
            </div>
            <div className={`${styles.loadingText}  ${!loader?.cancelBet ?  styles.none : ''}`}>Loading...</div>
        </div>
    )
};

const OpenBets = () =>{

    const dispatch = useDispatch();

    const {matchedBet, unMatchedBet,loading} = useSelector((state)=>({
        matchedBet : state?.game?.matchedBets,
        unMatchedBet : state.game?.unMatchedBets,
        loading : state.game?.loading,
    }));

    const [loader,setLoader] = React.useState({matchedBets : false, unMatchedBets : false, cancelBet: false,});
    const [matchedBets,setMatchedBets] = React.useState({});
    const [unMatchedBets,setUnMatchedBets] = React.useState({});

    React.useEffect( ()=>{
        dispatch(fetchMatchedDetails());
        dispatch(fetchUnMatchedDetails());
    },[]);

    React.useEffect( ()=>{
        setMatchedBets(matchedBet);
        setUnMatchedBets(unMatchedBet);
    },[matchedBet,unMatchedBet]);

    const cancelBet = async ({payload}) =>{
        let token = JSON.parse(localStorage.getItem('token'));
        try{
            setLoader((preState)=>({...preState, cancelBet : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/cancel-bet', payload: {token, payload}});
            if(res?.statusCode === 200){
                getUnMatchedBetDetails();
            }
            setLoader((preState)=>({...preState, cancelBet : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, cancelBet : false}));
        }
    };

    const data = React.useMemo(()=>([
        {title: 'Unmatched Bets', content: Object.keys(unMatchedBet?.response?.market_ids || {})?.length ? <BetList betsData={Object.values(unMatchedBet?.response?.market_ids)} type='UnmatchedBets' loader={loader} cancelBet={cancelBet} /> : '', emptyContent: <img src="images/caution-icon.svg" alt="caution icon"/>},
        {title: 'Matched Bets', content: Object.keys(matchedBet?.response?.market_ids || {})?.length ? <BetList betsData={Object.values(matchedBet?.response?.market_ids)} type='MatchedBets' loader={loader} cancelBet={cancelBet} /> : '', emptyContent: <img src="images/caution-icon.svg" alt="caution icon"/>},
        // {title: 'Premium Sportsbook Transaction', content: '', emptyContent: <img src="images/caution-icon.svg" alt="caution icon"/>},
    ]),[matchedBets?.response?.market_ids,unMatchedBets?.response?.market_ids,loader?.cancelBet,loading]);

    return(
        <div className={`${styles.mainContainer}`}>
            <AccordionContainer data={data}/>
        </div>
    )
};

export default OpenBets;