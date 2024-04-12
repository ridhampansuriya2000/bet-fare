import React from 'react';


import styles from './GamePage2.module.css';
import BackwardNavBar from "../BackwardNavBar";
import AccordionContainer from "../../view/AccordianContainer";
import SubNav from "../SubNav";
import GameInfo from "../GameInfo";
import GameInfo2 from "../GameInfo2";
import BetSlip from "../BetSlip";
import AddToFavourite from "../AddToFavourite";
import MatchList from "../MatchList";

const SubData = () => (
    <div className={styles.subContent}>
        <div className={styles.subContentItem}><img src="images/cricket.svg" width='20px' srcSet=""/>Cricket <span
            className="rounded-circle badge ms-auto">8</span></div>
        <div className={styles.subContentItem}><img src="images/tennis.svg" width='20px' srcSet=""/>Tennis</div>
        <div className={styles.subContentItem}><img src="images/soccer.svg" width='20px' srcSet=""/>Soccer</div>
        <div className={styles.subContentItem}><img src="images/badminton.svg" width='20px' srcSet=""/>Badminton</div>
        <div className={styles.subContentItem}><img src="images/basketball.svg" width='20px' srcSet=""/>Basketball</div>
    </div>
);

const accordionData1 = [
    {title: 'Sports', content: <SubData/>},
    {title: 'Games', content: <SubData/>},
    {title: 'Live Casino', content: <SubData/>},
    // Add more dummy data as needed
];

const dummyTabs = [
    {title: 'Open Bets', path: ''},
    {title: 'Bet Slip', path: ''},
];

const matchInfoTab = [
    {title: 'Live & Upcoming', path: ''},
    {title: 'Open Bets', path: ''},
    {title: 'Bet Slip', path: ''},
];

const data = [
    {title: 'Unmatched Bets', content: '', emptyContent: <img src="images/caution-icon.svg" alt="caution icon"/>},
    {title: 'Matched Bets', content: '', emptyContent: <img src="images/caution-icon.svg" alt="caution icon"/>},
    {
        title: 'Premium Sportsbook Transaction',
        content: '',
        emptyContent: <img src="images/caution-icon.svg" alt="caution icon"/>
    },
    // Add more dummy data as needed
];

const matchList = [
    'England Women Vs India...',
    'England Women Vs India...',
    'England Women Vs India...',
    'England Women Vs India...',
    'England Women Vs India...',
    'England Women Vs India...',
];

const macht1Data = [
    { name : 'Central Punjab', data : [] },
    { name : 'Central Punjab', data : [] }
];

const macht2Data = [
    { name : 'Central Punjab', data : [] },
    { name : 'Central Punjab', data : [] }
];

const macht3Data = [
    { name : 'Central Punjab', data : [] },
    { name : 'Central Punjab', data : [] }
];

const macht4Data = [
    { name : 'Central Punjab', data : [] },
    { name : 'Central Punjab', data : [] }
];

const macht5Data = [
    { name : '', data : [] },
    { name : '', data : [] }
];

const macht6Data = [
    { name : '', data : [] },
    { name : '', data : [] }
];

const GamePage2 = () => {

    const [currentTab1, setCurrentTab1] = React.useState(0);
    const [currentTab2, setCurrentTab2] = React.useState(0);

    const tabHandler1 = (tab) => {
        setCurrentTab1(tab);
    }
    const tabHandler2 = (tab) => {
        setCurrentTab2(tab);
    }

    return (
        <div className={styles.mainContainer}>
            <BackwardNavBar
                pageName={"England Women Vs India Women England Women Vs India WomenEngland Women Vs India WomenEngland Women Vs India Women"}/>
            <div className={styles.innerContainer}>
                <section className={`row`}>
                    <div className={`col col-xl-2 col-md-4 col-sm-12`}>
                        <section className={styles.leftSideContent}>

                            <div className={styles.categoryTitle}>Sports</div>

                            <MatchList name='Cricket' list={matchList}/>

                            <div className={styles.previousTitle}>
                                <i className='fa fa-angle-left'/>
                                <span> Previous</span>
                            </div>
                            <section className={`${styles.previousSection}`}>
                                <div className={styles.heading}>Favourites</div>
                                <AddToFavourite/>
                                <AccordionContainer
                                    data={accordionData1}
                                    accordionHeaderStyle={{background: '#16202c'}}
                                />

                                <GameInfo name='Cricket' title='England Women Vs India Women.'
                                          logo='images/cricket.svg'/>
                                <GameInfo name='Soccer' title='Juventus Vs Real Madrid' logo='images/soccer.svg'/>
                            </section>
                        </section>
                    </div>
                    <div className={`col col-xl-6 col-md-8 col-sm-12`}>
                        <section>
                            <SubNav tabs={matchInfoTab} currentTab={currentTab2} tabHandler={tabHandler2}/>
                            {currentTab2 === 0 ?
                                <div>
                                    <GameInfo2
                                        title='Central Punjab Vs Southern Punjab'
                                        title2='Today at 3:30PM'
                                        logo='images/cricket.svg'
                                        playIcon={true}
                                        outLineStarIcon={true}
                                        data={macht1Data}
                                        status='Live'
                                    />
                                    <GameInfo2
                                        title='England Women Vs India Women'
                                        title2='Today at 3:30PM'
                                        logo='images/cricket.svg'
                                        playIcon={true}
                                        outLineStarIcon={true}
                                        data={macht2Data}
                                        status='Live'
                                    />
                                    <GameInfo2
                                        title='England Women Vs India Women'
                                        title2='Today at 3:30PM'
                                        logo='images/cricket.svg'
                                        playIcon={true}
                                        outLineStarIcon={true}
                                        data={macht3Data}
                                        status='Live'
                                    />
                                    <GameInfo2
                                        title='England Women Vs India Women'
                                        title2='Today at 3:30PM'
                                        logo='images/cricket.svg'
                                        playIcon={true}
                                        outLineStarIcon={true}
                                        data={macht4Data}
                                        status='Upcoming'
                                    />
                                    <GameInfo2
                                        title='England Women Vs India Women'
                                        title2='Today at 3:30PM'
                                        logo='images/cricket.svg'
                                        playIcon={true}
                                        outLineStarIcon={true}
                                        data={macht5Data}
                                        status='Upcoming'
                                    />
                                </div>
                                : currentTab2 === 0 ?
                                    <div>
                                        <AccordionContainer data={data}/>
                                    </div> :
                                <div>
                                    <AccordionContainer data={data}/>
                                </div>}
                        </section>
                    </div>
                    <div className={`col col-xl-4 col-md-12 col-sm-12`}>
                        <section className={styles.rightSideContent}>
                            {/*<div id="videoplayer" className={styles.videoPlayer}>*/}
                            {/*    <iframe width="100%" height="100%"*/}
                            {/*            src="https://ss247.life/api/4b50fe2720dbe6dfdb23b57cd8d62cafc564ac15/Nstreamapi.php?chid=222"/>*/}
                            {/*</div>*/}
                            <SubNav tabs={dummyTabs} currentTab={currentTab1} tabHandler={tabHandler1}/>

                           {/* {currentTab1 === 0 ?
                                <AccordionContainer data={data}/>
                                :
                                <div>
                                    <BetSlip/>
                                </div>}*/}
                        </section>
                    </div>
                </section>
            </div>
        </div>
    )
};

export default GamePage2;