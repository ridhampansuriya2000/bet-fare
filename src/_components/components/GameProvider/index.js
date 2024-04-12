import React from 'react';
import styles from './PaymentMethods.module.css';
import CarouselSlider from "../../view/CarosalSlider";
import useWindowSize from "../../../utils/Hooks/useWindowsSize";

const gameProviderDetails = [
    {src: 'images/provider-1.png'},
    {src: 'images/provider-2.png'},
    {src: 'images/provider-3.png'},
    {src: 'images/provider-1.png'},
    {src: 'images/provider-2.png'},
    {src: 'images/provider-3.png'},
];

const GameProvider = () =>{

    let windowSize = useWindowSize();

    const providerDetailsSliderConfig = React.useMemo(() => ({
        dots: false,
        autoplay: false,
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
    }), [windowSize.width]);

    return(
        <div className={styles.mainContainer}>
            <div className={styles.heading2}>
                Game Provider
            </div>
            <div className={styles.gameProviderSliderBox}>
                <CarouselSlider sliderConfiguration={providerDetailsSliderConfig}>
                    {gameProviderDetails?.map((item) => (
                        <div className={styles.providerCardBox}>
                            <div className={styles.providerCard}><img src={item.src} width='100%'/></div>
                        </div>
                    ))}
                </CarouselSlider>
            </div>
        </div>
    )
};

export default GameProvider;