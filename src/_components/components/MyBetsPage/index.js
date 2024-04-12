import React from 'react';
import BackwardNavBar from "../BackwardNavBar";
import TextField from "../../view/TextField";
import Button from "../../view/Button";
import Select from "../../view/Select";
import styles from './MyBetsPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchDepositDetails
} from "../../../store/action/financeAction";
import Table from "../Table";
import {
    convertObjectToQueryString, convertQueryStringToObject,
    convertToFirstLetterTitleCase,
    getYYYYMMDDDate,
    YYYYMMDDtoDDMMYYYY
} from "../../../utils/helperFunctions";
import {useRouter} from "next/router";
import {fetchMyBetsDetails} from "../../../store/action/gameAction";

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

const MyBetsPage = ({type='',hidefilter=false}) =>{

    const dispatch = useDispatch();
    const router = useRouter();

    const searchParams = router.query;
    const { myBets, error} = useSelector((state)=>({
        myBets : state?.game?.myBets?.bets,
        error : state?.finance?.error,
    }));

    const [routerRendered,setRouterRendered] = React.useState(false)
    const [searchDate,setSearchDate] = React.useState({
        current: 1,
        unmatched:0,
        from : getYYYYMMDDDate({beforeDay:30}),
        to : getYYYYMMDDDate(),
        button:''
    });

    const stateHandler = (e) =>{
        let {value, name} = e?.target;
        setSearchDate((preState)=>({
            ...preState,
            [name] : value
        }));
    };

    const handleFilter = () =>{
        let newSearchData = {...searchDate}
        if(!searchDate?.current){
            delete newSearchData?.unmatched
        }
        let quaryString = convertObjectToQueryString({...newSearchData,from:YYYYMMDDtoDDMMYYYY(searchDate?.from), to:YYYYMMDDtoDDMMYYYY(searchDate?.to)});
        routerRendered && router.push({
            pathname: '/my-bets',
            query: quaryString,
        });
        dispatch(fetchMyBetsDetails(quaryString));
    }

    React.useEffect(()=>{
        console.log("searchParams",searchParams,router?.query)
        if(JSON.stringify(searchParams) !== '{}' && !routerRendered){
            setSearchDate(()=>(searchParams))
            setRouterRendered(true);
        }
    },[searchParams]);

    React.useEffect(()=>{
        handleFilter();
    },[searchDate?.current,searchDate?.unmatched]);

    const column = React.useMemo(()=>{
        return [
            {fieldName : 'placed_at', title : 'Placed', render:(rowData,data)=><>{data || '-'}</>,type : ['current','past']},
            {
                fieldName: 'description', title: 'Description', render: (rowData, data) =>
                    <span className={styles.descriptionBox}>
                        <div className={styles.blueText}>{rowData?.match_name || '-'}</div>
                        <div>{rowData?.selection_name} - {rowData?.odds}</div>
                        <div>Bet ID {rowData?.betId} Matched {rowData?.placed_at}</div>
                    </span>,
                type : ['current','past']
            },
            {fieldName : 'type', title : 'Type', render:(rowData,data)=><>{data || '-'}</>,type : ['current','past']},
            {fieldName : 'odds', title : 'Odds', render:(rowData,data)=><>{data || '-'}</>,type : ['current','past']},
            {fieldName : 'stake', title : 'Stake', render:(rowData,data)=><>{data || '-'}</>,type : ['current','past']},
            {fieldName : 'liability', title : 'Liability', render:(rowData,data)=><>{data || '-'}</>,type : ['current']},
            {fieldName : 'profit', title : 'Potential Profit', render:(rowData,data)=><>{data}</>,type : ['current',]},
            {fieldName : 'profit_loss', title : 'Profit/Loss', render:(rowData,data)=><>{data}</>,type : ['past',]},
            {fieldName : 'status', title : 'Status', render:(rowData,data)=><>{data}</>,type : ['past',]},
        ]?.filter((item)=> item.type?.includes(searchDate?.current === 1 ? 'current' : 'past') )
    },[searchDate?.current]);

    const getRowData = React.useMemo(()=>{
        switch (type) {
            case 'deposit': return Array.isArray(myBets) ? myBets : [];
            default: return [];
        }
    },[myBets]);

    return(
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName='My-Bet' maxWidth={1200}/>
            <div className={styles.innerContainer}>

               <section>
                   <div className={`${styles.filterBox}`}>
                       <div>
                           <div className={`${parseInt(searchDate?.current) ? styles.activeBtn : styles.btn}`}
                                onClick={()=>stateHandler({target:{name : 'current',value:1}})}>
                               Current</div>
                           <div  className={`${!parseInt(searchDate?.current) ? styles.activeBtn : styles.btn}`}
                                 onClick={()=>stateHandler({target:{name : 'current',value:0}})}>
                               Past</div>
                       </div>
                      {!!parseInt(searchDate?.current) &&
                      <div>
                           <div  className={`${!parseInt(searchDate?.unmatched) ? styles.activeBtn : styles.btn}`}
                                 onClick={()=>stateHandler({target:{name : 'unmatched',value:0}})}>
                           Matched</div>
                           <div  className={`${parseInt(searchDate?.unmatched) ? styles.activeBtn : styles.btn}`}
                                 onClick={()=>stateHandler({target:{name : 'unmatched',value:1}})}>
                           Unmatched</div>
                       </div>}
                   </div>
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

export default MyBetsPage;