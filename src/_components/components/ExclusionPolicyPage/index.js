import React from 'react';


import styles from './ExclusionPolicyPage.module.css';
import Logo from "../Logo";


const ExclusionPolicyPage = () =>{
    return(
        <div className={styles.mainContainer}>
            <div className={styles.innerContainer}>
                <div className={`${styles.justifyCenter} mt-20 mb-20`}>
                    <Logo/>
                </div>

                <div className={styles.contentBox}>

                    <h2>SELF EXCLUSION</h2>

                    <h3>What is a self-exclusion?</h3>
                    <p className={styles.content} >Self-exclusion is a facility that the Site offers to help those customers who feel that their
                        gambling is out of control and want us to help them stop. By entering into a self-exclusion
                        agreement with the Site, you will be prevented from using your Account (as defined in the terms
                        and conditions) for a specific period, as determined by you, of between 6 months and 5
                        years.</p>

                    <h3>How to self-exclude from the Site</h3>
                    <p className={styles.content} >If at any time you should you wish to exclude yourself from use of the Site (as defined in the
                        terms and conditions), you must submit this request by email to <a
                            href="mailto:customer.service@verifyexch.com">customer.service@verifyexch.com</a>.</p>
                    <p className={styles.content} >Please inform us of the period for which you wish to self-exclude. The minimum is 6 months and
                        the maximum is 5 years. If you request self-exclusion but do not specify a period, we will
                        exclude you for the minimum period of six months (“Minimum Period”).</p>

                    <h3>How soon after requesting a self-exclusion will it be activated?</h3>
                    <p className={styles.content} >We will endeavour to apply your exclusion as soon as practically possible. Normally, we will be
                        able to reset your password to prevent you accessing the Site within 24 hours of your
                        request.</p>

                    <h3>What happens if I self-exclude?</h3>
                    <p className={styles.content} >We will make all reasonable efforts to:</p>

                    <ol className={styles.orderList}>
                        <li>Prevent any marketing material being forwarded to you;</li>
                        <li>Remove you from any marketing databases operated by us;</li>
                        <li>Suspend your activity by cancelling your ability to access the Site for the period requested
                            by you, or if no period is requested by you, for the Minimum Period; and
                        </li>
                        <li>Permanently close your Customer Account if instructed to do so by you, and return all funds
                            owed to you to your nominated bank account.
                        </li>
                    </ol>

                    <h3>Can I re-activate my Account or open a new Account during the self-exclusion period?</h3>
                    <p className={styles.content} >Accounts that have been self-excluded cannot be reactivated under any circumstances until the
                        expiry of the self-exclusion period.</p>
                    <p className={styles.content} >During the period of your exclusion, you must not attempt to re-open any existing Account(s),
                        seek to open any new Accounts or seek to place bets through any other customer’s Account.</p>

                    <h3>If I would like to re-activate my Account, is this possible?</h3>

                    <p className={styles.content} >At the end of the self-exclusion period, you must contact us in person and confirm such intention
                        in writing. If it is decided (in the Site’s absolute discretion) to permit you to re-open your
                        Account/open a new Account, you should be aware that a 24-hour waiting period will be imposed
                        prior to the Account being available for use.</p></div>
            </div>
        </div>
    )
};

export default ExclusionPolicyPage;