import React from 'react';
import styles from './MatchListNavBar.module.css';
import fetchData from "../../../utils/httpAction";
import {useRouter} from "next/router";

const MatchListNavBar = () =>{

    const router = useRouter();
    const {sport_id='', tournament_id='', match_id='', market_id='', tab} = router.query;

    const [sideBarData,setSideBarData] = React.useState([]);

    const getSearchParams = () =>{
        if(!sport_id && !tournament_id){
            return `/-1`
        }else if(sport_id && tournament_id){
            return `/${sport_id}/${tournament_id}/`
        }else if(sport_id){
            return `/${sport_id}`
        }
    }

    const selectMatch = (data) =>{
        if(data?.match_id){
            if(match_id !== data?.match_id){
                router.push({
                    pathname: '/game',
                    query: {sport_id : data?.sport_id, tournament_id : data?.tournament_id, match_id : data?.match_id},
                });
            }
        }else{
           router.push({
               pathname: router.pathname,
               query: {sport_id : data?.sport_id, tournament_id : data?.tournament_id, match_id : data?.match_id},
           });
       }
    };

    const goBack = () =>{
        if(match_id){
            router.push({
                pathname: '/listing',
                query: {sport_id : sport_id, tournament_id : tournament_id},
            });
        }else if(sport_id && tournament_id ){
            router.push({
                pathname: '/listing',
                query: {sport_id : sport_id},
            });
        }else if(sport_id ){
            router.push({
                pathname: '/listing',
                query: {},
            });
        }
    }

    const getSideBarData = async (id) =>{
        let token = JSON.parse(localStorage.getItem('token'));
        try {
            // setLoader((preState)=>({...preState, eventListing : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/common/getSiderBar', payload: {token, searchParams : getSearchParams()}});
            if(res?.statusCode === 200){
                setSideBarData(()=>Object.values(res)?.filter((item)=> typeof item === 'object'));
            }
            // setLoader((preState)=>({...preState, eventListing : false}));
        }catch (e) {
            console.log("something wrong",e);
            // setLoader((preState)=>({...preState, eventListing : false}));
        }
    };

    React.useEffect(()=>{
        getSideBarData();
    },[sport_id,tournament_id,tab])

    return(
        <div className={styles.mainContainer}>
            <div className={styles.title}> Sports </div>
            {/*<div className={styles.titleBox}>*/}
            {/*    <i className='fa-solid fa-house'/>*/}
            {/*    <span> Sports</span>*/}
            {/*</div>*/}
            <div className={styles.titleBox} onClick={()=> goBack()}>
                <i className='fa fa-angle-left'/>
                <span>Previous</span>
            </div>

            <div className={styles.matchListBox}>
                {sideBarData?.map((item,index)=>(
                    <div className={styles.matchInfoBox} key={index} onClick={()=>selectMatch({sport_id:item?.sport_id, tournament_id : item?.tournament_id, match_id : item?.match_id ?? ''})}>
                        <div>{item?.tournament_name || item?.match_name}</div>
                        <div><i className='fa-solid fa-chevron-right small-icon' style={{ fontSize: '0.85rem' }} /></div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default MatchListNavBar;