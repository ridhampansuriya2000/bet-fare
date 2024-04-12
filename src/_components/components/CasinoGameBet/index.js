import React from 'react';
import styles from './CasinoGameBet.module.css';
import fetchData from "../../../utils/httpAction";
import {useDispatch, useSelector} from "react-redux";
import {convertToValidNumber} from "../../../utils/helperFunctions";
import SlotGames from "../SlotGames";
import {useRouter} from "next/router";
import {fetchBalance} from "../../../store/action/commonAction";
import BalanceTransfer from "../BalanceTransfer";
import {loadToaster} from "../../../store/action/toaster";

const getRoute = (type) =>{
    switch (type) {
        case 'Ezugi' : return 'ezugi-update-balance';
        case 'Evolution' : return 'evolution-update-evo-balance';
        // case 'Slot Games' : return 'update-evo-balance';
        case 'Slot Games' : return 'evolution-update-evo-balance';
    }
}

const CasinoGameBet = ({type}) =>{

    const dispatch = useDispatch();
    const router = useRouter();
    const gameId = router.query.gameId;
    const tabValue = router.query.tab;

    const {balance} = useSelector((state)=>({
        balance : state?.common?.balance?.balance
    }));

    const [data,setData] = React.useState({});
    const [errorData,setErrorData] = React.useState('');
    const [loader, setLoader] = React.useState({type: false});
    const [isBalanceTransfer, setBalanceTransfer] = React.useState( false);

    const getGameLink = async ({balance}={}) =>{
        let token = JSON.parse(localStorage.getItem('token'));
        let payload = {
            point : parseInt(convertToValidNumber(balance)) || 0,
            table_id : gameId
        }
        try{
            setLoader((preState)=>({...preState, type : true}));
            let res =  await fetchData({  method : 'POST', endPoint:`/api/game/${getRoute(type)}`, payload: {payload, token}});
            if(res?.statusCode === 200){
                setBalanceTransfer(true);
                setData(res?.data);
                await dispatch(fetchBalance());
                dispatch(loadToaster({toasterMessage: 'Balance Transferred.',toasterType:'success'}));
            }else {
                setErrorData(res?.message?.[0])
            }
            setLoader((preState)=>({...preState, type : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, type : false}));
            dispatch(loadToaster({toasterMessage:e.error.message || e?.message,toasterType:'error'}));
        }
    };

    const getSlot= async (token) =>{
        token = JSON.parse(localStorage.getItem('token'));
        try{
            setLoader((preState)=>({...preState, type : true}));
            let res =  await fetchData({  method : 'POST', endPoint:`/api/game/get-slots`, payload: {token}});
            if(res?.statusCode === 200){
                setData(res?.slot_games);
            }
            setLoader((preState)=>({...preState, type : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, type : false}));
        }
    };

    const getLoadGame= async (token) =>{
        token = JSON.parse(localStorage.getItem('token'));
        let payload = {
            "device" : "User-Agent"
        }
        try{
            setLoader((preState)=>({...preState, type : true}));
            let res =  await fetchData({  method : 'POST', endPoint:`/api/game/load-game`, payload: {token, payload}});
            if(res?.statusCode === 200){
                setData(res);
            }
            setLoader((preState)=>({...preState, type : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, type : false}));
        }
    };

    const clearCasinoSession= async (token) =>{
        token = JSON.parse(localStorage.getItem('token'));
        try{
            setLoader((preState)=>({...preState, casino : true}));
            let res =  await fetchData({  method : 'POST', endPoint:`/api/game/clear-casino-session`, payload: {token}});
            if(res?.statusCode === 200){
                // setData(res);
            }
            setLoader((preState)=>({...preState, casino : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, casino : false}));
        }
    };

    React.useEffect(()=>{
        return async ()=>{
            await clearCasinoSession();
            await dispatch(fetchBalance());
        }
    },[type,gameId])

    React.useEffect(()=>{
        (async ()=>{
            // await clearCasinoSession();
            setBalanceTransfer(false);
            // await dispatch(fetchBalance());
        })()
    },[tabValue]);

    React.useEffect(()=>{
        (async ()=>{
            // await dispatch(fetchBalance());
            setErrorData('');
            // if(balance){
            //
            //   if(type === 'Ezugi'){
            //       await getLoadGame();
            //   }
            //     }
            //   if(type === 'Evolution'){
            //       await getGameLink();
            //   }
            if(balance){
                  if(type === 'Ezugi'){
                      await getLoadGame();
                  }
            }
              if(type === 'Slot Games' && !gameId){
                  await getSlot();
              }
        })()
    },[balance, type,gameId]);

    // React.useEffect(()=>{
    //     (async ()=>{
    //         setData({});
    //         setErrorData('');
    //         if(gameId){
    //             if(type === 'Slot Games'){
    //                 // await getGameLink({table_id : gameId});
    //             }
    //         }
    //     })()
    // },[gameId]);

    return(
        <div className={styles.mainContainer}>
            {loader?.type ?
                "Loading..."
                : errorData
                    ? <div className={styles.errorText}>{errorData}</div>
                    : (type === 'Slot Games' && !gameId)
                    ? <SlotGames data={data}/>
                    : !isBalanceTransfer
                    ? <BalanceTransfer onSubmit={getGameLink}/>
                    : <iframe src={data?.url} style={{width:"100%", height: '750px', border:'none'}}/>
            }
        </div>
    )
};

export default CasinoGameBet;