import {logOutUser} from "../store/action/authAction";

export const appInfoPath = [
    {
        path : '/underage',
        icon : 'images/privacy-icon.svg',
        alt : 'Underage gambling',
        access : ['B2B',"B2C"],
    },
    {
        path : '/kyc',
        icon : 'images/tc-icon.svg',
        alt : 'KYC',
        access : ['B2B',"B2C"],
    },
    {
        path : '/rules-regulations',
        icon : 'images/rules-regulation.svg',
        alt : 'Rules & Regulations',
        access : ['B2B',"B2C"],
    },
    {
        path : '/responsible-gambling',
        icon : 'images/privacy-icon.svg',
        alt : 'Responsible Gambling',
        access : ['B2B',"B2C"],
    },
    {
        path : '/exclusion-policy',
        icon : 'images/tc-icon.svg',
        alt : 'Exclusion Policy',
        access : ['B2B',"B2C"],
    },
    {
        path : '/terms-conditions',
        icon : 'images/tc-icon.svg',
        alt : 'Terms of Use',
        access : ['B2B',"B2C"],
    },
    {
        path : '/privacy-policy',
        icon : 'images/privacy-icon.svg',
        alt : 'Privacy Policy',
        access : ['B2B',"B2C"],
    },
    // {
    //     path : '/',
    //     icon : 'images/market-icon.svg',
    //     alt : 'Market',
    // },
    // {
    //     path : '/about-us',
    //     icon : 'images/news-icon.svg',
    //     alt : 'About Us',
    // },
    // {
    //     path : '/about-us',
    //     icon : 'images/about-us-icon.svg',
    //     alt : 'News',
    // },
    // {
    //     path : '/',
    //     icon : 'images/tutorials-icon.svg',
    //     alt : 'Tutorials',
    // },
    // {
    //     path : '/faq',
    //     icon : 'images/faq-icon.svg',
    //     alt : 'FAQ',
    // },
    // {
    //     path : '/promotions',
    //     icon : 'images/promotion-icon.svg',
    //     alt : 'Promotions',
    // },
    // {
    //     path : '/loyalty',
    //     icon : 'images/loyality.svg',
    //     alt : 'Loyalty',
    // },
    // {
    //     path : '/affiliates',
    //     icon : 'images/affiliate-icon.svg',
    //     alt : 'Affiliate',
    // },
    // {
    //     path : '/',
    //     icon : 'images/app-icon.svg',
    //     alt : 'Android/IOS',
    // },

];

export const accountInfoPath = [
    {
        path : '/my-deposits',
        icon : 'images/transfer-icon.svg',
        alt : 'My Deposit',
        access : ["B2C"],
    },
    {
        path : '/my-withdrawls',
        icon : 'images/transfer-icon.svg',
        alt : 'My Withdrawls',
        access : ["B2C"],
    },
    {
        path : '/my-transactions',
        icon : 'images/deposit-icon.svg',
        alt : 'Transfer Statement',
        access : ['B2B',"B2C"],
    },
    // {
    //     path : '/about-us',
    //     icon : 'images/users-icon.svg',
    //     alt : 'Refer and Earn',
    // },
    // {
    //     path : '/about-us',
    //     icon : 'images/star-icon.svg',
    //     alt : 'Favourites',
    // },
    // {
    //     path : '/',
    //     icon : 'images/notification-icon.svg',
    //     alt : 'Notification',
    // },
    {
        path : '/profit-loss',
        icon : 'images/privacy-icon.svg',
        alt : 'Betting P&L',
        access : ['B2B',"B2C"],
    },
    // {
    //     path : '/faq',
    //     icon : 'images/rules-icon.svg',
    //     alt : 'Rules & Regulations',
    // },
    {
        path : '/setting',
        icon : 'images/setting-icon.svg',
        alt : 'Settings',
        access : ['B2B',"B2C"],
    },
    {
        path : '/change-password',
        icon : 'images/setting-icon.svg',
        alt : 'Change Password',
        access : ['B2B',"B2C"],
    },
    {
        path : '/profile',
        icon : 'images/user-icon.svg',
        alt : 'Profile',
        access : ['B2B',"B2C"],
    },
    // {
    //     path : '/affiliates',
    //     icon : 'images/transaction-icon.svg',
    //     alt : 'My Transactions',
    // },
    // {
    //     path : '/terms-conditions',
    //     icon : 'images/Wallet-light.svg',
    //     alt : 'My Wallet',
    // },
    // {
    //     path : '/',
    //     icon : 'images/feedback-icon.svg',
    //     alt : 'Feedback',
    // },
    {
        path : '/',
        icon : 'images/logout-icon.svg',
        alt : 'Logout',
        access : ['B2B',"B2C"],
        action : (dispatch)=>{
            localStorage.clear();
            dispatch(logOutUser());
        }
    },

]