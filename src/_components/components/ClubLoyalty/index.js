import React from 'react';
import styles from './ClubLoyalty.module.css';
import CarouselSlider from "../../view/CarosalSlider";
import LoyaltyCard from "../LoyaltyBenifitsCard";
import useWindowSize from "../../../utils/Hooks/useWindowsSize";


const loyalityCardDetails = [
    {
        title:'Silver',
        benifits:['Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.'],
        turnover:'₹10L',
    },
    {
        title:'Gold',
        benifits:['Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.'],
        turnover:'₹10L',
    },
    {
        title:'Platinum',
        benifits:['Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.'],
        turnover:'₹10L',
    }
];

const ClubLoyalty = () =>{
    let windowSize = useWindowSize();

    const sliderConfiguration = React.useMemo(()=>({
        dots: false,
        infinite: true,
        slidesToShow: windowSize.width <= 700 ? 1 : windowSize.width < 1100 && windowSize.width > 700 ? 2 : 3,
        slidesToScroll: 1,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 5000,
        cssEase: "linear",
        nextArrow: <></>,
        prevArrow: <></>,
    }),[windowSize.width]);

    return(
        <div className={styles.mainContainer}>
            {/*<div className={styles.loyaltyCardSlider}>*/}
                <CarouselSlider sliderConfiguration={sliderConfiguration} >
                    {
                        loyalityCardDetails.map((item,index)=>(
                            <LoyaltyCard {...item} key={`Loyalty_card_${index}`}/>
                        ))
                    }
                </CarouselSlider>
            {/*</div>*/}
        </div>
    )
};

export default ClubLoyalty;