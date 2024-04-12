import React from 'react';
import styles from './AffiliatesPage.module.css';
import FeatureCard from "../FeatureCard";
import Table from "../Table";

const fetureCardsDetails = [
    {
        src: 'images/comission.svg',
        subTitle: 'Hefty Commissions',
        contentInfo : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu nunc, sit sem laoreet fermentum. Euismod senectus aliquam platea duis quis risus gravida sed.',
    },
    {
        src: 'images/offering.svg',
        subTitle: 'Offerings',
        contentInfo : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu nunc, sit sem laoreet fermentum. Euismod senectus aliquam platea duis quis risus gravida sed.',

    },
    {
        src: 'images/uptodate.svg',
        subTitle: 'Stay Up To Date',
        contentInfo : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu nunc, sit sem laoreet fermentum. Euismod senectus aliquam platea duis quis risus gravida sed.',
    },
    {
        src: 'images/multi-tier.svg',
        subTitle: 'Multi Tier System',
        contentInfo : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu nunc, sit sem laoreet fermentum. Euismod senectus aliquam platea duis quis risus gravida sed.',
    },
    {
        src: 'images/accessible.svg',
        subTitle: 'Easy, Accessible, Efficient',
        contentInfo : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu nunc, sit sem laoreet fermentum. Euismod senectus aliquam platea duis quis risus gravida sed.',
    },
    {
        src: 'images/support.svg',
        subTitle: '24/7 Customer Support',
        contentInfo : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu nunc, sit sem laoreet fermentum. Euismod senectus aliquam platea duis quis risus gravida sed.',
    }
];

const AffiliatesPage = () =>{
    return(
        <div className={styles.mainContainer}>
            <div>
                <section className={styles.featureSection}>
                    <div className={`${styles.heading} mb-10 p-x-10`}>Come Win With Us, Partner!</div>
                    <div className={`${styles.titleInfo} mb-20 p-x-10`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat id est sociis et proin.</div>
                    <div className={`row ${styles.cardBox}`}>
                        {fetureCardsDetails.map((item, index) => (
                            <div className={`${styles.cardBox} col col-xs-12 col-sm-6 col-lg-4 `}>
                                <FeatureCard content={item.content} src={item.src} {...item}/>
                            </div>
                        ))}
                    </div>

                </section>

                <section className={styles.tableSection}>
                    <div className={styles.tableBox}>
                        <Table/>
                    </div>
                </section>
            </div>
        </div>
    )
};

export default AffiliatesPage;