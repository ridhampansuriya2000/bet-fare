import React from 'react';
import ProgressStepper from "../ProgressStepper";
import PhoneNumber from "../../view/PhoneNumberField";
import TextField from "../../view/TextField";
import {useRouter} from 'next/router';
import Link from "next/link";
import styles from './SignUpForm.module.css';
import fetchData from "../../../utils/httpAction";
import Button from "../../view/Button";
import {useDispatch} from "react-redux";
import {signupUser} from "../../../store/action/authAction";
import {convertToFirstLetterTitleCase, convertToTitleCase} from "../../../utils/helperFunctions";
import {FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS} from "../../../store/types";

const stepsDummyProps = [
    {count: 1, label: 'Register'},
    {count: 2, label: 'Verify'},
    {count: 3, label: 'Deposit'},
    {count: 4, label: 'Success'},
];

const FirstStep = ({setStep, router}) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = React.useState({
        value : {
            username: "",
            password: "",
            confirm_password: '',
            phone_number : ""
        },
        error:{}
    });

    const [disabled, setDisabled] = React.useState(false);

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
                ...preState.error,
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
            if(item === 'phone_number' && formData.value[item].length !== 10){
                 errorObj = { ...errorObj, [item] : `${convertToFirstLetterTitleCase(item)} should 10 digits`}
            }
            if(item === 'confirm_password' && formData.value[item]){
                if(formData.value?.confirm_password !== formData.value?.password){
                    errorObj = { ...errorObj, [item] : `Confirm Password not same as password`}
                }
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
        await checkValidation(async (errorObj)=>{
            if(Object.keys(errorObj)?.every((item)=> errorObj[item] === ''|| formData.error === {})){
                let obj = {
                    username : formData?.value?.username,
                    password : formData?.value?.password,
                    password_confirmation : formData?.value?.confirm_password,
                    phone_number : formData?.value?.phone_number,
                }
                let res = await dispatch(signupUser(obj,router));
                if(res?.statusCode === 400){
                    setFormData((preState)=>({
                        ...preState,
                        error:{ ...preState.errors,...res?.message}
                    }))
                }else if(res?.statusCode === 200){
                    localStorage.setItem('phone_number',JSON.stringify(formData?.value?.phone_number));
                    setStep(1);
                }
            }
        });
        setDisabled(false);
    };

    const toggleShowPassword = (id) =>{
        const passwordInput = document?.getElementById(id);
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    };

    const ToggleShowPasswordIcon = ({id}) =>{
        const passwordInput = document?.getElementById(id);
        if (passwordInput?.type === "password") {
            return <i className="fas fa-eye" />
        } else {
            return <i className="fas fa-eye-slash"/>
        }
    };

    return (
        <>
            <div className={styles.firstStep}>
                <h1 className={styles.heading}>Register with phone number</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {/*<div className={`row`}>
                        <div className={`col col-md-6`}>
                            <TextField
                                label='First Name'
                                placeholder='First Name'
                                value={formData?.firstName}
                            />
                        </div>
                        <div className={`col col-md-6`}>
                            <TextField
                                label='First Name'
                                placeholder='First Name'
                            />
                        </div>
                    </div>*/}
                    <TextField
                        label='Username'
                        placeholder="Username"
                        name="username"
                        value={formData?.value?.username}
                        error={formData?.error?.username}
                        onChange={handleChange}
                    />

                    <TextField
                        label='password'
                        placeholder='password'
                        name='password'
                        id='password'
                        value={formData?.value?.password}
                        error={formData?.error?.password}
                        type='password'
                        endIcon={<span onMouseDown={()=>toggleShowPassword('password')} onMouseUp={()=>toggleShowPassword('password')}><i className="fas fa-eye" /></span>}
                        autoComplete="new-password"
                        onChange={handleChange}
                    />

                    <TextField
                        label='Confirm password'
                        placeholder='Confirm password'
                        name='confirm_password'
                        id='confirm_password'
                        value={formData?.value?.confirm_password}
                        error={formData?.error?.confirm_password}
                        type='password'
                        endIcon={<span onMouseDown={()=>toggleShowPassword('confirm_password')} onMouseUp={()=>toggleShowPassword('confirm_password')}><i className="fas fa-eye" /></span>}
                        autoComplete="new-password"
                        onChange={handleChange}
                    />
                    <PhoneNumber
                        label='Phone number'
                        placeholder='Phone number'
                        name='phone_number'
                        value={formData?.value?.phone_number}
                        error={formData?.error?.phone_number}
                        onChange={handleChange}
                    />
                    {/*<p className={styles.infoText}>** A 4 digit OTP will be sent via SMS to verify your mobile*/}
                    {/*    number! </p>*/}

                    <div className="col-12">
                        <Button className={styles.submitBtn} type='submit' disabled={disabled} >Continue</Button>
                    </div>
                </form>
            </div>

            <div className={styles.actionTextBox}>
                <div className={styles.actionText}>Already a member? <span
                    className={styles.actionGreenText}> <Link href='/login'>Log in</Link></span></div>
            </div>
        </>
    )
};

