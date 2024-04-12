import React  from 'react';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from './Slider.module.css';

const slidesDefaultProps = [
    {
        background: `url("images/banner1.png")`,
    },
    {
        background: `url("/images/banner1.png")`,
    },
    {
        background: `url("/images/banner1.png")`,
    },
];


const Slide = ({SlidContent, ...props }) => (
    <div {...props}>
        <SlidContent {...props}/>
    </div>
);


function CustomSlider({
                          height="700px",
                          width='100%',
                          slides=slidesDefaultProps,
                          SlidContent
                      }) {
    return (
        <Carousel
            width={width}
            showStatus={false}
            showThumbs={false}
            showIndicators={false}
            renderArrowNext={(clickHandler, hasNext) => (
                <button
                    className={`${styles['round-arrows']} ${styles['right-arrow']}`}
                    onClick={clickHandler}
                    disabled={!hasNext}
                >
                    <SlArrowRight size={20} color={`${!hasNext ?  "#ffffff" : '#44404066'}`}/>
                </button>
            )}
            renderArrowPrev={(clickHandler, hasPrev) => (
                <button
                    className={`carousel-arrows ${styles['round-arrows']} ${styles['left-arrow']}`}
                    onClick={clickHandler}
                    disabled={!hasPrev}
                >
                    <SlArrowLeft size={20} color={`${!hasPrev ?  "#ffffff" : '#44404066'}`} />
                </button>
            )}
        >
            {slides?.map((slide, index) => (
                <Slide key={index} height={height} {...slide} SlidContent={SlidContent}/>
            ))}
        </Carousel>
    )
};

export default CustomSlider;