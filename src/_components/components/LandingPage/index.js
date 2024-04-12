import React from 'react';
import styles from './LandingPage.module.css';
import Button from "../../view/Button";
import FeatureCard from "../FeatureCard";
import CarouselSlider from "../../view/CarosalSlider";
import useWindowSize from "../../../utils/Hooks/useWindowsSize";
import ClubLoyalty from "../ClubLoyalty";
import Link from "next/link";

const SlidContentStyle = {
    height: "calc(100vw/3.5)",
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
}

const fetureCardsDetails = [
    {
        src: 'images/deposit.png',
        title: 'Instant withdrawals & Deposits'
    },
    {
        src: 'images/live.png',
        title: 'Live Stream of Events'
    },
    {
        src: 'images/nonstop.png',
        title: '24/7 Customer Services'
    },
    {
        src: 'images/bonus.png',
        title: '15% Referral Bonus'
    }
];

const moreGameDetails = [
    {src:'images/game1.png'},
    {src:'images/game2.png'},
    {src:'images/game3.png'},
    {src:'images/game4.png'},
    {src:'images/game1.png'},
    {src:'images/game2.png'},
];

const promotionsDetails = [
    {src:'images/promotion-banner-1.png'},
    {src:'images/promotion-banner-2.png'},
    {src:'images/promotion-banner-3.png'},
];

const gameProviderDetails = [
    {src:'images/provider-1.png'},
    {src:'images/provider-2.png'},
    {src:'images/provider-3.png'},
    {src:'images/provider-1.png'},
    {src:'images/provider-2.png'},
    {src:'images/provider-3.png'},
];

const bannerSlides = [
    {path:'images/banner1.png'},
    {path:'images/banner1.png'},
    {path:'images/banner1.png'},
    {path:'images/banner1.png'},
];

