import {
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE, LOADER_START, LOADER_STOP
} from "../types";
import cookie from 'js-cookie';
import fetchData from "../../utils/httpAction";


export const loginUser = (credentials,router) => async dispatch => {
    dispatch({type : LOGIN_REQUEST});
    dispatch({type : LOADER_START});
    try {
        let res =  await fetchData({method : 'POST', endPoint:'/api/auth/login', payload:credentials });
        if(res.status === 'Success'){
            localStorage.setItem('userDetails',JSON.stringify(res?.data));
            localStorage.setItem('token',JSON.stringify(res?.data?.token));
            cookie.set('token', res?.data?.token, { expires: 1 }); // Expires in 1 day
            localStorage.setItem('isLogin',JSON.stringify(true));
            dispatch({
                type : LOGIN_SUCCESS,
                payload: {data : res.data, isLogin : true}
            });
            router.push('/');
        }else{
            dispatch({type : LOGIN_FAILURE, payload : res?.message});
            // setDisabled(false);
        }
    }catch (e) {
        dispatch({type : LOGIN_FAILURE});
    }finally {
        dispatch({type : LOADER_STOP});
    }

};

export const forgotPassword = (payload,router) => async dispatch => {
    dispatch({type : FORGOT_PASSWORD_REQUEST});
    dispatch({type : LOADER_START});
    try {
        let res =  await fetchData({method : 'POST', endPoint:'/api/auth/forgot-password', payload:{payload} });
        if(res.status === 'Success'){
            dispatch({
                type : FORGOT_PASSWORD_SUCCESS,
                payload: {data : res.data}
            });
            return res;
        }else{
            dispatch({type : FORGOT_PASSWORD_FAILURE, payload : typeof res?.message === 'object' ? res?.message : {phone_number : res?.message}});
            return res;
        }
    }catch (e) {
        dispatch({type : FORGOT_PASSWORD_FAILURE});
        return e;
    }finally {
        dispatch({type : LOADER_STOP});
    }

};

export const verifyOTP = (payload,router) => async dispatch => {
    dispatch({type : VERIFY_OTP_REQUEST});
    dispatch({type : LOADER_START});
    try {
        let res =  await fetchData({method : 'POST', endPoint:'/api/auth/verify-forgot-password-otp', payload:{payload} });
        if(res.status === 'Success'){
            dispatch({
                type : VERIFY_OTP_SUCCESS,
                payload: {data : res}
            });
            router.push('/login');
            return res;
        }else{
            dispatch({type : VERIFY_OTP_FAILURE, payload : typeof res?.message === 'object' ? res?.message : {forgot_password_otp : res?.message}});
            // setDisabled(false);
            return res;
        }
    }catch (e) {
        dispatch({type : VERIFY_OTP_FAILURE});
        return e;
    }finally {
        dispatch({type : LOADER_STOP});
    }

};

export const signupUser = (credentials,router) => async dispatch => {
    dispatch({type : SIGNUP_REQUEST});
    dispatch({type : LOADER_START});
    try {
        let res =  await fetchData({method : 'POST', endPoint:'/api/auth/registration', payload:credentials });
        if(res?.statusCode === 200) {
            localStorage.setItem('token',JSON.stringify(res?.data?.token));
            // router.push('/login');
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: {data: res.data, isLogin: true}
            });
        }else {
            dispatch({
                type : SIGNUP_FAILURE,
                payload: res?.message
            });
        }
        return res;
    }catch (e) {
        dispatch({type : SIGNUP_FAILURE});
    }finally {
        dispatch({type : LOADER_STOP});
    }

};

export const logOutUser = (credentials,router) => async dispatch => {
    dispatch({type : LOADER_START});
    dispatch({type : LOGOUT_REQUEST});
    try {
        // let res =  await fetchData({method : 'POST', endPoint:'/api/auth/login', payload:credentials });
        localStorage.clear();
        // cookie.clear('token', res?.data?.token, { expires: 1 }); // Expires in 1 day
        dispatch({
            type : LOGOUT_SUCCESS,
            payload: {data : {}, isLogin : false}
        });
        router.push('/');
        dispatch({type : LOGOUT_FAILURE});
    }catch (e) {
        dispatch({type : LOGIN_FAILURE});
    }finally {
        dispatch({type : LOADER_STOP});
    }

};