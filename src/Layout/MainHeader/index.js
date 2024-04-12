import React from 'react';
import Link from "next/link";
import {useDispatch, useSelector} from 'react-redux';
import Sidebar from "../Sidebar";

import styles from './MainHeader.module.css';
import Button from "../../_components/view/Button";
import ProfileIconButton from "../../_components/components/ProfileIconButton";
import TextField from "../../_components/view/TextField";
import {searchEvent} from "../../store/action/commonAction";
import {convertBtwSportIdAndGameName, debounce} from "../../utils/helperFunctions";
import SearchDropdownField from "../../_components/view/SearchDropdownField";
import {useRouter} from "next/router";
import Logo from "../../_components/components/Logo";
import useWindowSize from "../../utils/Hooks/useWindowsSize";

const MainHeader = ({isLogin, userDetails}) => {

    let windowSize = useWindowSize();

    const router = useRouter();
    const dispatch = useDispatch();
    const {matchList, balance} = useSelector((state)=>({
        matchList : state?.common?.searchEvent || [],
        balance : state.common.balance,
    }));

    const [isNavBarVisible, setNavBarVisible] = React.useState(false);
    const [isAccountInfoNavBarVisible, setAccountInfoNavBarVisible] = React.useState(false);

    const toggleNavBar = () => {
        setNavBarVisible(!isNavBarVisible);
    };

    const toggleAccountInfoNavBar = () => {
        setAccountInfoNavBarVisible(!isAccountInfoNavBarVisible);
    };

    const handelSearch = (e) =>{
        dispatch(searchEvent({q : e.target.value}));
    };

    const debouncedHandleInput = debounce(handelSearch, 600);

    const getMatchListOption = () =>{
        return  matchList?.length && matchList?.map((item,index)=>({
            content : <div className={styles.matchListOptions} key={index}>
                <div><b>{convertBtwSportIdAndGameName(item?.sport_id,false)}</b> {item?.start_date}</div>
                <div>{item?.team_a} VS {item?.team_b}</div>
            </div>,
            data : item
        }));
    };

    const selectMatch = (data) =>{
        router.push({
            pathname: '/game',
            query: {sport_id : data?.sport_id,tournament_id : data?.tournament_id,match_id : data?.matchodds?.[0]?.match_id || data?.id, market_id : data?.market_id},
        });
        let searchBox = document.getElementById('search_match');
        // console.log("searchBox",searchBox)
        searchBox.value  = '';
    }

    return (
        <>
        <div className={styles.container}>
            <div className={styles.infoSection}>
                {/*<img src="images/logo.png" alt="Logo" title="Logo"/>*/}
                <Logo width={parseInt(windowSize.width) > 781 ? parseInt(windowSize.width)*20/100 : '100%'}/>
                <a href="" className={styles.infButton}>
                     <span className={styles.iconBox}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path fillRule="evenodd" clipRule="evenodd"
                                 d="M0.000153945 9.51171C-0.00765656 8.69173 0.281332 7.96457 0.959545 7.72687L0.976467 7.69593C0.996298 7.65383 1.02272 7.61577 1.05457 7.58341C1.09562 7.55086 1.142 7.527 1.19126 7.51308L1.22901 7.49761C4.51723 6.19239 5.99993 4.23314 6.85257 2.90259C6.85257 4.20923 7.15588 5.91249 7.6896 7.56091C8.23764 9.2487 9.0291 10.8957 9.995 12.0279C8.98875 11.7185 7.72605 11.3247 5.67188 11.6271C5.58586 11.8535 5.53655 12.0943 5.52609 12.3388C5.51931 12.415 5.5274 12.492 5.54982 12.5646C5.57224 12.6373 5.6085 12.7041 5.65626 12.7607L5.68751 12.7917C5.81768 12.9197 5.88147 12.9829 5.9101 13.0969C5.92925 13.2477 5.92352 13.4011 5.89318 13.5498L5.88147 13.644C5.8333 14.0561 6.01815 14.1405 6.2017 14.2249C6.38524 14.3093 6.52844 14.3768 6.60264 14.6032C6.60786 14.6216 6.60786 14.6412 6.60264 14.6595C6.52713 15.0814 6.2772 15.3121 6.02596 15.5442C5.96478 15.6018 5.90229 15.6595 5.84892 15.7144H5.84111C5.33083 16.156 4.98586 16.0379 4.72421 15.6834C4.51853 15.4021 4.37534 14.9802 4.24256 14.5849L4.18528 14.4134C3.97026 13.7185 3.79634 13.0096 3.66458 12.2909L3.62032 12.08C3.50707 12.1137 3.38861 12.1517 3.26495 12.1911C3.10874 12.2403 2.95253 12.2938 2.79762 12.3472L2.74815 12.3669C2.72245 12.3852 2.69235 12.3949 2.66158 12.3949C2.63082 12.3949 2.60072 12.3852 2.57502 12.3669C1.75361 12.6623 1.06759 12.2403 0.609374 11.5371C0.415931 11.2403 0.266191 10.9129 0.165476 10.5666C0.0623204 10.2257 0.0066047 9.87024 0.000153945 9.51171ZM11.4308 2.2767C11.3897 2.31061 11.3427 2.33534 11.2926 2.34946C11.2426 2.36358 11.1904 2.3668 11.1392 2.35895C11.0879 2.3511 11.0387 2.33232 10.9942 2.30372C10.9497 2.27511 10.911 2.23724 10.8802 2.19231L10.8711 2.17965C10.8114 2.08909 10.7866 1.97703 10.8019 1.8671C10.8172 1.75716 10.8714 1.65794 10.9531 1.59033C11.5857 1.0854 12.2158 0.57625 12.8484 0.0825703C12.9319 0.0173024 13.0353 -0.0108894 13.1374 0.00380652C13.2416 0.0210746 13.3353 0.0822737 13.3978 0.173992V0.181025C13.4578 0.271792 13.4822 0.384566 13.4655 0.494673C13.458 0.550564 13.4402 0.604261 13.4131 0.65258C13.3861 0.7009 13.3503 0.74286 13.308 0.775972L11.4308 2.2767ZM13.4863 10.3922C13.4348 10.391 13.384 10.3789 13.3369 10.3564C13.2897 10.334 13.2472 10.3017 13.2116 10.2614C13.1757 10.2216 13.1475 10.1745 13.1285 10.1228C13.1095 10.0712 13.1002 10.016 13.101 9.96039V9.95054C13.101 9.89429 13.1114 9.83861 13.1316 9.78676C13.1517 9.73492 13.1813 9.68795 13.2186 9.64864C13.2558 9.60933 13.2999 9.57846 13.3484 9.55784C13.3968 9.53722 13.4486 9.52728 13.5006 9.52859C14.1997 9.52859 14.9104 9.55672 15.6095 9.57079C15.7145 9.57337 15.8144 9.62058 15.8875 9.70219C15.9606 9.7838 16.001 9.89324 16 10.0068C15.9979 10.1209 15.9544 10.2295 15.8789 10.3092C15.8419 10.3486 15.7979 10.3795 15.7496 10.4003C15.7013 10.4211 15.6497 10.4312 15.5977 10.4302L13.4902 10.3866L13.4863 10.3922ZM13.5475 8.18258C13.4959 8.18738 13.4439 8.18103 13.3945 8.16391C13.3452 8.14678 13.2995 8.11922 13.2601 8.08283C13.2208 8.04644 13.1885 8.00194 13.1652 7.95194C13.1419 7.90193 13.128 7.84742 13.1244 7.79157V7.78173C13.1186 7.67034 13.1528 7.56082 13.22 7.47613C13.2873 7.39144 13.3822 7.33815 13.485 7.32743C14.1359 7.27117 14.7985 7.21069 15.4506 7.16568C15.5549 7.15868 15.6574 7.19618 15.7363 7.2701C15.8152 7.34402 15.8641 7.44845 15.8724 7.56091C15.8765 7.61694 15.8702 7.67331 15.8539 7.72669C15.8376 7.78006 15.8116 7.82938 15.7774 7.87174C15.7087 7.9579 15.6115 8.01145 15.5066 8.02083C14.8753 8.08834 14.1814 8.1446 13.5475 8.18117V8.18258ZM13.2663 6.1305C13.216 6.14594 13.1633 6.15052 13.1113 6.14396C13.0593 6.1374 13.0091 6.11984 12.9634 6.09228C12.9177 6.06472 12.8774 6.0277 12.845 5.98334C12.8125 5.93897 12.7885 5.88814 12.7742 5.83373C12.76 5.77998 12.7557 5.72371 12.7618 5.66817C12.7678 5.61264 12.784 5.55895 12.8094 5.51024C12.8609 5.41078 12.9464 5.33706 13.0476 5.30489C13.7258 5.1122 14.4014 4.87591 15.0796 4.679C15.1294 4.66358 15.1815 4.65899 15.2329 4.66551C15.2843 4.67203 15.334 4.68952 15.379 4.71697C15.47 4.77169 15.5377 4.86248 15.5678 4.97014C15.5964 5.0798 15.5836 5.19721 15.5324 5.29679C15.4812 5.39638 15.3957 5.47006 15.2944 5.5018L13.265 6.12769L13.2663 6.1305ZM12.4462 4.1164C12.3995 4.14152 12.3487 4.15646 12.2967 4.16037C12.2447 4.16428 12.1925 4.15709 12.1431 4.13919C12.0936 4.1213 12.0479 4.09306 12.0086 4.05609C11.9692 4.01912 11.937 3.97413 11.9138 3.92371C11.89 3.87346 11.8758 3.81857 11.872 3.76227C11.8682 3.70598 11.8749 3.64944 11.8917 3.596C11.9253 3.48801 11.9968 3.39862 12.0908 3.34705L14.0434 2.29358C14.0899 2.26749 14.1408 2.25178 14.193 2.24737C14.2453 2.24297 14.2978 2.24997 14.3475 2.26794C14.3971 2.28592 14.443 2.31452 14.4822 2.35203C14.5214 2.38953 14.5533 2.43519 14.5759 2.48627C14.5994 2.53662 14.6134 2.59156 14.617 2.64785C14.6206 2.70414 14.6137 2.76063 14.5967 2.81398C14.563 2.92159 14.4915 3.01053 14.3975 3.06153L12.4449 4.1164H12.4462ZM7.64794 1.6916C7.66487 1.6705 7.68309 1.65081 7.70001 1.63253C7.75343 1.56651 7.81906 1.51333 7.89267 1.47641C7.9767 1.44599 8.06701 1.44208 8.15302 1.46516C8.44592 1.51579 8.75964 1.74645 9.07857 2.09948C9.85962 2.97011 10.6823 4.63118 11.2681 6.37664C11.8539 8.1221 12.2054 9.94351 12.0296 11.1264C11.9632 11.5666 11.8253 11.9224 11.5988 12.1573L11.587 12.1672C11.4918 12.2411 11.3815 12.2894 11.2655 12.3078C11.2552 12.2977 11.2444 12.2883 11.233 12.2797C10.4532 11.6777 9.76329 10.6791 9.18271 9.50468C9.33111 9.53563 9.52116 9.41607 9.70341 9.21213C10.6146 8.17414 10.1668 6.35976 9.0304 5.93922C8.56698 5.77044 8.10616 5.77044 7.92391 5.86749L7.90439 5.87874C7.48783 4.14172 7.36937 2.5355 7.64794 1.6916Z"
                                 fill="#778EA8"/>
                        </svg>
                     </span>
                    News
                </a>
                <a href="" className={styles.infButton}>
                     <span className={styles.iconBox}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                               d="M5.25 0.875C5.25 1.35898 5.64102 1.75 6.125 1.75C9.50742 1.75 12.25 4.49258 12.25 7.875C12.25 8.35898 12.641 8.75 13.125 8.75C13.609 8.75 14 8.35898 14 7.875C14 3.52461 10.4754 0 6.125 0C5.64102 0 5.25 0.391016 5.25 0.875ZM5.25 3.5C5.25 3.98398 5.64102 4.375 6.125 4.375C8.0582 4.375 9.625 5.9418 9.625 7.875C9.625 8.35898 10.016 8.75 10.5 8.75C10.984 8.75 11.375 8.35898 11.375 7.875C11.375 4.97656 9.02344 2.625 6.125 2.625C5.64102 2.625 5.25 3.01602 5.25 3.5ZM2.625 3.9375C2.625 3.21289 2.03711 2.625 1.3125 2.625C0.587891 2.625 0 3.21289 0 3.9375V10.0625C0 12.2363 1.76367 14 3.9375 14C6.11133 14 7.875 12.2363 7.875 10.0625C7.875 7.88867 6.11133 6.125 3.9375 6.125H3.5V8.75H3.9375C4.66211 8.75 5.25 9.33789 5.25 10.0625C5.25 10.7871 4.66211 11.375 3.9375 11.375C3.21289 11.375 2.625 10.7871 2.625 10.0625V3.9375Z"
                               fill="#778EA8"/>
                        </svg>
                     </span>
                    Blogs
                </a>
            </div>

            <div className={styles.actionBtnGroup}>
                {/*<Button ><Link href="/login">Login</Link></Button>*/}

                {isLogin && <SearchDropdownField
                    type='text'
                    id='search_match'
                    inputContainerStyle={{borderRadius:'30px',border: "1px solid #212d3b", background : '#16202c', height:'40px'}}
                    style={{borderRadius:'30px', height:'35px'}}
                    placeholder='Search'
                    startIcon={<i className='fa-solid fa-magnifying-glass' style={{fontSize : '15px'}}/>}
                    dropdownOptions={getMatchListOption()}
                    onChange={debouncedHandleInput}
                    onSelect={selectMatch}
                    disabled={!isLogin}
                />}

                {!isLogin && <Link href="/login" className={styles.btn}>Login</Link>}
                {!isLogin && process.env.APP_TYPE !== 'B2B' && <Link href="/signup" className={styles.greenBtn}>Signup</Link>}

                {isLogin && <>
                    {windowSize.width > 780 && <>
                            <Link href="/my-bets" className={styles.greenBtn}>Open Bets</Link>

                            < Link href='/deposit-page' className={styles.depositBtn}><img
                                src='images/deposit-icon.svg'/> Deposit</Link>

                            <Link href='/withdrawl' className={styles.walletBtn}><img
                                src='images/wallet-icon.svg'/> {balance?.balance}</Link>
                        </>
                    }

                    <ProfileIconButton content='' colo r='#fff' bg='#ffab2d'
                                       name={(userDetails?.username?.[0])?.toUpperCase()}
                                       size={parseInt(windowSize.width) > 1180 ? 40 : 30}
                                       onClick={toggleAccountInfoNavBar}/>
                </>}

                <button className={styles.navbarToggler} type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
               <span className={styles.navbarTogglerIcon} onClick={toggleNavBar}>
                  <span></span>
                  <span></span>
               </span>
                </button>
            </div>
        </div>
        <div className={`${styles.tooglenavbar} ${isNavBarVisible ? styles.visible : ''}`}>
            <div className={styles.closeBtnBox}>
                <div onClick={toggleNavBar} className={styles.closeBtn}>
                    <i className="fa-solid fa-xmark" />
                </div>
            </div>
            <Sidebar isLogin={isLogin} userDetails={userDetails} toggleNavBar={toggleNavBar} type='appInfo'/>
        </div>

            <div className={`${styles.tooglenavbar} ${isAccountInfoNavBarVisible ? styles.visible : ''}`}>
                <div className={styles.closeBtnBox}>
                    <div onClick={toggleAccountInfoNavBar} className={styles.closeBtn}>
                        <i className="fa-solid fa-xmark" />
                    </div>
                </div>
                <Sidebar isLogin={isLogin} userDetails={userDetails} toggleNavBar={toggleAccountInfoNavBar} type='accountInfo'/>
            </div>
        </>
    )
};

export default MainHeader;