import React from 'react';


import styles from './DepositPage.module.css';
import BackwardNavBar from "../BackwardNavBar";
import BankFeaturesCards from "../BankFeaturesCards";
import InfoPoints from "../InfoPoints";
import AmountForm from "../AmountForm";
import {useDispatch, useSelector} from "react-redux";
import {fetchDepositMethod} from "../../../store/action/financeAction";
import fetchData from "../../../utils/httpAction";
import {useRouter} from "next/router";
import {convertToTitleCase} from "../../../utils/helperFunctions";
import {LOADER_START, LOADER_STOP} from "../../../store/types";

const listCard = [
    {src: 'images/bank-icon.svg', contentInfo: 'Bank Transfers', paymentType : 'bank_transfers'},
    {src: 'images/payment-gateway.svg', contentInfo: 'Payment Gateway (UPI/Payment Wallet)', paymentType : 'wallet'},
    {src: 'images/crypto.svg', contentInfo: 'Crypto Transfer', paymentType : 'wallet'},
    {src: 'images/astropay.svg', contentInfo: 'Astropay', paymentType : 'wallet'},
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

const reStructureDepositMethods = (methods) =>{
    const getImgLogo = (type) =>{
        switch (type) {
            case 'bank_transfers' : return  'images/bank-icon.svg';
            case 'paytm' : return  'images/payment-gateway.svg';
            case 'gpay' : return  'images/crypto.svg';
            case 'phone_pe' : return  'images/astropay.svg';
            case 'upi' : return  'images/astropay.svg';
            default : return 'images/bank-icon.svg'
        }
    }
        return methods?.map((item)=>({
            ...item,
            contentInfo : convertToTitleCase(item?.type),
            src : getImgLogo(item?.type)
        }))
}

const DepositPage = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const {depositMethods,user,  balance} = useSelector((state)=>({
        depositMethods : state?.finance?.depositMethods,
        user : state?.auth?.data?.user,
        balance : state.common.balance,
    }));

    const [deposit,setDeposit] = React.useState({
        values : {
            "wallet_amount" : 0,
            "reference_id": '',
            "username" : user?.username
        },
        errors:{}
        });

    const [paymentType, setPaymentType] = React.useState('');

    const stateHandler = (e) =>{
        let {name,value} = e.target;
        setDeposit((preState)=>({
            ...preState,
            values:{...preState.values, [name] : value},
            errors:{...preState.errors, [name] : ''}
        }))
    }

    const [loader, setLoader] = React.useState({
        deposit: false,
    });


    React.useEffect(()=>{
        dispatch(fetchDepositMethod());
    },[]);

    React.useEffect(()=>{
        setDeposit((preState)=>({
            ...preState,
            values : {...Object.values(depositMethods)?.find((item)=> item?.type === paymentType), username:user?.username}
        }))
    },[depositMethods,paymentType])

    const makeOfflineDeposit = async (e) =>{
        let token = JSON.parse(localStorage.getItem('token'));
        let payload =paymentType === 'bank_transfers' ? {
            "bank_amount" : deposit?.values?.bank_amount,
            "reference_id": deposit?.values?.reference_id,
            "username" : deposit?.values?.username,
            "transfer_via" : deposit?.values?.transfer_via,
            "payment_type": paymentType
        } :
            {
                "wallet_amount" : deposit?.values?.wallet_amount,
                "reference_id": deposit?.values?.reference_id,
                "username" : deposit?.values?.username,
            }
        dispatch({type : LOADER_START});
        setLoader((preState)=>({...preState, deposit : true}));
        try{
            let res =  await fetchData({  method : 'POST', endPoint:'/api/finance/offline-deposit', payload: {payload, token}});
            if(res?.statusCode === 200){
                e.target.reset();
               router.push('/my-deposits');
            }else if(res?.statusCode === 400){
                setDeposit((preState)=>({
                    ...preState,
                    errors:{ ...preState.errors,...res?.message}
                }))
            }
            setLoader((preState)=>({...preState, deposit : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, deposit : false}));
        }finally {
            dispatch({type : LOADER_STOP,});
        }
    };

    const applyPromocode = async () =>{
        let token = JSON.parse(localStorage.getItem('token'));
        let payload = { promocode : ''}
        setLoader((preState)=>({...preState, deposit : true}));
        try{
            let res =  await fetchData({  method : 'POST', endPoint:'/api/finance/verify-promocode', payload: {payload, token}});
            if(res?.statusCode === 200){
                // router.push('/my-deposits')
            }else if(res?.statusCode === 400){
                setDeposit((preState)=>({
                    ...preState,
                    errors:{ ...preState.errors, promocode:  res?.message}
                }))
            }
            setLoader((preState)=>({...preState, deposit : false}));
        }catch (e) {
            setLoader((preState)=>({...preState, deposit : false}));
        }
    };


    return (
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={"Choose Deposit Method"}
                            // endContent={<div className={styles.reference}>Ref & earn</div>}
            />
            <div className={styles.innerContainer}>
                <section className={styles.BankFeaturesSection}>
                    <BankFeaturesCards selectFeatures={(data)=>setPaymentType(data?.type)} data={reStructureDepositMethods(Object.values(depositMethods)?.filter((item) => typeof item === 'object'))}/>
                </section>

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
                    {/*<div className={styles.balanceInfoBox}>*/}
                    {/*    <img src="images/wallet-1.svg" alt="Current Balance"/>*/}
                    {/*    <span>*/}
                    {/*        available withdrawal:</span>*/}
                    {/*    <span className="amount">*/}
                    {/*        <i className="fa-solid fa-indian-rupee-sign"/>*/}
                    {/*        <span>0*/}
                    {/*        </span>*/}
                    {/*    </span>*/}
                    {/*</div>*/}
                </section>

                <section className={styles.amountFromSection}>
                    {paymentType && <AmountForm stateHandler={stateHandler} deposit={deposit} onSubmit={makeOfflineDeposit} paymentType={paymentType} applyPromocode={applyPromocode}/>}
                </section>

                {/*<section className={styles.infoPointSection}>*/}
                {/*    Please Note :*/}
                {/*    <InfoPoints data={infoPoints}/>*/}
                {/*</section>*/}

            </div>
        </div>
    )
};

export default DepositPage;