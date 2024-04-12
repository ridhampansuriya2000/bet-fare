import React from 'react';
import styles from './AboutUsPage.module.css';
import BackwardNavBar from "../BackwardNavBar";
import PaymentMethods from "../PaymentMethods";
import GameProvider from "../GameProvider";


const AboutUsPage = () => {

    return (
        <div className={styles.mainContainer}>

            <BackwardNavBar pageName={"About Us"}/>
            <div className={styles.innerContainer}>
                <dl className={styles.contentBox}>
                    <span className={styles.title}>About Us</span>
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
                        suspendisse consectetur aliquam tellus sagittis. Gravida morbi sit dictum nisi tellus. Suscipit
                        arcu ullamcorper semper venenatis ac faucibus cursus felis tristique. Magna scelerisque
                        adipiscing proin eget cursus vitae. Eleifend volutpat, ultricies mi vitae morbi. Diam pharetra,
                        vitae non nam ultricies. Sed eu nulla sit est quam amet pellentesque. Amet, ut odio urna, donec
                        amet sit. Amet magna orci sem integer eu vestibulum dapibus risus. Laoreet et et habitasse vitae
                        a ipsum accumsan at. Et ultricies vulputate quis ultrices. Vitae purus elementum vitae sem
                        tincidunt massa. Enim dui, varius pellentesque aenean in dignissim. Ac nisl lacus, elementum
                        luctus aliquet. Ut urna convallis consectetur eget risus erat posuere vivamus eleifend.
                    </dd>
                </dl>
                <span className={`${styles.bgShadow}`}>
                <dl className={`${styles.contentBox}`}>
                    <span className={styles.title}>Why Us?</span>
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
                        suspendisse consectetur aliquam tellus sagittis. Gravida morbi sit dictum nisi tellus. Suscipit
                        arcu ullamcorper semper venenatis ac faucibus cursus felis tristique. Magna scelerisque
                        adipiscing proin eget cursus vitae. Eleifend volutpat, ultricies mi vitae morbi. Diam pharetra,
                        vitae non nam ultricies. Sed eu nulla sit est quam amet pellentesque. Amet, ut odio urna, donec
                        amet sit. Amet magna orci sem integer eu vestibulum dapibus risus. Laoreet et et habitasse vitae
                        a ipsum accumsan at. Et ultricies vulputate quis ultrices. Vitae purus elementum vitae sem
                        tincidunt massa. Enim dui, varius pellentesque aenean in dignissim. Ac nisl lacus, elementum
                        luctus aliquet. Ut urna convallis consectetur eget risus erat posuere vivamus eleifend.
                    </dd>
                </dl>
                </span>
            </div>

            <section className={styles.socialMediaSection}>
                <div className={styles.title}>
                    Get In Touch
                </div>
                <div className={styles.socialMediaBox}>
                    <img src="images/facebook.svg" alt="Facebook"/>
                    <img src="images/insta.svg" alt="Instagram"/>
                    <img src="images/whatsapp.svg" alt="Whatsapp"/>
                    <img src="images/twitter.svg" alt="Twitter"/>
                </div>
            </section>

            <section className={styles.gameProviderSection}>
            <GameProvider/>
            </section>

            <section className={styles.paymentMethodsSection}>
            <PaymentMethods />
            </section>

        </div>
    )
};

export default AboutUsPage;