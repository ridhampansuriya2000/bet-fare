import {
    FETCH_MY_BETS_DETAILS_REQUEST,
    FETCH_MY_BETS_DETAILS_SUCCESS,
    FETCH_MY_BETS_DETAILS_FAILURE,
    FETCH_MATCHED_DETAILS_REQUEST,
    FETCH_MATCHED_DETAILS_SUCCESS,
    FETCH_MATCHED_DETAILS_FAILURE,
    FETCH_UNMATCHED_DETAILS_REQUEST,
    FETCH_UNMATCHED_DETAILS_SUCCESS,
    FETCH_UNMATCHED_DETAILS_FAILURE,
    FETCH_SCORE_BY_MARKET_REQUEST,
    FETCH_SCORE_BY_MARKET_SUCCESS,
    FETCH_SCORE_BY_MARKET_FAILURE,
} from "../types";
import fetchData from "../../utils/httpAction";
import {groupByKey} from "../../utils/helperFunctions";

export const fetchMyBetsDetails = (searchParams) => async dispatch => {
    let token = JSON.parse(localStorage.getItem('token'));
    dispatch({type : FETCH_MY_BETS_DETAILS_REQUEST});
    try {
        let res =  await fetchData({method : 'POST', endPoint:'/api/game/my-bets', payload:{token, searchParams} });
        if(res?.statusCode === 200){
            dispatch({
                type : FETCH_MY_BETS_DETAILS_SUCCESS,
                payload: res?.[0]?.data
            });
        }else{
            dispatch({type : FETCH_MY_BETS_DETAILS_FAILURE, payload : res?.[0]?.error});
        }
    }catch (e) {
        dispatch({type : FETCH_MY_BETS_DETAILS_FAILURE});
    }

};

export const fetchMatchedDetails = () => async dispatch => {
    let token = JSON.parse(localStorage.getItem('token'));
    dispatch({type : FETCH_MATCHED_DETAILS_REQUEST});
    try {
        let res =  await fetchData({  method : 'POST', endPoint:'/api/game/matched-bet', payload: {token}});
        if(res?.statusCode === 200){
            dispatch({
                type : FETCH_MATCHED_DETAILS_SUCCESS,
                payload: res
            });
        }else{
            dispatch({type : FETCH_MATCHED_DETAILS_FAILURE, payload : res?.[0]?.error || res?.messsage});
        }
    }catch (e) {
        dispatch({type : FETCH_MATCHED_DETAILS_FAILURE});
    }

};

export const fetchUnMatchedDetails = () => async dispatch => {
    let token = JSON.parse(localStorage.getItem('token'));
    dispatch({type : FETCH_UNMATCHED_DETAILS_REQUEST});
    try {
        let res =  await fetchData({  method : 'POST', endPoint:'/api/game/unmatched-bet', payload: {token}});
        if(res?.statusCode === 200){
            dispatch({
                type : FETCH_UNMATCHED_DETAILS_SUCCESS,
                payload: res
            });
        }else{
            dispatch({type : FETCH_UNMATCHED_DETAILS_FAILURE, payload : res?.[0]?.error || res?.messsage});
        }
    }catch (e) {
        dispatch({type : FETCH_UNMATCHED_DETAILS_FAILURE});
    }

};

export const fetchScoreByMarket = (payload) => async dispatch => {
    let token = JSON.parse(localStorage.getItem('token'));
    dispatch({type : FETCH_SCORE_BY_MARKET_REQUEST});
    try {
        let res =  await fetchData({  method : 'POST', endPoint:'/api/game/scores-by-market', payload: {token,payload}});
        if(res?.statusCode === 200){
            dispatch({
                type : FETCH_SCORE_BY_MARKET_SUCCESS,
                payload: res?.data
            });
        }else{
            dispatch({type : FETCH_SCORE_BY_MARKET_FAILURE, payload : res?.[0]?.error || res?.messsage});
        }
    }catch (e) {
        dispatch({type : FETCH_SCORE_BY_MARKET_FAILURE});
    }

};