const LandingPage = ({bannersData}) => {

    let windowSize = useWindowSize();

    const bannerSliderConfiguration = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };

    const gameDetailsSliderConfig = React.useMemo(()=>({
        dots: false,
        infinite: true,
        slidesToShow: windowSize.width <= 450 ? 1 : (windowSize.width > 450 && windowSize.width <= 770) ? 2 : windowSize.width < 1380 && windowSize.width > 770 ? 3 : 4,
        slidesToScroll: windowSize.width <= 450 ? 1 : (windowSize.width > 450 && windowSize.width <= 770) ? 2 : windowSize.width < 1380 && windowSize.width > 770 ? 3 : 4,
        // slidesToScroll: 3,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "linear",
    }),[windowSize.width]);

    const promotionsSliderConfig = React.useMemo(()=>({
        className: "center",
        centerMode: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 300,
        cssEase: "linear",
        centerPadding: windowSize.width <= 450 ? "30px" : (windowSize.width > 450 && windowSize.width <= 770) ? "55px" : windowSize.width < 1380 && windowSize.width > 770 ? "80px" : "100px",
        nextArrow: windowSize.width <= 350 ? <></> : <div/>,
        prevArrow: windowSize.width <= 350 ? <></> : <div/>,
    }),[windowSize.width]);

    const providerDetailsSliderConfig = React.useMemo(()=>({
        dots: false,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }),[windowSize.width]);


    return (
        <div className={styles.mainContainer}>
            <div className={styles.sliderBox} style={{width: '100%'}}>
                <CarouselSlider sliderConfiguration={bannerSliderConfiguration}>
                    {(bannersData?.bannerPaths?.desktop?.length > 1 ? bannersData?.bannerPaths?.desktop : [...bannersData?.bannerPaths?.desktop, ...bannersData?.bannerPaths?.desktop])?.map((item, index)=>(<div key={`banner_Slides_${index}`}><img src={item?.path} width='100%'/></div>)) }
                    {/*{bannerSlides?.map((item, index)=>(<div key={`banner_Slides_${index}`}><img src={item?.path} width='100%'/></div>))}*/}
                </CarouselSlider>
            </div>

            <section className={styles.firstContentBox}>
                <span className={styles.heading2}>Lorem ipsum dolor sit amet, consectetur adipiscing quis nunc.</span>
                <span className={styles.infoText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque arcu, ut
                  urna blandit massa pellentesque massa. Posuere pulvinar eget risus aliquam in. Tristique magna
                  sagittis mattis sed proin odio eget tellus.</span>
                <Button text='Join Now' type='primary' ><Link href='/login' >Join</Link></Button>
            </section>

            <section className={styles.featureBox}>
                {fetureCardsDetails.map((item, index) => (
                    <div className={styles.cardBox} key={`feature_card_details_${index}`}>
                        <FeatureCard title={item.title} src={item.src}/>
                    </div>
                ))}
            </section>

            <section className={styles.secondContentBoxSection}>
                <div className={styles.secondContentBox}>
                    <div>
                        <span className={styles.heading2}>LOREM IPSUM DOLOR SIT , CONSECTETUR ADIPISCING ?</span>
                        <span className={styles.infoText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet et a urna maecenas lacus, euismod id at ac. Velit elit mattis pretium turpis lectus. Interdum vel orci nunc egestas enim.</span>
                        <Button text='Join Now' type='primary'><Link href='/login' >Join</Link></Button>
                    </div>
                    <div className={styles.videoPlayer}>
                        <img src="images/video-poster.png" alt="Video" width='100%' height='100%'/>
                        <span className={styles.playBtn}>
                        <img src="images/play.png" alt="play icon" width='100%'/>
                    </span>
                    </div>
                </div>
            </section>

            <section className={styles.thirdContentBox}>
                <div>
                    <div className={styles.heading2}>Know More About Games</div>
                    <div className={styles.infoText}>Gaming is our Passion , We create fun Games that you'll Love.</div>
                </div>
                <div className={styles.gameDetailsSlider}>
                    <CarouselSlider sliderConfiguration={gameDetailsSliderConfig}>
                        {moreGameDetails?.map((item,index)=>(
                            <div className={styles.sliderCard} key={`game_details_slides_${index}`}><img src={item.src} width='90%'/></div>
                        ))}
                    </CarouselSlider>
                </div>
            </section>

            <section className={styles.clubLoyaltySection}>
                <h2>club loyalty</h2>
                <h4>club loyalty</h4>
                <div className={styles.loyaltyCardSlider}>
                    <ClubLoyalty />
                </div>

                <div className={styles.btnGroup}>
                    <Button >Know More </Button>
                    <Button type='primary'><Link href='/login' >Join</Link></Button>
                </div>
            </section>

            <section className={styles.promotionsSection}>
                <div className={styles.promotionsBox}>
                    <div className={styles.promotionsHeadingBox}>
                        <div className={styles.heading2}>
                            promotions
                        </div>
                        <div className={styles.infoText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo augue scelerisque
                        </div>
                    </div>
                    <div className={styles.promotionsCardSlider}>
                        <CarouselSlider sliderConfiguration={promotionsSliderConfig} >
                            {promotionsDetails?.map((item,index)=>(
                                <div className={styles.sliderCard} key={`promotions_details_${index}`}><img src={item.src} width='95%'/></div>
                            ))}
                        </CarouselSlider>
                    </div>

                    <div className={styles.btnGroup}>
                        <Button >Know More </Button>
                        <Button type='primary'><Link href='/login' >Join</Link></Button>
                    </div>
                </div>
            </section>

            <section className={styles.gameProviderSection}>
                <div className={styles.heading2}>
                    Game Provider
                </div>
                <div className={styles.gameProviderSliderBox}>
                    <CarouselSlider sliderConfiguration={providerDetailsSliderConfig} >
                    {gameProviderDetails?.map((item,index)=>(
                        <div className={styles.providerCardBox} key={`provider_details_${index}`}><div className={styles.providerCard}><img src={item.src} width='100%'/></div></div>
                    ))}
                    </CarouselSlider>
                </div>
            </section>

            <section className={styles.downloadAppTemplate}>
                <img src="images/app-bannerr.png" alt="Download App"/>
            </section>

            <section className={styles.paymentMethodsSection}>
                <h2 className={styles.paymentHeading}> our Payment Methods </h2>
                <div className={styles.paymentCards}>
                    <div className={styles.paymentCard}><img src="images/upi.png" width={110} height={50}
                                                             alt="UPI Payment"/></div>
                    <div className={styles.paymentCard}><img src="images/ethereum.png" width={110} height={50}
                                                             alt="ethereum Payment"/></div>
                    <div className={styles.paymentCard}><img src="images/bitcoin.png" width={110} height={50}
                                                             alt="Bitcoin Payment"/></div>
                    <div className={styles.paymentCard}><img src="images/cards.png" width={110} height={50}
                                                             alt="Card Payment"/></div>
                </div>
            </section>
        </div>
    )
};

export default LandingPage;