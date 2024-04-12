import React from 'react';
import styles from './PrivacyPolicy.module.css';
import BackwardNavBar from "../../_components/components/BackwardNavBar";
import Logo from "../../_components/components/Logo";

const PrivacyPolicy = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={`${styles.justifyCenter} mt-20 mb-20`}>
                <Logo/>
            </div>

            <div className={styles.contentBox}>
                <dl>
                    <dt className={styles.title}>Privacy Policy</dt>
                    <dd className={styles.content}>At optimized indian horse, one of our main priorities is the privacy of our clients. This
                        Privacy Policy document contains types of information that are collected and processed by
                        optimized indian horse and how we use it.
                    </dd>

                    <dd className={styles.content}>If you have additional questions or require more information about our Privacy Policy, kindly
                        contact us by email at soporte@ optimized indian horse.com.
                    </dd>

                    <dd className={styles.content}>This Privacy Policy applies to our data processing activities and is valid for all our clients
                        with regards to the information that they shared with optimized indian horse. This policy is
                        applicable to any information collected both online and offline.
                    </dd>

                    <dt className={styles.title}>Consent</dt>
                    <dd className={styles.content}>By using our services, you hereby consent to our Privacy Policy and agree to its terms.</dd>

                    <dt className={styles.title}>Information we collect</dt>


                    <dd className={styles.content}>The personal information that you are asked to provide, and the reasons why you are asked to
                        provide it, will be made clear to you at the point we ask you to provide your personal
                        information.
                    </dd>
                    <dd className={styles.content}>If you contact optimized indian horse directly, we may receive additional information about you
                        such as your name, email address, phone number, the contents of the message and/or attachments
                        you may send us, and any other information you may choose to provide.
                    </dd>
                    <dd className={styles.content}>When you register for an Account, we may ask for your contact information, including items such
                        as name, company name, address, email address, and telephone number.
                    </dd>
                    <dt className={styles.title}>How we use your information</dt>
                    <dd className={styles.content}>We use the information we collect in various ways, including to:</dd>

                    <dd className={styles.content}>• Provide, operate, and maintain our website.</dd>
                    <dd className={styles.content}>• Improve, personaddze, and expand our website.</dd>
                    <dd className={styles.content}>• Understand and analyze how you use our website.</dd>
                    <dd className={styles.content}>• Develop new products, services, features, and functionaddty.</dd>
                    <dd className={styles.content}>• Communicate with you, either directly or through one of our partners, including for customer
                        service, to provide you with updates and other information relating to the website, and for
                        marketing and promotional purposes.
                    </dd>
                    <dd className={styles.content}>• Send you emails.
                    </dd>
                    <dd className={styles.content}>• Find and prevent fraud.

                    </dd>
                    <dt className={styles.title}>Site Cookies and Web Beacons</dt>
                    <dd className={styles.content}>Like any other website, optimized indian horse website use 'cookies'. These cookies are used to
                        store information including visitors' preferences, and the pages on the website that the visitor
                        accessed or visited. The information is used to optimize the users' experience by customizing
                        our web page content based on visitors' browser type and/or other information.
                    </dd>
                    <dt className={styles.title}>Third Party Privacy Policies</dt>
                    <dd className={styles.content}> optimized indian horse's Privacy Policy does not apply to other advertisers or websites. Thus,
                        we are advising you to consult the respective Privacy Policies of these third-party ad servers
                        for more detailed information. It may include their practices and instructions about how to
                        opt-out of certain options.
                    </dd>
                    <dd className={styles.content}>You can choose to disable cookies through your individual browser options. To know more detailed
                        information about cookie management with specific web browsers, it can be found at the browsers'
                        respective websites.
                    </dd>
                    <dt className={styles.title}>GDPR Data Protection Rights</dt>
                    <dd className={styles.content}>We would like to make sure you are fully aware of all of your data protection rights.</dd>
                    <dd className={styles.content}>Every user is entitled to the following:</dd>

                    <dd className={styles.content}>• The right to access – You have the right to request copies of your personal data. We may
                        charge you a small fee for this service.
                    </dd>
                    <dd className={styles.content}>• The right to rectification – You have the right to request that we correct any information you
                        believe is inaccurate. You also have the right to request that we complete the information you
                        believe is incomplete.
                    </dd>
                    <dd className={styles.content}>• The right to erasure – You have the right to request that we erase your personal data, under
                        certain conditions.
                    </dd>
                    <dd className={styles.content}>• The right to restrict processing – You have the right to request that we restrict the
                        processing of your personal data, under certain conditions.
                    </dd>
                    <dd className={styles.content}>• The right to object to processing – You have the right to object to our processing of your
                        personal data, under certain conditions.
                    </dd>
                    <dd className={styles.content}>• The right to data portability – You have the right to request that we transfer the data that
                        we have collected to another organization, or directly to you, under certain conditions.
                    </dd>
                    <dd className={styles.content}>• If you make a request, we have one month to respond to you. If you would like to exercise any
                        of these rights, please contact us.
                    </dd>
                    &lt;
                    <dt className={styles.title}>Children's Information</dt>
                    <dd className={styles.content}>Another part of optimized indian horse priority is adding protection for children while using
                        the internet. We encourage parents and guardians to observe, participate in, and/or monitor and
                        guide their online activity.
                    </dd>
                    <dd className={styles.content}> optimized indian horse does not knowingly collect any Personal Identifiable Information from
                        children under the age of 18. If you think that your child provided this kind of information on
                        our website, we strongly encourage you to contact us immediately and we will do our best efforts
                        to promptly remove such information from our records.
                    </dd>

                </dl>
            </div>
        </div>
    )
};

export default PrivacyPolicy;