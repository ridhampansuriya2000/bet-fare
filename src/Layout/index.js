import React from 'react';
import { useRouter } from "next/router";
import TopHead from "./TopHead";
import MainHeader from "./MainHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from './Layout.module.css';
import Centered from "./Centered";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_SUCCESS, REFREASH_LOGIN, RESET_USER_DETAILS_SUCCESS} from "../store/types";
import NoticeBar from "./NoticeBar";
import {fetchBalance} from "../store/action/commonAction";
import Tools from "./Tools/Tools";
import {disconnectSocket, emitToSocket, initiateSocket, subscribeToSocket} from "../Socket/socket";
import {appInfoPath} from "../utils/static";

const publicRoutes = [
    "/login",
    "/signup",
    '/forgotpassword',
];

const Layout = ({ children, notificationData }) =>{

    let { isLogin, user, user_id, gateway_token } = useSelector((state)=>({
        isLogin : state.auth.isLogin,
        user : state.auth.data?.user,
        gateway_token : state.auth.data?.gateway_token,
        user_id : state.auth.data?.user_id,
    }));

    // let isLogin = ''

    const dispatch = useDispatch();

    const router = useRouter();
    let { pathname } = { ...router };
    let token = '';
    let userDetails = '';
    React.useEffect(() => {
        // Check if localStorage is available (in the browser)
        if (typeof window !== 'undefined') {
            // Access localStorage
            token = localStorage.getItem('token');
            userDetails = localStorage.getItem('userDetails');
            dispatch({type : REFREASH_LOGIN, payload :  JSON.parse(localStorage.getItem('token')) ? true : false})
            dispatch({type : RESET_USER_DETAILS_SUCCESS, payload :  { data : JSON.parse(localStorage.getItem('userDetails')) , isLogin : JSON.parse(localStorage.getItem('token')) ? true : false}})

        }
    }, []);

    React.useEffect(() => {
        if (!token && ![...publicRoutes,'/'].includes(pathname)) {
            router.push('/login');
        }
        if (token && publicRoutes.includes(pathname)) {
            router.back();
        }
    }, [token]);

    React.useEffect(()=>{
        if(!['/login','/signup',"/forgotpassword"].includes(pathname))
            if(isLogin) {
                dispatch(fetchBalance());
            }
    },[pathname,isLogin]);

    // React.useEffect( ()=>{
    //     if(gateway_token && user_id){
    //         initiateSocket({gateway_token,user_id});
    //     }
    //     // Clean up socket connection when component unmounts
    //     return () => {
    //         disconnectSocket();
    //     };
    // },[gateway_token,user_id,token]);
    //
    // React.useEffect(()=>{
    //     if(isLogin){
    //         emitToSocket({
    //             // eventName:`event_scores`,
    //             eventName:`user_events_${user_id}`,
    //             roomtype:'public'
    //         })
    //         subscribeToSocket({
    //             eventName:`user_events_${user_id}`,
    //             cb:data => dispatch(fetchBalance()),
    //         });
    //     }
    // },[isLogin,gateway_token,user_id]);

    if(['/login','/signup','/forgotpassword'].includes(pathname)) {
        return (
            <Centered>
                <Tools />
                {children}
            </Centered>
        )
    }else if(appInfoPath?.map((item)=> item.path)?.includes(pathname)){
        return (
            <div className={styles.mainContainer}>
                {children}
                <Footer />
                <Tools/>
            </div>
        )
    }
    else return(
        <div className={styles.mainContainer}>
            <TopHead/>
            <MainHeader isLogin={isLogin} userDetails={user}/>
            {isLogin && <NoticeBar />}
            <Navbar/>
            {children}
            <Footer />
            <Tools/>
        </div>
    )
};

export default Layout;