import React from 'react';
import Link from "next/link";
import styles from './BetSlip.module.css';
import TextField from "../../view/TextField";
import Label from "../Label";
import Button from "../../view/Button";
import Switch from "../../view/Switch";
import fetchData from "../../../utils/httpAction";
import {acceptOnlyNumber, formatNumberWithCommas, getProfitLiability} from "../../../utils/helperFunctions";
import Counter from "../Counter";
import {loadToaster} from "../../../store/action/toaster";
import {useDispatch} from "react-redux";

const ActionButton = ({icon = 'fa-plus'}) => {
    return (
        <div className={styles.iconSize}><i className={`fa ${icon}`}/></div>
    )
}

const BetSlip = ({odds, betData, setBetCount, setCurrentTab, matchData, marketType = '', betDelay}) => {

    const dispatch = useDispatch();

    const stakesOptions = matchData?.user_stake_option_detail?.stake_options
    const [oddsData, setOddsData] = React.useState(0);
    const [stakeData, setStakeData] = React.useState('');
    const [acceptAnyOdds, setAcceptAnyOdds] = React.useState(true);
    const [loader, setLoader] = React.useState({
        betSlip: false,
    });
    const [betDelayCount, setBetDelayCount] = React.useState(0);

    React.useEffect(() => {
        setOddsData(odds);
    }, [odds]);

    const getMaxMarket = () => {
        return matchData?.match?.[marketType]?.[0]?.MaxMin?.max_market;
    };

    const isOddsDisable = () => marketType !== 'matchodds' ? true : false;

    const handleBetPlaced = async ({isDelay = false}) => {
        setBetDelayCount(betDelay);
        // if(!isDelay){
        const oddsUsedToCalculate = (oddsData / 100) + 1;
        let payload = {
            ...betData,
            back_0: {
                ...betData?.back_0,
                odds_used_to_calculate: parseFloat(betData?.back_0?.odds_used_to_calculate && oddsUsedToCalculate),
                run: parseFloat(oddsData),
                stake: parseInt(stakeData)
            },
            accept_any_odds : acceptAnyOdds,
        }
        let token = JSON.parse(localStorage.getItem('token'));
        try {
            setLoader((preState) => ({...preState, betSlip: true}));
            let res = await fetchData({method: 'POST', endPoint: '/api/game/bet-placed', payload: {payload, token}});
            if (res?.statusCode === 200) {
                dispatch(loadToaster({toasterMessage: res?.message,toasterType:'success'}));
                setBetCount(0);
                setOddsData(0);
                setStakeData('');
                setCurrentTab(0);
            } else {
                dispatch(loadToaster({toasterMessage: res?.message || res?.error,toasterType:'error'}));
                // setDisabled(false);
            }
            setLoader((preState) => ({...preState, betSlip: false}));
        } catch (e) {
            setLoader((preState) => ({...preState, betSlip: false}));
        }
        // }
    };

    const cancelBetPlaced = () => {
        setOddsData(0);
        setStakeData('');
        setCurrentTab(0);
        setBetCount(0);
    };

    return (
        <div className={`${styles.mainContainer}`}>
            {Object.values(betData || {})?.length > 0 ? <div
                    className={`${styles.innerContainer} ${loader?.betSlip && !betDelayCount ? styles.loaderWrapper : ''}`}>
                    <div className={styles.title1}>
                        {matchData?.match?.team_a} Vs {matchData?.match?.team_b}
                    </div>
                    <div className={styles.spaceBetween}>
                        <div className={styles.oddsTypeBox}>
                            <div
                                className={`${betData?.back_0?.type === 'lay' ? styles.layIndicator : styles.backIndicator}`}/>
                            <div>{betData?.back_0?.type}</div>
                        </div>
                        <div className={`${styles.acceptAnyOddsBox}`}>
                            <div className={styles.lightTitle3}>Accept any odds</div>
                            <Switch checked={acceptAnyOdds} onChange={() => setAcceptAnyOdds((preState) => !preState)}/>
                        </div>
                    </div>
                    <div className={styles.matchMarketDetailsBox}>
                        <div className={styles.title2}>
                            {betData?.betradar_selection_name} @ {odds}
                        </div>
                        <div className={styles.title2}>Max Market: <span
                            className={styles.maxMarketCount}>{getMaxMarket()}</span></div>
                    </div>
                    <div className={styles.stakeBox}>
                        <div>
                            <TextField
                                inputContainerStyle={{
                                    border: '1px solid #34475e',
                                    borderRadius: '4px',
                                    textAlign: "center"
                                }}
                                style={{height: '35px', textAlign: "center"}}
                                label='Odds'
                                startIcon={!isOddsDisable() && <span
                                    onClick={() => setOddsData((preState) => parseFloat((parseFloat(preState) + 0.05).toFixed(2)))}><ActionButton
                                    icon='fa-plus fa-xs'/></span>}
                                endIcon={!isOddsDisable() && <span
                                    onClick={() => setOddsData((preState) => parseFloat((parseFloat(preState) - 0.05).toFixed(2)))}><ActionButton
                                    icon='fa-minus fa-xs'/></span>}
                                onChange={(e) => setOddsData(e.target.value)}
                                value={oddsData}
                                disabled={isOddsDisable()}
                            />
                        </div>
                        <div>
                            <TextField
                                inputContainerStyle={{border: '1px solid #34475e', borderRadius: '4px'}}
                                style={{height: '35px'}}
                                placeholder='min 1 and max 1000'
                                label='Stake'
                                onChange={(e) => setStakeData(acceptOnlyNumber(e.target.value))}
                                value={stakeData}
                            />
                        </div>
                    </div>
                    <div className={styles.title2}>{betData?.back_0?.type === 'back' ? 'Profit' : 'Liability '}: <span
                        className={styles.maxMarketCount}>
                        {getProfitLiability({stakes: stakeData || 0, odds: oddsData || 0, type: marketType})}
                    </span></div>

                    <div className={styles.spaceBetween}>
                        <div className={styles.title2}>or choose your stake size.</div>
                        <Link href='/setting'>
                            <div className={styles.greenActonText}>Edit Stake</div>
                        </Link>
                    </div>

                    <div className={`row`}>
                        {loader?.stakeDetails ?
                            "Loading..."
                            : stakesOptions?.map((item, index) => (
                                <div className={`col col-xs-4 p-2 ${styles.pointer}`}
                                     onClick={() => setStakeData((preState) => parseInt(preState || 0) + parseInt(item))}
                                     key={index}><Label count1={`+${formatNumberWithCommas(item)}`}
                                                        bgColor='rgba(106, 92, 255, 0.6)' count2=''/></div>
                            ))
                        }
                    </div>

                    <div className={`row`}>
                        <div className={`col col-sm-6 p-2`}><Button text='Cancel' shep='square' className={styles.cancelBtn}
                                                                    onClick={cancelBetPlaced}/></div>
                        <div className={`col col-sm-6 p-2`}>
                            <Button
                                text='Place Bet'
                                shep='square'
                                className={styles.submitBtn}
                                onClick={() => handleBetPlaced({isDelay: betDelay > 0 && true})}
                                disabled={!stakeData || !oddsData}
                            /></div>
                    </div>

                    <div className={styles.title2}>* Min Bet :1, Max Bet: 1000</div>
                    <div className={styles.spaceBetween}>
                        <div className={styles.lightTitle2}>Confirm Bet Before Placing</div>
                        <Switch/>
                    </div>
                    {(betDelayCount) ?
                        <Counter count={betDelayCount} onTimerEnd={() => {
                            setBetDelayCount(0);
                            // handleBetPlaced({isDelay:false})
                        }}/> : null}
                </div>
                : <div className={`${styles.innerContainer} ${styles.infoNoteText}`}>
                    Click on the odds to add selections to the betslip.
                </div>}

            {betDelayCount < 1 &&
            <div className={`${styles.loadingText}  ${!loader?.betSlip ? styles.none : ''}`}>Loading...</div>}
        </div>
    )
};

export default BetSlip;