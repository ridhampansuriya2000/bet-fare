import React from 'react';


import styles from './OpenBetPage.module.css';
import BackwardNavBar from "../BackwardNavBar";
import AccordionContainer from "../../view/AccordianContainer";
import SubNav from "../SubNav";

const data = [
    { title: 'Unmatched Bets', content: '',emptyContent: <img src="images/caution-icon.svg" alt="caution icon"/> },
    { title: 'Matched Bets', content: '', emptyContent: <img src="images/caution-icon.svg" alt="caution icon"/>  },
    { title: 'Premium Sportsbook Transaction', content: '', emptyContent: <img src="images/caution-icon.svg" alt="caution icon"/>  },
    // Add more dummy data as needed
];

const tabs = [
    { title : 'my bet', path : '/my-bet' },
    { title : 'my market', path : '/my-market' },
]

const OpenBetPage = () =>{
    return(
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={"Open Bet"}/>
            <div className={styles.innerContainer}>
                <SubNav tabs={tabs}/>
                <section>
                    <AccordionContainer data={data}/>
                </section>
            </div>
        </div>
    )
};

export default OpenBetPage;