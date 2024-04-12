import React from 'react';


import styles from './BankTransferPage.module.css';
import BackwardNavBar from "../BackwardNavBar";
import FeatureCard from "../FeatureCard";
import BankFeaturesCards from "../BankFeaturesCards";
import InfoPoints from "../InfoPoints";
import WithdrawalAmountForm from "../WithdrawalAmountForm";
import {useDispatch, useSelector} from "react-redux";
import fetchData from "../../../utils/httpAction";
import {useRouter} from "next/router";
import {LOADER_START, LOADER_STOP} from "../../../store/types";

const listCard = [
    {src: 'images/bank-icon.svg', contentInfo: 'Bank Transfers'},
    {src: 'images/instant-withdrawal.svg', contentInfo: 'Payment Gateway'}
];

const infoPoints = [
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
    {point : 'Volutpat donec orci, suscipit sapien pretium. Ornare tincidunt volutpat cursus pellentesque.'},
];

const WithdrawalPage = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const {balance} = useSelector((state)=>({
        balance : state.common.balance,
    }));

    const [withdrawal,setWithdrawal] = React.useState({
        values : {
            "amount": "",
            "transfer_type": "",
            "account_name": "",
            "account_number": "",
            "ifsc_code": "",
            "bank_name": "",
            "bank_branch": "",
        },
        errors:{}
    });

    const stateHandler = (e) =>{
        let {name,value} = e.target;
        setWithdrawal((preState)=>({
            ...preState,
            values:{...preState.values, [name] : value},
            errors:{...preState.errors, [name] : ''}
        }))
    }

    const [loader, setLoader] = React.useState({
        withdrawal: false,
    });

    const withdrawalAmount = async (e) =>{
        let token = JSON.parse(localStorage.getItem('token'));
        let payload = {
            "amount": withdrawal?.values?.amount,
            "transfer_type": withdrawal?.values?.transfer_type,
            "account_name": withdrawal?.values?.account_name,
            "account_number": withdrawal?.values?.account_number,
            "ifsc_code": withdrawal?.values?.ifsc_code,
            "bank_name": withdrawal?.values?.bank_name,
            "bank_branch": withdrawal?.values?.bank_branch,
            transfer_mode: 'Bank'
        };
        dispatch({type : LOADER_START});
        setLoader((preState)=>({...preState, withdrawal : true}));
        try{
            let res =  await fetchData({  method : 'POST', endPoint:'/api/finance/withdraw-amount', payload: {payload, token}});
            if(res?.statusCode === 200){
                e.target.reset();
                setWithdrawal({values:{}, errors:{}})
                router.push('/my-withdrawls')
            }else if(res?.statusCode === 400){
                setWithdrawal((preState)=>({
                    ...preState,
                    errors:{ ...preState.errors,...res?.message}
                }))
            }
            setLoader((preState)=>({...preState, withdrawal : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, withdrawal : false}));
        }finally {
            dispatch({type : LOADER_STOP});
        }
    };


    return (
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={"Choose Deposit Method"}
                            // endContent={<div className={styles.reference}>Ref & earn</div>}
            />
            <div className={styles.innerContainer}>
                {/*<section className={styles.BankFeaturesSection}>*/}
                {/*    <BankFeaturesCards data={listCard}/>*/}
                {/*</section>*/}

                <section className={styles.balanceInfoSection}>
                    <div className={styles.balanceInfoBox}>
                        <img src="images/wallet-1.svg" alt="Current Balance"/>
                        <span>
                            Balance:</span>
                        <span className="amount">
                            <i className="fa-solid fa-indian-rupee-sign"/>
                            <span>{balance?.balance}
                            </span>
                        </span>
                    </div>
                </section>

                <section className={styles.amountFromSection}>
                    <div className={styles.spaceBetween}>
                        <span>Bank details</span>
                        <span className={styles.greenText}>+ Add New</span>
                    </div>
                    <WithdrawalAmountForm withdrawal={withdrawal} stateHandler={stateHandler} onSubmit={withdrawalAmount} loader={loader}/>
                </section>

                <section>
                    <InfoPoints data={infoPoints}/>
                </section>

            </div>
        </div>
    )
};

export default WithdrawalPage;