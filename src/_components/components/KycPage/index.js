import React from 'react';


import styles from './KycPage.module.css';
import Logo from "../Logo";


const KycPage = () =>{
    return(
        <div className={styles.mainContainer}>
            <div className={styles.innerContainer}>
                <div className={`${styles.justifyCenter} mt-20 mb-20`}>
                    <Logo/>
                </div>

                <div className={styles.contentBox}>

                    <h2>KYC</h2>

                    <p className={styles.content}>We are committed to the highest level of security, hence require all our members to provide us
                        with certain
                        documentation in order to validate their accounts.</p>
                    <p className={styles.content}>Please note that the identification process shall be complete before any withdrawal of funds can
                        take place.</p>

                    <h2>Why do I need to provide documentation?</h2>
                    <p className={styles.content}>There are several reasons:</p>
                    <ul className={styles.noBullets}>
                        <li  className={styles.content}>We are committed to providing a socially responsible platform for online gaming. All of our
                            members must be 18
                            or older and we are bound by our licensing agreement to verify this.
                        </li>
                        <li className={styles.content}>It is in our interests to guarantee maximum security on all transactions.</li>
                        <li className={styles.content}>Our payment processors and licensing agreement require that our policies are in line with
                            international banking
                            standards. A proven business relationship with each and every member is mandatory for the
                            protection of all
                            parties.
                        </li>
                        <li className={styles.content}>By ensuring that your account details are absolutely correct, the inconvenience of 'missing
                            payments' can be
                            avoided. It can take weeks (and sometimes months) to trace, recall and resend using the
                            correct information.
                            This lengthy process also results in additional fees from our processors.
                        </li>
                    </ul>

                    <h2>WHAT DOCUMENTS DO I NEED TO PROVIDE?</h2>

                    <h3>PROOF OF ID:</h3>
                    <p className={styles.content}>A color copy of a valid government issued form of ID (Driver's License, Passport, State ID or
                        Military ID)</p>

                    <h3>PROOF OF ADDRESS:</h3>
                    <p className={styles.content}>A copy of a recent utility bill showing your address</p>
                    <p className={styles.content}>Note: If your government ID shows your address, you do not need to provide further proof of
                        address.</p>
                    <p className={styles.content}>Additional documentation might be required as the company sees fit.</p>

                    <h2>When do I need to provide these documents?</h2>
                    <p className={styles.content}>Please provide these at your earliest possible convenience to avoid any delays in processing your
                        transactions.
                        Documents must be received before any withdrawals are executed. Under special circumstances we
                        may require the
                        documents before further activity (deposits and wagering) can take place on your account</p>
                    <p className={styles.content}>Please understand, if we do not have the required documents on file, your pending withdrawals
                        will be cancelled and
                        credited back to your account. You will be notified when this happens.</p>

                    <h2>How can I send you these documents?</h2>
                    <p className={styles.content}>Please scan your documents, or take a high quality digital camera picture, save the images as
                        jpegs, then <a href="mailto:kyc@verifyexch.com">submit the files here</a>.</p>

                    <h2>How do I know my documents are safe with you?</h2>
                    <p className={styles.content}>All files are protected with the highest level of encryption at every step of the review process.
                        All documentation
                        received is treated with the utmost respect and confidentiality.</p>
                    <p className={styles.content}>We’d like to thank you for your cooperation in helping us make our platform a safer place to
                        play. As always, if you
                        have any questions about this policy, or anything else, don’t hesitate to contact us using
                        the <a href="mailto:contact@verifyexch.com">contact us here</a>.</p></div>
            </div>
        </div>
    )
};

export default KycPage;