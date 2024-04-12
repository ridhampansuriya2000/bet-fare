import React from 'react';
import styles from './Layout.module.css';
import TopHead from "./TopHead";
import MainHeader from "./MainHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) =>{
    return(
        <div className={styles.mainContainer}>
            <TopHead/>
            <MainHeader/>
            <Navbar/>
            {children}
            <Footer />
        </div>
    )
};

export default Layout;