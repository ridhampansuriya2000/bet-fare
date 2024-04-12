import React from 'react';
import BackwardNavBar from "../BackwardNavBar";
import TextField from "../../view/TextField";
import Button from "../../view/Button";
import Select from "../../view/Select";
import styles from './MyTransactionsPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchAccountStatementDetails,
    fetchDepositDetails,
    fetchWithdrawalsDetails
} from "../../../store/action/financeAction";
import Table from "../Table";
import {convertToFirstLetterTitleCase, getYYYYMMDDDate, YYYYMMDDtoDDMMYYYY} from "../../../utils/helperFunctions";
import {useRouter} from "next/router";

const AccountInfo = ({data}) => {
    return (
        <div className={styles.accountInfoBox}>
            <div><span className={styles.infoLable}>Account Name:</span><span>{data?.account_name}</span></div>
            <div><span className={styles.infoLable}>Account No.:</span><span>{data?.account_number}</span></div>
            <div><span className={styles.infoLable}>IFSC Code:</span><span>{data?.ifsc_code}</span></div>
            <div><span className={styles.infoLable}>Transfer Type:</span><span>{data?.transfer_type}</span></div>
            <div><span className={styles.infoLable}>Bank Name:</span><span>{data?.bank_name}</span></div>
        </div>
    )
};

