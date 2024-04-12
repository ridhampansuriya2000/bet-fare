import React from 'react';
import Link from 'next/link'
import Button from "../../_components/view/Button";
import styles from './Sidebar.module.css';
import ProfileIconButton from "../../_components/components/ProfileIconButton";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {logOutUser} from "../../store/action/authAction";
import {accountInfoPath, appInfoPath} from "../../utils/static";
import useWindowSize from "../../utils/Hooks/useWindowsSize";

const getNavRoutes = (type) =>{
    // let arr = (type === 'accountInfo' ?
    //     accountInfoPath
    //     : appInfoPath)?.filter((item)=> item?.access?.some((elm)=> elm === "B2B"));
    //
    // return arr;
    return (type === 'accountInfo' ?
        accountInfoPath
        : appInfoPath)?.filter((item)=> item?.access?.some((elm)=> elm === process.env.APP_TYPE));
};

const Sidebar = ({isLogin, userDetails, toggleNavBar, type='accountInfo' }) => {

    let windowSize = useWindowSize();
    const router = useRouter();
    const dispatch = useDispatch();

    let { balance } = useSelector((state)=>({
        balance : state.common.balance,
    }));

    return (
        <div className={styles.container}>
            <div className={styles.btnHeader}>
                {!isLogin && <Button
                    text='Join Now'
                    type='primary'
                />}

                {isLogin && <ProfileIconButton size={50} content={`Hi, ${(userDetails?.username)?.toUpperCase()}`} direction='row' contentSize={18} />}

              {type === 'accountInfo' &&
              <div className={styles.walletBox}>
                    <div className={styles.spaceBetween}><span className={styles.label}>Wallet Amount</span> <span>{balance?.balance}</span></div>
                    <div className={styles.spaceBetween}><span className={styles.label}>Net Exposure</span> <span>{balance?.exposure}</span></div>

                  {isLogin && windowSize.width < 781 && <>
                      <Link href="/my-bets" className={styles.greenBtn}>Open Bets</Link>

                      <Link href='/deposit-page' className={styles.depositBtn} ><img src='images/deposit-icon.svg'/> Deposit</Link>

                      <Link href='/withdrawl' className={styles.walletBtn} ><img src='images/wallet-icon.svg'/> {balance?.balance}</Link>

                  </>}
                </div>}
            </div>

            <div className={styles.navItems}>
                {getNavRoutes(type)?.map((item,index)=>(
                    <div href={item?.path} onClick={()=>{
                        toggleNavBar();
                        item?.action?.(dispatch);
                        router.push(item?.path);
                    }} className={`${styles.navLink}`} key={`nav_routes_${index}`} >
                        <span>
                            <img src={item.icon} alt={item.alt} width={20}/>
                        </span>
                            <span>{item.alt}</span>
                    </div>
                ))}


            </div>
        </div>
    )
};

export default Sidebar;