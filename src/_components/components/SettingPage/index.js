import React from 'react';


import styles from './SettingPage.module.css';
import Stakes from "../Stakes";
import Switch from "../../view/Switch";
import BackwardNavBar from "../BackwardNavBar";
import fetchData from "../../../utils/httpAction";

const SettingPage = () => {

    const [stakeDetails,setStakeDetails] = React.useState({});
    const [loader,setLoader] = React.useState({stakeDetails : false});
    const [isDisabled,setIsDisabled] = React.useState(true);

    const getStakeDetails = async () =>{
        let token = JSON.parse(localStorage.getItem('token'));
        try{
            setLoader((preState)=>({...preState, stakeDetails : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/bet-setting', payload: {token}});
            if(res?.statusCode === 200){
                setStakeDetails(res);
            }
            setLoader((preState)=>({...preState, stakeDetails : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, stakeDetails : false}));
        }
    };

    const updateStakeOptions = async (stakes) =>{
        let token = JSON.parse(localStorage.getItem('token'));
        let payload = { stake_options : stakes }
        try{
            setLoader((preState)=>({...preState, stakeDetails : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/stake-option-update', payload: {token, payload}});
            if(res?.statusCode === 200){
                getStakeDetails();
            }
            setLoader((preState)=>({...preState, stakeDetails : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, stakeDetails : false}));
        }
    };

    const updateOneClickStakeOptions = async (stakes) =>{
        let token = JSON.parse(localStorage.getItem('token'));
        let payload = {};
        if(Array.isArray(stakes)){
            let newArr = stakes?.map((item)=>({value : item?.amount,position : item?.position}))?.map((item,index)=>({[`oneclick_${index}`]: item}))
            payload = { "save":"amount",...newArr[0],...newArr[1],...newArr[2] }
        }else if(typeof stakes === 'object'){
            payload = stakes;
        }
        try{
            setLoader((preState)=>({...preState, stakeDetails : true}));
            let res =  await fetchData({  method : 'POST', endPoint:'/api/game/one-click-bet', payload: {token, payload}});
            if(res?.statusCode === 200){
                getStakeDetails();
            }
            setLoader((preState)=>({...preState, stakeDetails : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, stakeDetails : false}));
        }
    };

    React.useEffect(()=>{
        getStakeDetails();
    },[])

    return (
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={"Setting"}/>
            <div className={styles.innerContainer}>
                {!loader?.stakeDetails ?
                    <section>
                    <div className={`row`}>
                        <div className={`col col-md-6 col-sm-12`}>
                            <div className={styles.titleBox}>
                                <h4 className={styles.title}>
                                    Edit Stakes
                                </h4>
                                {/*<span><img src="images/edit-icon.svg" alt="Edit Icon"/> <span className={styles.greenText}>Profile</span></span>*/}
                            </div>
                            <Stakes stakeOptions={stakeDetails?.stake_options} onSave={updateStakeOptions}/>
                        </div>
                        <div className={`col col-md-6 col-sm-12`}>
                            <div className={styles.titleBox}>
                                <h4 className={styles.title}>
                                    Edit One Click Stakes
                                </h4>
                                <span>
                                    <Switch checked={!isDisabled} onChange={()=>setIsDisabled((preState)=>!preState)}/>
                                </span>
                            </div>
                            <Stakes stakeOptions={stakeDetails?.one_click_bet_options} disabled={isDisabled} onSave={(stakes)=>{
                                updateOneClickStakeOptions(stakes);
                                console.log('stakes',stakes)
                            }}/>
                        </div>
                    </div>
                </section>
                    : "Loading..."}
            </div>
        </div>
    )
};

export default SettingPage;