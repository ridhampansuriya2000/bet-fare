import React from 'react';
import styles from './NoticeBar.module.css';
import fetchData from "../../utils/httpAction";

const NoticeBar = ({}) => {

    const [noticeData,setNoticeData] = React.useState({});

    const getNotification = async (payload) =>{
        let token = JSON.parse(localStorage.getItem('token'));
        try{
            let res =  await fetchData({  method : 'POST', endPoint:`/api/common/get-noticebar-notification`, payload:{token}});
            if(res?.statusCode === 200){
                setNoticeData(res);
            }
        }catch (e) {
            // setLoader((preState)=>({...preState, odds : false}));
        }
    };

    React.useEffect(()=>{
        getNotification();
    },[])
    
    return (
        <>
            {noticeData?.notices?.length &&
            <div className={styles.container}>
            <div className={styles.marqueeNotice} >
                <ul className={styles.marqueeMessageText}>
                    {
                        noticeData?.notices?.map((item,index)=>(
                            <li key={index}>{item?.message}</li>
                        ))
                    }
                </ul>
            </div>
        </div>}
        </>
    )
};

export default NoticeBar;