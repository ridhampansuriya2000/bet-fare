import React from 'react';
import { useRouter } from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import Link from "next/link";
import PhoneNumber from "../../view/PhoneNumberField";
import styles from './ForgotPasswordForm.module.css';
import {forgotPassword, loginUser, verifyOTP} from "../../../store/action/authAction";
import {convertToFirstLetterTitleCase} from "../../../utils/helperFunctions";

const ForgotPasswordForm = () =>{
    const router = useRouter();
    const dispatch = useDispatch();

    const {forgotPasswordError} = useSelector((state)=>({
        forgotPasswordError : state.auth?.error
    }))

    const [formData, setFormData] = React.useState({
        value : {
            phone_number: "",
            // password: "",
        },
        error:{}
    });
    // const [error,setError] = React.useState(forgotPasswordError?.[0]);
    const [disabled, setDisabled] = React.useState(false);
    const [otpSent, setOtpSent] = React.useState(false);

    React.useEffect(()=>{
        setFormData((preState)=>({
            ...preState,
            error : forgotPasswordError
        }))
        // setError(loginError?.[0]);
    },[forgotPasswordError])

    const handleChange = (e) =>{
        let {name, value} = e.target;
        if(name === "phone_number"){
            otpSent && setOtpSent(false);
        }
        setFormData((preState)=>({
            ...preState,
            value : {
                ...preState.value,
                [name] : value
            },
            error : {
                [name] : ''
            }
        }))
    };


    const checkValidation = (callBack) =>{
        let errorObj = {};
        Object.keys(formData.value).forEach((item)=>{
            if(!formData.value[item]){
                errorObj = { ...errorObj, [item] : `${convertToFirstLetterTitleCase(item)} is required`}
            }

        });
        setFormData((preState)=>({
            ...preState,
            error : errorObj,
        }));
        callBack(errorObj);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.preventDefault();
        setDisabled(true);
        await checkValidation(async (error)=>{
            if(Object.keys(error)?.every((item)=> error[item] === '') || formData.error === {}){
               if(!otpSent){
                   let res = await dispatch(forgotPassword(formData.value,router));
                   if(res.statusCode === 200){
                       setOtpSent(true)
                   }
               }else {
                   let res = await dispatch(verifyOTP(formData.value,router));
                   if(res.statusCode === 200){
                       setOtpSent(true)
                   }
               }
            }
        });
        setDisabled(false);

    }

    return (
        <div className={styles.mainContainer}>
            <div  className={styles.formBox}>
                <h1 className={styles.heading}>Sign In</h1>
                <div>
                    <form className={styles.form} onSubmit={handleSubmit}>

                        <PhoneNumber
                            label='Registered Phone Number'
                            placeholder='Enter your registered Phone Number'
                            name="phone_number"
                            value={formData?.value?.phone_number}
                            error={formData?.error?.phone_number}
                            onChange={handleChange}
                            containerStyle={{marginBottom:'10px'}}
                        />

                        {otpSent &&
                        <PhoneNumber
                            placeholder='Enter OTP'
                            name="forgot_password_otp"
                            value={formData?.value?.forgot_password_otp}
                            error={formData?.error?.forgot_password_otp}
                            onChange={handleChange}
                            // containerStyle={{marginBottom:'20px'}}
                        />}

                        {!otpSent &&
                        <p className={styles.infoText}>** A 4 digit OTP will be sent via SMS to verify your mobile number! </p>}

                        <div className="col-12 mt-4">
                            <button className={styles.loginBtn} type='submit' >{otpSent ? "Verify OTP" : 'Sent OTP'}</button>
                        </div>
                    </form>
                </div>
            </div >

            <div className={styles.actionTextBox}>
                <div className={styles.actionText} ><span className={styles.actionGreenText} ><Link href={'/login'}>Login</Link></span></div>
            </div>
        </div>
    )
};

export default ForgotPasswordForm;