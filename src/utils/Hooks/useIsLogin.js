import React, { useState, useEffect } from 'react';

const useIsLogin = () => {
    const [isLogin, setIsLogin] = useState();

    useEffect(() => {
        setIsLogin(localStorage.getItem('isLogin') === 'true');
        const handleStorageChange = () => {
            setIsLogin(localStorage.getItem('isLogin') === 'true');
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return isLogin;
};

export default useIsLogin;