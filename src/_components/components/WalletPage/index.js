import React from 'react';
import BackwardNavBar from "../BackwardNavBar";
import WalletCard1 from "../WalletCard1";
import styles from './WalletPage.module.css';
import WalletCard2 from "../WalletCard2";
import BonusTransfers from "../BonusTransfers";
import Button from "../../view/Button";
import InfoPoints from "../InfoPoints";
import ProfileIconButton from "../ProfileIconButton";

const infoPoints = [
    { point : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'},
    { point : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'},
    { point : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'},
    { point : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'},
    { point : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'},
    { point : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'},
    { point : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'},
    { point : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'},
    { point : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'},
]

const WalletPage = () => {
    return (
        <div className={styles.mainContainer}>
            <BackwardNavBar pageName={"Wallet"} reference={true}/>
            <div className={styles.innerContainer}>

                <section className={`row`}>
                    <div className={`col col-md-6 col-sm-12 ${styles.profileBox}`}>
                        <ProfileIconButton size='80' content='Hi, John Doe' name='JD' bg='#212d3b'/>
                    </div>
                </section>

                <section className={`row`}>
                    <div className={`col col-md-6 col-sm-12`}>
                        <WalletCard1/>
                    </div>
                    <div className={`col col-md-6 col-sm-12`}>
                        <WalletCard2/>
                    </div>
                </section>

                <section className={`row`}>
                    <div className={`col col-md-6 col-sm-12`}>
                        <div className={styles.giftCardBox}>
                            <h4>YOUR GIFT CARD</h4>
                            <img src="images/gift-card.png" alt='Gift Card' width='100%'/>
                            <div className={styles.btnBox}>
                                <Button type="submit" className={styles.submitBtn}>Redeem Gift Card</Button>
                            </div>
                        </div>
                    </div>
                    <div className={`col col-md-6 col-sm-12`}>
                        <div>
                            <BonusTransfers/>
                            <BonusTransfers/>
                            <div className={styles.btnBox}>
                                <Button type="submit" className={styles.submitBtn}>View All Transactions</Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.conditionsSection}>
                    <h2 className={styles.heading}>
                       Conditions
                    </h2>
                    <div className={styles.conditionsBox}>
                        <div className={`row`}>
                            <div className={`col col-md-4 col-sm-12`}>
                                <div className={styles.title}>Deposit :</div>
                                <InfoPoints data={infoPoints}/>
                            </div>
                            <div className={`col col-md-4 col-sm-12`}>
                                <div className={styles.title}>Withdrawal :</div>
                                <InfoPoints data={infoPoints}/>
                            </div>
                            <div className={`col col-md-4 col-sm-12`}>
                                <div className={styles.title}>Bonus :</div>
                                <InfoPoints data={infoPoints}/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
};

export default WalletPage;