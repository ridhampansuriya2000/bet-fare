import {
    FETCH_BALANCE_FAILURE,
    FETCH_BALANCE_REQUEST,
    FETCH_BALANCE_SUCCESS,
    FETCH_SEARCH_FAILURE,
    FETCH_SEARCH_REQUEST,
    FETCH_SEARCH_SUCCESS, LOADER_START, LOADER_STOP
} from "../types";
import fetchData from "../../utils/httpAction";


export const fetchBalance = () => async dispatch => {
    let token = JSON.parse(localStorage.getItem('token'));
    dispatch({type : FETCH_BALANCE_REQUEST});
    try {
        let res =  await fetchData({method : 'POST', endPoint:'/api/common/fetch-balance', payload:{token} });
        if(res?.statusCode === 200){
           await dispatch({
                type : FETCH_BALANCE_SUCCESS,
                payload: res
            });
        }else{
            // setDisabled(false);
        }
    }catch (e) {
        dispatch({type : FETCH_BALANCE_FAILURE});
    }

};

export const searchEvent = (payload) => async dispatch => {
    let token = JSON.parse(localStorage.getItem('token'));
    dispatch({type : FETCH_SEARCH_REQUEST});
    dispatch({type : LOADER_START});
    try {
        let res =  await fetchData({method : 'POST', endPoint:'/api/common/search-events', payload:{token, payload} });
        if(res?.statusCode === 200){
            dispatch({
                type : FETCH_SEARCH_SUCCESS,
                payload: res
            });
        }else{
            // setDisabled(false);
        }
    }catch (e) {
        dispatch({type : FETCH_SEARCH_FAILURE});
    }finally {
        dispatch({type : LOADER_STOP});
    }

};