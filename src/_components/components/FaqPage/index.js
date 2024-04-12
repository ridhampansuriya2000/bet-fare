import React from 'react';


import styles from './FaqPage.module.css';
import BackwardNavBar from "../BackwardNavBar";
import AccordionContainer from "../../view/AccordianContainer";
import MultiAccordionContainer from "../../view/MultiAccordionContainer";

const dummyData = [
    { title: 'Section 1', content: [
            { title: 'Section 1', content: 'Content for section 2 goes here.' },
            { title: 'Section 2', content: 'Content for section 2 goes here.' },
            { title: 'Section 3', content: 'Content for section 3 goes here.' },
            // Add more dummy data as needed
        ] },
    { title: 'Section 2', content: [
            { title: 'Section 1', content: 'Content for section 2 goes here.' },
            { title: 'Section 2', content: 'Content for section 2 goes here.' },
            { title: 'Section 3', content: 'Content for section 3 goes here.' },
            // Add more dummy data as needed
        ] },
    { title: 'Section 3', content: [
            { title: 'Section 1', content: 'Content for section 2 goes here.' },
            { title: 'Section 2', content: 'Content for section 2 goes here.' },
            { title: 'Section 3', content: 'Content for section 3 goes here.' },
            // Add more dummy data as needed
        ] },
    { title: 'Section 4', content: [
            { title: 'Section 1', content: 'Content for section 2 goes here.' },
            { title: 'Section 2', content: 'Content for section 2 goes here.' },
            { title: 'Section 3', content: 'Content for section 3 goes here.' },
            // Add more dummy data as needed
        ] },
    { title: 'Section 5', content: [
            { title: 'Section 1', content: 'Content for section 2 goes here.' },
            { title: 'Section 2', content: 'Content for section 2 goes here.' },
            { title: 'Section 3', content: 'Content for section 3 goes here.' },
            // Add more dummy data as needed
        ] },
    { title: 'Section 6', content: [
            { title: 'Section 1', content: 'Content for section 2 goes here.' },
            { title: 'Section 2', content: 'Content for section 2 goes here.' },
            { title: 'Section 3', content: 'Content for section 3 goes here.' },
            // Add more dummy data as needed
        ] },
    { title: 'Section 7', content: [
            { title: 'Section 1', content: 'Content for section 2 goes here.' },
            { title: 'Section 2', content: 'Content for section 2 goes here.' },
            { title: 'Section 3', content: 'Content for section 3 goes here.' },
            // Add more dummy data as needed
        ] },
    // Add more dummy data as needed
];

const FaqPage = () =>{
    return(
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={"Faq"}/>
            <div className={styles.innerContainer}>
                <div className={`${styles.justifyCenter} mt-20`}>
                    <h2>FAQ</h2>
                </div>
                <MultiAccordionContainer data={dummyData}/>
            </div>
        </div>
    )
};

export default FaqPage;