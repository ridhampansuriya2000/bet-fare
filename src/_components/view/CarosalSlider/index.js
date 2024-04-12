import React from 'react';
import Slider from "react-slick";
import styles from './CarosalSlider.module.css';

const settings = {
    // dots: false,
    // infinite: true,
    // slidesToShow: 3,
    // slidesToScroll: 1,
    // autoplay: false,
    // speed: 2000,
    // autoplaySpeed: 5000,
    // cssEase: "linear",
    // nextArrow: <></>,
    // prevArrow: <></>,
};


const CarouselSlider = ({children,sliderConfiguration=settings}) =>{
    return(
        <Slider {...sliderConfiguration}>
                {children}
        </Slider>
    )
};

export default CarouselSlider;