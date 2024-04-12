import React from 'react';
import { useRouter } from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import Link from "next/link";
import PhoneNumber from "../../view/PhoneNumberField";
import styles from './loginForm.module.css';
import TextField from "../../view/TextField";
import fetchData from "../../../utils/httpAction";
import {loginUser} from "../../../store/action/authAction";
import {convertToTitleCase} from "../../../utils/helperFunctions";

const LoginForm = () =>{

    const router = useRouter();
    const dispatch = useDispatch();

    const {loginError} = useSelector((state)=>({
        loginError : state.auth?.error
    }))

    const [formData, setFormData] = React.useState({
        value : {
            username: "",
            password: "",
            timezone: 'Asia/Calcutta',
        },
        error:{}
    });
    const [error,setError] = React.useState(loginError?.[0]);
    const [disabled, setDisabled] = React.useState(false);

    React.useEffect(()=>{
        setError((Array.isArray(loginError) && loginError?.[0] )|| loginError);
    },[loginError])

    const handleChange = (e) =>{
        let {name, value} = e.target;
        if(name === "phone_number"){
            value = value.replace(/[^0-9]/g, '');
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
                errorObj = { ...errorObj, [item] : `${convertToTitleCase(item)} is required`}
            }

        });
        setFormData((preState)=>({
            ...preState,
            error : errorObj,
        }));
        callBack(errorObj);
    }

    const handleSubmit = async (e) => {
        setError('');
        e.preventDefault();
        setDisabled(true);
        await checkValidation(async (error)=>{
            if(Object.keys(error)?.every((item)=> error[item] === '') || formData.error === {}){
                dispatch(loginUser(formData.value,router))
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

                        <TextField
                            label='Username'
                            placeholder="Username"
                            name="username"
                            value={formData.value.username}
                            error={formData.error.username}
                            onChange={handleChange}
                        />

                        <TextField
                            label='Password'
                            placeholder='Password'
                            name='password'
                            value={formData.value.password}
                            error={formData.error.password}
                            autoComplete="new-password"
                            onChange={handleChange}
                        />

                        <div className={styles.errorMsg}>{error}</div>

                        {/*<TextField*/}
                        {/*    label='Timezone'*/}
                        {/*    placeholder='Timezone'*/}
                        {/*    name='timezone'*/}
                        {/*    value={formData.value.timezone}*/}
                        {/*    error={formData.error.timezone}*/}
                        {/*    autoComplete="new-password"*/}
                        {/*    onChange={handleChange}*/}
                        {/*/>*/}

                      {/*  <PhoneNumber
                            label='Phone Number'
                            placeholder='Phone Number'
                            containerStyle={{marginBottom:'20px'}}
                        />
                        <p className={styles.infoText}>** A 4 digit OTP will be sent via SMS to verify your mobile number! </p>*/}

                        <div className="col-12 mt-4">
                            <button className={styles.loginBtn} type='submit' >Continue</button>
                        </div>
                    </form>
                </div>
            </div >

            <div className={styles.actionTextBox}>
                <div className={styles.actionText} >Continue as <span className={styles.actionGreenText}>guest</span></div>
                <div className={styles.actionText} >Don’t have an account? <span className={styles.actionGreenText} ><Link href={'/signup'}>Sign up</Link></span></div>
                <div className={styles.actionText} ><span className={styles.actionBlueText} ><Link href={'/forgotpassword'}>Forgot Password</Link></span></div>
            </div>
        </div>
    )
};

export default LoginForm;