import React from 'react';


import styles from './ReferralPage.module.css';
import BackwardNavBar from "../BackwardNavBar";
import Table from "../Table";
import AccordionContainer from "../../view/AccordianContainer";

const AccordionContant = () =>{
    return(
        <div className={styles.AccordionContentBody}>
            <p className="mainheading">The standard Lorem Ipsum passage, used since the 1500s ?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio sit lobortis egestas enim. Dolor adipiscing
                lorem arcu nunc, malesuada vel eleifend. Nunc laoreet cras pellentesque quam faucibus bibendum
                pellentesque tincidunt. At risus in augue ipsum nibh sed. Aliquam duis pellentesque dis amet molestie
                orci.
                Posuere tincidunt lacus consectetur mauris posuere magna varius dignissim auctor.</p>
        </div>
    )
}

const data = [
    { title: 'The standard Lorem Ipsum passage, used since the 1500s ?', content: <AccordionContant />,},
    { title: 'The standard Lorem Ipsum passage, used since the 1500s ?', content: <AccordionContant />  },
    { title: 'The standard Lorem Ipsum passage, used since the 1500s ?', content: <AccordionContant />  },
    // Add more dummy data as needed
];

const ReferralPage = () =>{


    return(
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={"Referral"}/>
            <div className={styles.innerContainer}>

                <section className={styles.refferalBannerSection}>
                    <img src="images/refferal-banner.png" alt="Invite Your Friends and Earn Money" width='100%'/>
                </section>

                <section className={styles.tableSection}>
                    <Table greenNote=''/>
                </section>

                <section className={`${styles.shareReferralSection}`}>
                    <div className={styles.outerBox}>
                        <div>Share Your Referral Link :</div>
                        <div className={styles.shareLinkBox}><a href='https://LoremIpsum/ReferralLink/8kanb24qw/DummyLinkGoesHere' target='_blank'>https://LoremIpsum/ReferralLink/8kanb24qw/DummyLinkGoesHere </a>
                            <img src='images/copy.svg'/>
                        </div>
                    </div>

                    <div className={styles.outerBox}>
                        <div className={styles.orTag}>
                            OR
                        </div>
                    </div>

                    <div className={styles.outerBox}>
                        <div>Share Via Social Media :</div>
                        <div className={styles.shareIconBox}>
                            <img src="./images/facebook.svg" alt="facebook"/>
                            <img src="./images/insta.svg" alt="insta"/>
                            <img src="./images/whatsapp.svg" alt="whatsapp"/>
                            <img src="./images/twitter.svg" alt="Twitter"/>
                        </div>
                    </div>

                    <div className={styles.outerBox}>
                        <div className={styles.orTag}>
                            OR
                        </div>
                    </div>

                    <div className={styles.outerBox}>
                        <div>Referral Code :</div>
                        <div className={styles.shareLinkBox}>
                            <a href='#'>JOHNXV500</a>
                            <img src='images/copy.svg'/>
                        </div>
                    </div>
                </section>

                <section className={styles.refferalEarnedSection}>
                            <div className={`${styles.refferalEarnedCard}`}>
                                <div>Referrals</div>
                                <div className={styles.earnedAmountText}>0</div>
                            </div>

                            <div className={`${styles.refferalEarnedCard}`}>
                                <div >Credits Earned</div>
                                <div className={styles.earnedAmountText}>0</div>
                            </div>
                </section>

                <section className={styles.affiliateSection}>
                    <div className={styles.title}>Affiliate</div>
                    <div className={styles.infoText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat id est sociis et proin.</div>
                <AccordionContainer
                    data={data}
                    accordionHeaderStyle={{background: '#101923', fontSize : '0.9rem'}}
                />
                </section>
            </div>
        </div>
    )
};

export default ReferralPage;