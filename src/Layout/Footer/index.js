import React from "react";
import styles from "./Footer.module.css";
import Logo from "../../_components/components/Logo";

const Footer = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.flexContainer}>
            <div className={styles.firstContent}>
                {/*<img src="images/logo-footer.png" alt="Logo" className="mb-4" width={200}/>*/}
                <Logo />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl donec urna tristique eu eget
                    neque.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl donec urna tristique eu eget
                    neque.
                </p>
            </div>
            <div className={styles.secondContent}>
                <div>
                    <h3> Quick Links </h3>
                    <ul className={styles.links}>
                        <li>
                            <a href="">Link1 Here</a>
                        </li>
                        <li>
                            <a href="">Link2 Here</a>
                        </li>
                        <li>
                            <a href="">Link3 Here</a>
                        </li>
                        <li>
                            <a href="">Link4 Here</a>
                        </li>
                        <li>
                            <a href="">Link5 Here</a>
                        </li>
                        <li>
                            <a href="">Link6 Here</a>
                        </li>
                    </ul>
                </div>

                <div className="">
                    <h3> Quick Links </h3>
                    <ul className={styles.links}>
                        <li>
                            <a href="">Link1 Here</a>
                        </li>
                        <li>
                            <a href="">Link2 Here</a>
                        </li>
                        <li>
                            <a href="">Link3 Here</a>
                        </li>
                        <li>
                            <a href="">Link4 Here</a>
                        </li>
                        <li>
                            <a href="">Link5 Here</a>
                        </li>
                        <li>
                            <a href="">Link6 Here</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.thirdContent}>
                <h3> Follow Us </h3>
                <ul className="">
                    <li>
                        <a href="">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                    </li>
                </ul>
                <div className={styles.disclaimer}>
                    <h5>Disclaimer</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque arcu, ut urna
                        blandit massa
                        pellentesque massa. Posuere pulvinar eget risus aliquam in. Tristique magna sagittis
                        mattis sed
                        proin odio eget tellus.</p>
                </div>
            </div>
            </div>
            <div className={styles.termConditionBox}>
                <div>© copyright 2022. All Rights Reserved.</div>
                <div>
                    <span>Terms of Use</span>
                    <span>Privacy Policy</span>
                </div>
            </div>

        </div>
    )
};

export default Footer;