import React from 'react';


import styles from './AccountStatmentDetailsPage.module.css';
import BackwardNavBar from "../BackwardNavBar";
import Table from "../Table";
import TextField from "../../view/TextField";
import Button from "../../view/Button";
import Select from "../../view/Select";
import {useDispatch, useSelector} from "react-redux";
import {fetchProLossTransectionsDetails} from "../../../store/action/financeAction";
import {
    YYYYMMDDtoDDMMYYYY,
    getYYYYMMDDDate,
    hhmmssTime,
    getYYYYMMDDFromTimestamp
} from "../../../utils/helperFunctions";

const getTransectionType = ({entry_type}) =>{
    switch(entry_type){
        case 'transactions': return 'Betting P&L';
        case 'transfer_out': return 'Withdraw';
        case 'transfer_in': return 'Deposit';
        case 'initial': return 'Account Balance';
        case 'transactions': return 'Betting';
        default : return '-'
    }
}

const AccountStatmentDetailsPage = () =>{

    const dispatch = useDispatch();
    const {profitLossTransactionsDetails, error } = useSelector((state)=>({
        profitLossTransactionsDetails : state?.finance?.profitLossTransactionsDetails,
        error : state?.finance?.error,
    }));

    const [searchDate,setSearchDate] = React.useState({from : getYYYYMMDDDate({beforeDay:7}), to : getYYYYMMDDDate()});
    const stateHandler = (e) =>{
        let {value, name} = e.target;
        setSearchDate((preState)=>({
            ...preState,
            [name] : value
        }));
    };

    React.useEffect(()=>{
        dispatch(fetchProLossTransectionsDetails(`?from=${YYYYMMDDtoDDMMYYYY(searchDate?.from)}&to=${YYYYMMDDtoDDMMYYYY(searchDate?.to)}`));
    },[]);

    const column =  [
        {fieldName : 'date', title : 'Date', renderHeaderRow : (rowData)=><div>{getYYYYMMDDFromTimestamp(rowData?.date)}</div>, render:(rowData,data)=><>{hhmmssTime(rowData?.system_date)}</>},
        {fieldName : 'entry_type', title : 'Description',render:(rowData,data)=><>{getTransectionType({entry_type :data} || '-')}</>},
        {fieldName : 'description', title : '',render:(rowData,data)=><>{rowData?.game_id && data || "-"}</>},
        {fieldName : 'profit_loss', title : 'P&L',render:(rowData,data)=><span className={`${parseInt(data) < 0 ? styles.errorText : ''}`}>{data === 0 ? 0 : (data || "-")}</span>},
        {fieldName : 'credit_limit', title : 'Credit Limit',render:(rowData,data)=>rowData?.entry_type === 'transfer_out' ? (<span className={styles.errorText}>{data ? `-${data}` :  "-"}</span>) : (<>{data || '-'}</>)},
        {fieldName : 'balance', title : 'Balance',render:(rowData,data)=><>{data || "-"}</>},
    ];

    const getRowData = React.useMemo(()=>{
        return Array.isArray(profitLossTransactionsDetails) ? profitLossTransactionsDetails : []
    },[profitLossTransactionsDetails]);

    const handleFilter = () =>{
        dispatch(fetchProLossTransectionsDetails(`?from=${YYYYMMDDtoDDMMYYYY(searchDate?.from)}&to=${YYYYMMDDtoDDMMYYYY(searchDate?.to)}`))
    };


    return(
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={"Profit Loss"}/>
            <div className={styles.innerContainer}>

                <section>
                    <div className={`row`}>
                        {/*<div className={`col col-md-3 col-xs-12`}>*/}
                        {/*    <div className={styles.inputBox}>*/}
                        {/*    <Select*/}
                        {/*        label='Game'*/}
                        {/*        options={[*/}
                        {/*        {label:'ALL', value : 'ALL'},*/}
                        {/*        {label:'CRICKET', value : 'CRICKET'},*/}
                        {/*        {label:'SOCCER', value : 'SOCCER'},*/}
                        {/*        {label:'TENNIS', value : 'TENNIS'},*/}
                        {/*        ]}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
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
                </section>
                <section className={styles.tableSection}>
                    <div className={styles.counterFilterBox}>
                        <div className={`${styles.counterFilter} ${styles.activeFilter}`} >
                            All : 0
                        </div>
                        <div className={`${styles.counterFilter}`} >
                            DEPOSIT : 0
                        </div>
                        <div className={`${styles.counterFilter}`}>
                            WITHDRAWAL : 0
                        </div>
                    </div>
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

export default AccountStatmentDetailsPage;