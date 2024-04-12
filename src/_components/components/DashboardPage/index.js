import React from 'react';


import styles from './DashboardPage.module.css';
import AccordionContainer from "../../view/AccordianContainer";
import GameInfo from "../GameInfo";
import CarouselSlider from "../../view/CarosalSlider";
import Navbar2 from "../Navbar2";
import Label from "../Label";
import Table from "../Table";


const bannerSlides = [
    {src:'images/banner3.png'},
    {src:'images/banner3.png'},
    {src:'images/banner3.png'},
    {src:'images/banner3.png'},
];

const bannerSliderConfiguration = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <></>,
    prevArrow: <></>,
};

const SubData = () => (
    <div className={styles.subContent}>
        <div className={styles.subContentItem}><img src="images/cricket.svg" width='20px' srcSet=""/>Cricket <span className="rounded-circle badge ms-auto">8</span></div>
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

const rowData= [
    {
        match_odds : "Qld Bulls Vs South Australia",
        1 : '200k to 2000k',
        x : '5',
        2 : '3',
        play: '',
        stream: '',
    },
    {
        match_odds : "Qld Bulls Vs South Australia",
        1 : '200k to 2000k',
        x : '5',
        2 : '3',
        play: '',
        stream: '',
    },
];

const columnData = [
    {fieldName : 'match_odds', title : <div>Date</div>,  render:(rowData,data)=><div className={styles.customTimeCell}><span>13: 00</span><span>Today</span></div>, bodyCellStyle:{textAlign:'start', paddingLeft:'10px'}, headerCellStyle:{textAlign:'start', paddingLeft:'10px'} },
    {fieldName : 'match_odds', title : <div>Game</div>,  bodyCellStyle:{textAlign:'start', paddingLeft:'10px'}, headerCellStyle:{textAlign:'start', paddingLeft:'10px'} },
    {fieldName : 'play', title : '',render:(rowData,data)=><div className={styles.customTableCell}><i className='fa-solid fa-play' /></div>},
    {fieldName : 'stream', title : '',render:(rowData,data)=><div className={styles.customTableCell}><img src='images/stream.svg' alt='stream icon' /></div>},
    {fieldName : '1', title : '1',render:(rowData,data)=><div className={styles.customTableCell}><Label/><Label bgColor='#0d5eac'/></div>},
    {fieldName : 'x', title : 'X',render:(rowData,data)=><div className={styles.customTableCell}><Label count1='-' count2='' bgColor='#293747'/><Label bgColor='#293747' count1='-' count2=''/></div>},
    {fieldName : '2', title : '2', render:(rowData,data)=><div className={styles.customTableCell}><Label/><Label bgColor='#0d5eac'/></div>},
];

const DashboardPage = () => {

    const [currentTab,setCurrentTab] = React.useState(0);

    const tabHandler = (tab) =>{
        setCurrentTab(tab);
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.innerContainer}>
                <section className={`row`}>
                    <div className={`col col-xl-2 col-md-4 col-sm-12`}>
                        <section className={styles.leftSideContent}>
                            <AccordionContainer
                                data={accordionData1}
                                accordionHeaderStyle={{background: '#16202c'}}
                            />

                            <GameInfo name='Cricket' title='England Women Vs India Women.' logo='images/cricket.svg'/>
                            <GameInfo name='Soccer' title='Juventus Vs Real Madrid' logo='images/soccer.svg'/>
                        </section>
                    </div>
                    <div className={`col col-xl-10 col-md-8 col-sm-12 ${styles.gap20}`}>
                        <section>
                            <CarouselSlider sliderConfiguration={bannerSliderConfiguration}>
                                {bannerSlides?.map((item, index)=>(<div key={`banner_Slides_${index}`}><img src={item.src} width='100%'/></div>))}
                            </CarouselSlider>
                        </section>

                        <section className={styles.navbar2Section} >
                            <Navbar2 />
                        </section>

                        <section className={styles.tableSection}>
                            <Table greenNote='' rows={rowData} column={columnData}/>
                        </section>

                        <section className={styles.premiumSportsBannerSection}>
                            <img src={'images/premium-sports-banner.png'} alt='Premium Sports Book' width='100%'/>
                        </section>

                        <section className={styles.tableSection}>
                            <Table greenNote='' rows={rowData} column={columnData}/>
                        </section>

                        <section className={styles.addSection}>
                            <div className={`row`}>
                                <div className={`col col-md-6 col-sm-12`}><img src={'images/card-games.png'} alt='Live Card Games' width='100%'/></div>
                                <div className={`col col-md-6 col-sm-12`}><img src={'images/casino-games.png'} alt='Live Casino Games' width='100%'/></div>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    )
};

export default DashboardPage;