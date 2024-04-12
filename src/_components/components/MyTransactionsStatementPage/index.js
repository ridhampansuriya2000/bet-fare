import React from 'react';
import BackwardNavBar from "../BackwardNavBar";
import TextField from "../../view/TextField";
import Button from "../../view/Button";
import Select from "../../view/Select";
import styles from './MyTransactionsStatementPage.module.css';
import Table from "../Table";
import {getYYYYMMDDDate, hhmmssTime, YYYYMMDDtoDDMMYYYY} from "../../../utils/helperFunctions";
import {
    fetchDepositDetails,
    fetchTransectionsDetails,
    fetchWithdrawalsDetails
} from "../../../store/action/financeAction";
import {useDispatch, useSelector} from "react-redux";

const MyTransactionsStatementPage = () =>{

    const dispatch = useDispatch();
    const {transactionsDetails, error } = useSelector((state)=>({
        transactionsDetails : state?.finance?.transactionsDetails,
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

    React.useEffect(()=>{
        dispatch(fetchTransectionsDetails(`?from=${YYYYMMDDtoDDMMYYYY(searchDate?.from)}&to=${YYYYMMDDtoDDMMYYYY(searchDate?.to)}`));
    },[]);

    const column =  [
        {fieldName : 'created_date', title : 'Date', cellStyle:{}, renderHeaderRow : (rowData)=><div>{rowData?.created_date}</div>, render:(rowData,data)=><>{hhmmssTime(rowData?.created_at)}</>},
        {fieldName : 'notes', title : 'Description'},
        {fieldName : 'balance', title : 'Amount'},
        // {fieldName : 'datetime', title : 'Request Placed Time', render:(rowData,data)=><>{data}</>},
    ];

    const getRowData = React.useMemo(()=>{
        return Array.isArray(transactionsDetails) ? transactionsDetails : []
    },[transactionsDetails]);

    const handleFilter = () =>{
            dispatch(fetchTransectionsDetails(`?from=${YYYYMMDDtoDDMMYYYY(searchDate?.from)}&to=${YYYYMMDDtoDDMMYYYY(searchDate?.to)}`))
    };

    return(
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={"Transfer Statement"}/>
            <div className={styles.innerContainer}>

                <section>
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

                        {/*<div className={`col col-md-3 col-xs-12`}>*/}
                        {/*    <div className={styles.inputBox}>*/}
                        {/*    <Select*/}
                        {/*        label='Sort By Transaction'*/}
                        {/*        options={[*/}
                        {/*        {label:'ALL', value : 'ALL'},*/}
                        {/*        {label:'CRICKET', value : 'CRICKET'},*/}
                        {/*        {label:'SOCCER', value : 'SOCCER'},*/}
                        {/*        {label:'TENNIS', value : 'TENNIS'},*/}
                        {/*        ]}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={`col col-md-3 col-xs-12`}>*/}
                        {/*    <div className={styles.inputBox}>*/}
                        {/*    <Select*/}
                        {/*        label='Sort By'*/}
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
                                <Button className={styles.submitBtn} onClick={handleFilter}>Search</Button>
                            </div>
                        </div>
                    </div>
                    <div className={`col ${styles.errorText}`}>{error}</div>
                </section>

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

export default MyTransactionsStatementPage;