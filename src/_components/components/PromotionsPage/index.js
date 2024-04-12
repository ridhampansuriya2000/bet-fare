import React from 'react';
import styles from './PromotionsPage.module.css';
import BackwardNavBar from "../BackwardNavBar";
import SubNav from "../SubNav";
import RulesRegulations from "../RulesRegulations";

const subTabs = [
    { title : 'first deposit bonus', path : '/promotions' },
    { title : 'referral bonus', path : '/promotions' },
    { title : 'Weekly average bonus', path : '/promotions' },
    { title : 'bank transfer deposit', path : '/promotions' },
    { title : 'crypto deposit', path : '/promotions' },
]

const PromotionsPage = () => {

    return (
        <div className={styles.mainContainer}>

            <BackwardNavBar pageName={"Promotions"}/>

            <div className={styles.innerContainer}>

                <div className={styles.subNavBox}>
                    <SubNav tabs={subTabs}/>
                </div>

                <div className={styles.promotionBannerBox}>
                    <img src="images/promotion-banner.png" alt="Promotions" width='100%'/>
                </div>

                <dl className={styles.contentBox}>
                    <span className={styles.title}>MAKE A CRYPTO DEPOSIT AND GET A FLAT 10% BONUS!</span>
                    <dd className={styles.content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat amet nisl nascetur justo. Gravida
                        tellus varius varius gravida risus, consectetur ipsum. Lacus, ac nunc urna, sed aenean aliquam
                        odio accumsan lorem. Pellentesque amet vel sodales pulvinar aliquam feugiat cursus. Id sed
                        libero magnis phasellus vitae justo. Faucibus tortor, rutrum est nam et blandit sit aliquam,
                        ipsum. Elementum rhoncus sapien pretium suspendisse nulla. Vel orci turpis nulla posuere
                        consectetur mus nec. Adipiscing lectus tempor ullamcorper potenti sed dignissim. Massa orci
                        faucibus rhoncus orci, sodales egestas ac. At semper condimentum adipiscing diam velit sed.
                        Amet, suscipit ullamcorper volutpat aenean diam morbi urna consectetur. Pretium erat ante
                        vestibulum, neque sit ornare egestas. Dolor arcu purus, vulputate mauris sem feugiat neque.
                        Risus, in sit risus felis morbi. Consectetur a, integer pharetra auctor. Pellentesque aliquet ac
                        mauris, egestas pulvinar. Lacus volutpat vitae at rhoncus ultrices gravida. Fermentum
                        suspendisse consectetur aliquam tellus sagittis. Gravida morbi sit dictum nisi tellus.
                    </dd>
                </dl>

                <section className={styles.rulesRegulationSection}>
                    <RulesRegulations />
                </section>
            </div>

        </div>
    )
};

export default PromotionsPage;