const SecondStep = ({setStep, router}) => {

    const [formData, setFormData] = React.useState({
        value : {
            otp: "",
        },
        error:{}
    });
    const handleChange = (e) =>{
        let {name, value} = e.target;
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

    const checkValidation = (callBack=()=>{}) =>{
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

    const verifyOTP = async (errorObj) =>{
        let payload = {
            otp : formData?.value?.otp
        }
        if(Object.keys(errorObj)?.every((item)=> errorObj[item] === '') || formData.error === {}){
            let token = JSON.parse(localStorage.getItem('token'));
            try {
                let res =  await fetchData({method : 'POST', endPoint:'/api/auth/verify-otp', payload:{payload, token}, redirectToLogin:false });
                if(res.status === "Success"){
                    router.push('/login')
                    return res;
                }else{
                    setFormData((preState)=>({...preState,error : {otp : res?.message}}))
                    return res;
                }
            }catch (e) {
                return e;
            }
        }
    };

    const resendOTP = async () =>{
            let token = JSON.parse(localStorage.getItem('token'));
            let phone_number = JSON.parse(localStorage.getItem('phone_number'));
        let payload = {
            phone_number
        }
            try {
                let res =  await fetchData({method : 'POST', endPoint:'/api/auth/resend-otp', payload:{payload, token}, redirectToLogin:false });
                if(res.status === "Success"){
                    setFormData((preState)=>({...preState, message : res?.data}));
                    return res;
                }else{
                    setFormData((preState)=>({...preState,error : {phone_number : res?.message}}));
                    return res;
                }
            }catch (e) {
                return e;
            }
    };

    const handleSubmit = (e, path) => {
        e.preventDefault();
        checkValidation(verifyOTP);
        // setStep(2);
    }

    return (
        <>
            <div className={styles.stepContentBox}>
                <h1 className={styles.heading}>Verify Your Phone Number</h1>
                <div className={styles.subHeadingInfo}> Enter your OTP code here.</div>

                <div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={`row ${styles.otpInputBox}`}>
                            {/*<div className={styles.otpInput}><TextField /></div>
                            <div className={styles.otpInput}><TextField/></div>
                            <div className={styles.otpInput}><TextField/></div>
                            <div className={styles.otpInput}><TextField/></div>
                            <div className={styles.otpInput}><TextField/></div>
                            <div className={styles.otpInput}><TextField/></div>*/}
                            {
                                <PhoneNumber
                                    placeholder='Enter OTP'
                                    name="otp"
                                    value={formData?.value?.otp}
                                    error={formData?.error?.otp}
                                    onChange={handleChange}
                                    // containerStyle={{marginBottom:'20px'}}
                                />}
                        </div>

                        <div className="">
                            <button type="submit" className={styles.submitBtn}>Verify &
                                Proceed
                            </button>
                        </div>
                        {formData?.message &&
                        <div className={styles.resMsg}>
                            {formData?.message}
                        </div>}
                    </form>
                </div>
            </div>

            <div className={styles.actionTextBox}>
                <div className={styles.actionText}> Didn’t get the code? <span
                    className={styles.actionGreenText} onClick={resendOTP}> RESEND </span></div>
            </div>
        </>
    )
};

const ThirdStep = ({setStep}) => {

    const handleNavigate = (e, path) => {
        e.preventDefault();
        setStep(3);
    }

    return (
        <>
            {(false) ? <>
                    <div className={styles.stepContentBox}>
                        <h1 className={styles.heading}> Select Your Payment Method </h1>

                        <div>
                            <form className={styles.form}>
                                <div className={`row `}>
                                    <div className={`col col-xs-12 col-md-6`}>
                                        <div className={styles.paymentCard}><img src="./images/ethereum.png"
                                                                                 alt="ethereum"/></div>
                                    </div>
                                    <div className={`col col-xs-12 col-md-6`}>
                                        <div className={styles.paymentCard}><img src="./images/bitcoin.png" alt="bitcoin"/>
                                        </div>
                                    </div>
                                    <div className={`col col-xs-12 col-md-6`}>
                                        <div className={styles.paymentCard}><img src="./images/upi.png" alt="UPI"/></div>
                                    </div>
                                    <div className={`col col-xs-12 col-md-6`}>
                                        <div className={styles.paymentCard}><img src="./images/cards.png"
                                                                                 alt="Card Payment"/></div>
                                    </div>
                                </div>

                                <div className="col col-xs-12">
                                    <button type="submit" className={styles.submitBtn} onClick={handleNavigate}> Next
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={styles.actionTextBox}>
                        <div className={styles.actionText}> Didn’t get the code? <span
                            className={styles.actionGreenText}> RESEND </span></div>
                    </div>
                </>
                :
                <>
                    <div className={styles.stepContentBox}>
                        <h1 className={styles.heading}> Payment Via Credit/Debit Card </h1>
                        <div className={styles.paymentMethodsImg}><img src="images/payment-method.png"
                                                                       alt="payment-method" width='100%'/></div>
                        <form className={styles.form}>
                            <TextField
                                label='Name on Card'
                                placeholder='Enter Card Holder Name'
                                containerStyle={{marginBottom: '20px'}}
                            />

                            <TextField
                                label='Card Number'
                                placeholder='0000 - 0000 - 0000 - 0000'
                                containerStyle={{marginBottom: '20px'}}
                                autoComplete="new-password"
                            />
                            <div className={`row`}>
                                <div className={`col col-md-6`}>
                                    <TextField
                                        label='Expiry Date'
                                        type='date'
                                    />
                                </div>
                                <div className={`col col-md-6`}>
                                    <TextField
                                        label='CVC/CVV'
                                        placeholder='....'
                                        type="password"
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>

                            <button type="submit" className={styles.submitBtn} onClick={handleNavigate}>Continue
                            </button>
                        </form>
                    </div>

                    <div className={styles.actionTextBox}/>
                </>}
        </>
    )
};

const FourthStep = () => {
    return (
        <>
            <div className={styles.stepContentBox}>
                <div className={styles.successIcon}><img src="/images/success.svg" alt="Success"
                                                         className={styles.successIcon}/></div>
                <h1 className={styles.heading}> Success </h1>
                <div className={`${styles.subHeadingInfo} ${styles.mb20}`}> Congratulations, your account has been
                    successfully created.
                </div>
                <button type="submit" className={styles.submitBtn}>Login</button>
            </div>

            <div className={styles.actionTextBox}/>
        </>
    )
};

const SignUpForm = () => {

    const router = useRouter();

    const handleSignUp = (e) => {
        e.preventDefault();
        // router.push('dashboard');
    }

    const [step, setStep] = React.useState(0);

    const getCurruntStepFrom = (step) => {
        switch (step) {
            case 0 :
                return <FirstStep setStep={setStep}/>
                break;
            case 1 :
                return <SecondStep setStep={setStep}/>
                break;
            case 2 :
                return <ThirdStep setStep={setStep}/>
                break;
            case 3 :
                return <FourthStep setStep={setStep}/>
                break;
            default :
                return null;
        }
    }

   /* React.useEffect(() =>{

        // Redirect away from the signup route if app_type is B2B
        if (process.env.APP_TYPE === 'B2B') {
            // Redirect to another route, e.g., '/'
            router?.replace('/');
            // Return null to prevent rendering of the Signup component
        }
    }, []);*/


    return (
        <div className={styles.mainContainer}>
            {/*<ProgressStepper*/}
            {/*    steps={stepsDummyProps}*/}
            {/*    currentStep={step}*/}
            {/*    containerStyle={{marginBottom: '20px'}}*/}
            {/*/>*/}
            {/*{getCurruntStepFrom(step)}*/}


            {step === 0 && <FirstStep setStep={setStep} router={router}/>}
            {step === 1 && <SecondStep setStep={setStep} router={router}/>}
            {/*{step === 2 && <ThirdStep setStep={setStep}/>}*/}
            {/*{step === 3 && <FourthStep setStep={setStep}/>}*/}

        </div>
    )
};

export default React.memo(SignUpForm);