const MyTransactionsPage = ({type='',hidefilter=false}) =>{

    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = router.query;
    const {depositDetails, withdrawalsDetails, transactions,error} = useSelector((state)=>({
        depositDetails : state?.finance?.depositDetails,
        withdrawalsDetails : state?.finance?.withdrawalsDetails,
        transactions : state?.finance?.accountStatementDetails?.transactions,
        error : state?.finance?.error,
    }));

    const [searchDate,setSearchDate] = React.useState({from : getYYYYMMDDDate({beforeDay:15}), to : getYYYYMMDDDate()});
    const stateHandler = (e) =>{
        let {value, name} = e.target;
        setSearchDate((preState)=>({
            ...preState,
            [name] : value
        }));
    };

    const handleFilter = () =>{
        type === 'deposit' ?
            dispatch(fetchDepositDetails(`?from=${YYYYMMDDtoDDMMYYYY(searchDate?.from)}&to=${YYYYMMDDtoDDMMYYYY(searchDate?.to)}`))
            : dispatch(fetchWithdrawalsDetails(`?from=${YYYYMMDDtoDDMMYYYY(searchDate?.from)}&to=${YYYYMMDDtoDDMMYYYY(searchDate?.to)}`));
    }

    React.useEffect(()=>{
       if(type === 'deposit') dispatch(fetchDepositDetails(`?from=${YYYYMMDDtoDDMMYYYY(searchDate?.from)}&to=${YYYYMMDDtoDDMMYYYY(searchDate?.to)}`));
       else if(type === 'withdrawals')dispatch(fetchWithdrawalsDetails(`?from=${YYYYMMDDtoDDMMYYYY(searchDate?.from)}&to=${YYYYMMDDtoDDMMYYYY(searchDate?.to)}`))
       else if(type === 'accountStatement' && searchParams)dispatch(fetchAccountStatementDetails(searchParams))
    },[searchParams]);

    const getStatus = (data,statusType) =>{
        let status = '-';
        let transaction_status = "";
        if (data.is_approved == '0' && data.is_rejected == '0') {
            status = "Accepted and points deducted";
            transaction_status = "Accepted and points deducted";
        } else if (data.is_approved == '1' && data.is_rejected == '0') {
            status = transaction_status= 'Approved';
        } else if (data.is_approved == '0' && data.is_rejected == '1') {
            status = "Rejected";
            transaction_status = "Rejected and points reversed to account";
            if(!empty(data.withdrawal_note)){
                status = <br><span className='text-danger'>data?.withdrawal_note.</span></br>;
            }
        }
        return{status, transaction_status};
    }

    const column = type === 'deposit' ? [
        {fieldName : 'amount', title : 'Amount', cellStyle:{},render:(rowData,data)=><>{data || '-'}</>},
        {fieldName : 'transaction_id', title : 'Transaction id',render:(rowData,data)=><>{data || '-'}</>},
        {fieldName : 'payment_mode', title : 'Payment Mode',render:(rowData,data)=><>{data || '-'}</>},
        {fieldName : 'datetime', title : 'Request Placed Time', render:(rowData,data)=><>{data || '-'}</>},
        {fieldName : 'approve_reject_datetime', title : 'Approved/Rejected Time', render:(rowData,data)=><>{data || '-'}</>},
        {fieldName : 'promocode', title : 'Promocode', render:(rowData,data)=><>{data || '-'}</>},
        {fieldName : 'payment_status', title : 'Status', render:(rowData,data)=><>{convertToFirstLetterTitleCase(data)}</>},
    ]
        : type === 'withdrawals'
        ? [
            {fieldName : 'amount', title : 'Amount', cellStyle:{},render:(rowData,data)=><>{data || '-'}</>},
            {fieldName : 'transfer_type', title : 'Transfer Type',render:(rowData,data)=><>{data || '-'}</>},
            {fieldName : 'transfer_mode', title : 'Mode',render:(rowData,data)=><>{data || '-'}</>},
            {fieldName : 'account_number', title : 'Acount Details',render:(rowData,data)=>(<AccountInfo data={rowData}/>)},
            {fieldName : 'is_approved', title : 'Approved',render:(rowData,data)=><>{getStatus(rowData)?.status}</>},
            {fieldName : 'withdrawl_status', title : 'Transaction Status',render:(rowData,data)=><>{getStatus(rowData)?.status}</>},
            {fieldName : 'created_at', title : 'Request Placed Time',render:(rowData,data)=><>{data || '-'}</>},
            {fieldName : 'approve_reject_datetime', title : 'Approved/Rejected Time',render:(rowData,data)=><>{data || '-'}</>},
        ]
        : type === 'accountStatement'
        ? [
            {fieldName : 'amount', title : 'Placed', cellStyle:{},render:(rowData,data)=><>{data || '-'}</>},
            {fieldName : 'game', title : 'Event',render:(rowData,data)=><>{data || '-'}</>},
            {fieldName : 'selection_name', title : 'Selection',render:(rowData,data)=><>{data || '-'}</>},
            {fieldName : 'betId', title : 'Bet ID',render:(rowData,data)=><>{data || '-'}</>},
            {fieldName : 'type', title : 'Type',render:(rowData,data)=><>{data || '-'}</>},
            {fieldName : 'odds', title : 'Odds',render:(rowData,data)=><>{data || '-'}</>},
            {fieldName : 'winner', title : 'Winner',render:(rowData,data)=><>{data || '-'}</>},
            {fieldName : 'stake', title : 'Stake',render:(rowData,data)=><>{data || '-'}</>},
            {fieldName : 'profit_loss', title : 'Profit/Loss',render:(rowData,data)=><span className={`${parseInt(data) >= 0 ? styles.successText : styles.errorText}`}>{data || '-'}</span>},
            {fieldName : 'status', title : 'Status',render:(rowData,data)=><span className={`${data === 'WIN' ? styles.successText : styles.errorText}`}>{data || '-'}</span>},
        ]
        : null;

    const getRowData = React.useMemo(()=>{
        switch (type) {
            case 'deposit': return Array.isArray(depositDetails) ? depositDetails : [];
            case 'withdrawals': return Array.isArray(withdrawalsDetails) ? withdrawalsDetails : [];
            case 'accountStatement': return Array.isArray(transactions) ? transactions : [];
            default: return [];
        }
    },[depositDetails,withdrawalsDetails,transactions]);

    return(
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={convertToFirstLetterTitleCase(type)} maxWidth={1200}/>
            <div className={styles.innerContainer}>

               {!hidefilter && <section>
                    <div className={`row`}>
                        <div className={`col col-md-3 col-xs-12`}>
                            <div className={styles.inputBox}>
                                <TextField
                                    label='Start Date'
                                    name='from'
                                    type='date'
                                    value={searchDate?.from}
                                    onChange={stateHandler}
                                />
                            </div>
                        </div>
                        <div className={`col col-md-3 col-xs-12`}>
                            <div className={styles.inputBox}>
                                <TextField
                                    label='End Date'
                                    name='to'
                                    type='date'
                                    min={searchDate?.from}
                                    max={getYYYYMMDDDate(new Date())}
                                    value={searchDate?.to}
                                    onChange={stateHandler}
                                />
                            </div>
                        </div>

                        <div className={`col col-md-3 col-xs-12`}>
                            <div className={styles.inputBox}>
                                <Button className={styles.submitBtn} onClick={handleFilter}>Search</Button>
                            </div>
                        </div>
                    </div>
                    <div className={`col ${styles.errorText}`}>{error}</div>
                </section>}

                <section>
                    <div className={styles.tableBox}>
                        <Table
                            column={column}
                            rows={getRowData}
                            greenNote=''
                            fontSize={13}
                        />
                    </div>
                </section>
            </div>
        </div>
    )
};

export default MyTransactionsPage;