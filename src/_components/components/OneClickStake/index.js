import React from 'react';
import styles from './OneClickStake.module.css';
import Stakes from "../Stakes";
import fetchData from "../../../utils/httpAction";
import Switch from "../../view/Switch";
import Link from "next/link";

const OneClickStake = ({
                           oneClickBet,
                           setOneClickBet=()=>{},
                           oneClickStakeDetails,
                           loader,
                       }) =>{
    return(
        <div className={styles.mainContainer}>
            {
                loader?.stakeDetails ?
                "Loading..."
                    : <div>
                        <div className={styles.editStakeBox}>
                            <Link href='/setting'>
                                <div className={styles.greenActonText}>Edit Stake</div>
                            </Link>
                        </div>
                        <Stakes
                            stakeOptions={oneClickStakeDetails?.one_click_bet_options}
                            viewMode={true}
                            boxStyle={{padding : "0px"}}
                        />
                        <div className={styles.onClickBetBox}>
                            <span className={styles.label}>Confirm Onclick Bet</span>
                            <Switch checked={oneClickBet} onChange={()=>setOneClickBet((preState)=> !preState)}/>
                        </div>
                    </div>
            }
            <div className={`${styles.loadingTextBox} ${!loader?.betSlip ?  styles.none : ''}`}>
                <span className={`${styles.loadingText}`}>Loading...</span>
            </div>
        </div>
    )
};

export default OneClickStake;