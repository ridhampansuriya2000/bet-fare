import {
    FETCH_DEPOSIT_METHOD_SUCCESS,
    FETCH_DEPOSIT_METHOD_REQUEST,
    FETCH_DEPOSIT_METHOD_FAILURE,
    FETCH_DEPOSIT_DETAILS_REQUEST,
    FETCH_DEPOSIT_DETAILS_SUCCESS,
    FETCH_DEPOSIT_DETAILS_FAILURE,
    FETCH_WITHDRAWALS_DETAILS_REQUEST,
    FETCH_WITHDRAWALS_DETAILS_SUCCESS,
    FETCH_WITHDRAWALS_DETAILS_FAILURE,
    FETCH_TRANSACTIONS_DETAILS_REQUEST,
    FETCH_TRANSACTIONS_DETAILS_SUCCESS,
    FETCH_TRANSACTIONS_DETAILS_FAILURE,
    FETCH_PL_TRANSACTIONS_DETAILS_REQUEST,
    FETCH_PL_TRANSACTIONS_DETAILS_SUCCESS,
    FETCH_PL_TRANSACTIONS_DETAILS_FAILURE,
    FETCH_ACCOUNT_STATEMENT_DETAILS_REQUEST,
    FETCH_ACCOUNT_STATEMENT_DETAILS_SUCCESS,
    FETCH_ACCOUNT_STATEMENT_DETAILS_FAILURE, LOADER_START, LOADER_STOP,
} from "../types";
import fetchData from "../../utils/httpAction";
import {groupByKey} from "../../utils/helperFunctions";

export const fetchDepositMethod = () => async dispatch => {
    let token = JSON.parse(localStorage.getItem('token'));
    dispatch({type : FETCH_DEPOSIT_METHOD_REQUEST});
    try {
        let res =  await fetchData({method : 'POST', endPoint:'/api/finance/deposit-method', payload:{token} });
        if(res?.statusCode === 200){
            dispatch({
                type : FETCH_DEPOSIT_METHOD_SUCCESS,
                payload: res
            });
        }else{
        }
    }catch (e) {
        dispatch({type : FETCH_DEPOSIT_METHOD_FAILURE});
    }

};

export const fetchDepositDetails = (searchParams) => async dispatch => {
    let token = JSON.parse(localStorage.getItem('token'));
    dispatch({type : FETCH_DEPOSIT_DETAILS_REQUEST});
    dispatch({type : LOADER_START});
    try {
        let res =  await fetchData({method : 'POST', endPoint:'/api/finance/my-deposits', payload:{token, searchParams} });
        if(res?.statusCode === 200){
            dispatch({
                type : FETCH_DEPOSIT_DETAILS_SUCCESS,
                payload: res?.[0]?.my_payments
            });
        }else{
            dispatch({type : FETCH_DEPOSIT_DETAILS_FAILURE, payload : res?.[0]});
        }
    }catch (e) {
        dispatch({type : FETCH_DEPOSIT_DETAILS_FAILURE});
    }finally {
        dispatch({type : LOADER_STOP});
    }

};

export const fetchWithdrawalsDetails = (searchParams) => async dispatch => {
    let token = JSON.parse(localStorage.getItem('token'));
    dispatch({type : FETCH_WITHDRAWALS_DETAILS_REQUEST});
    dispatch({type : LOADER_START});
    try {
        let res =  await fetchData({method : 'POST', endPoint:'/api/finance/my-withdrawls', payload:{token, searchParams} });
        if(res?.statusCode === 200){
            dispatch({
                type : FETCH_WITHDRAWALS_DETAILS_SUCCESS,
                payload: res?.[0]?.data
            });
        }else{
            dispatch({type : FETCH_WITHDRAWALS_DETAILS_FAILURE, payload : res?.[0]});
        }
    }catch (e) {
        dispatch({type : FETCH_WITHDRAWALS_DETAILS_FAILURE});
    }finally {
        dispatch({type : LOADER_STOP});
    }

};

export const fetchTransectionsDetails = (searchParams) => async dispatch => {
    let token = JSON.parse(localStorage.getItem('token'));
    dispatch({type : FETCH_TRANSACTIONS_DETAILS_REQUEST});
    dispatch({type : LOADER_START});
    try {
        let res =  await fetchData({method : 'POST', endPoint:'/api/finance/transfer-statement', payload:{token, searchParams} });
        if(res?.statusCode === 200){
            dispatch({
                type : FETCH_TRANSACTIONS_DETAILS_SUCCESS,
                // payload: res?.[0]?.statement
                payload: groupByKey({array : res?.[0]?.statement, key:"created_date"})
            });
        }else{
            dispatch({type : FETCH_TRANSACTIONS_DETAILS_FAILURE, payload : res?.[0]?.error});
        }
    }catch (e) {
        dispatch({type : FETCH_TRANSACTIONS_DETAILS_FAILURE});
    }finally {
        dispatch({type : LOADER_STOP});
    }

};


export const fetchProLossTransectionsDetails = (searchParams) => async dispatch => {
    let token = JSON.parse(localStorage.getItem('token'));
    dispatch({type : FETCH_PL_TRANSACTIONS_DETAILS_REQUEST});
    dispatch({type : LOADER_START});
    try {
        let res =  await fetchData({method : 'POST', endPoint:'/api/finance/account-statement', payload:{token, searchParams} });
        if(res?.statusCode === 200){
            dispatch({
                type : FETCH_PL_TRANSACTIONS_DETAILS_SUCCESS,
                // payload: Object.values(res?.[0]?.final_array?.report_data || {})?.map((item)=> item?.[0])
                payload: Object.values(res?.[0]?.final_array?.report_data || {})?.map((item)=> item)
            });
        }else{
            dispatch({type : FETCH_PL_TRANSACTIONS_DETAILS_FAILURE, payload : res?.[0]?.error});
        }
    }catch (e) {
        dispatch({type : FETCH_PL_TRANSACTIONS_DETAILS_FAILURE});
    }finally {
        dispatch({type : LOADER_STOP});
    }

};

export const fetchAccountStatementDetails = (searchParams) => async dispatch => {
    let token = JSON.parse(localStorage.getItem('token'));
    dispatch({type : FETCH_ACCOUNT_STATEMENT_DETAILS_REQUEST});
    dispatch({type : LOADER_START});
    try {
        let res =  await fetchData({method : 'POST', endPoint:'/api/finance/account-statement-detail', payload:{token, searchParams} });
        if(res?.statusCode === 200){
            dispatch({
                type : FETCH_ACCOUNT_STATEMENT_DETAILS_SUCCESS,
                payload: res?.[0]?.return_array
            });
        }else{
            dispatch({type : FETCH_ACCOUNT_STATEMENT_DETAILS_FAILURE, payload : res?.[0]?.error, toaster:{toasterMessage:'Something wants wrong!',toasterType: 'error'}});
        }
    }catch (e) {
        dispatch({type : FETCH_ACCOUNT_STATEMENT_DETAILS_FAILURE});
    }finally {
        dispatch({type : LOADER_STOP});
    }

};
