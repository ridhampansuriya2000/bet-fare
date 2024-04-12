import React from 'react';
import styles from './ChangePassword.module.css';
import TextField from "../../view/TextField";
import Button from "../../view/Button";
import {convertToTitleCase, convertToValidNumber} from "../../../utils/helperFunctions";
import fetchData from "../../../utils/httpAction";
import {LOADER_START, LOADER_STOP} from "../../../store/types";
import {useDispatch} from "react-redux";

const initialFormData = {
    value:{
        oldpassword : "",
        new_password : "",
        confirm_new_password : "",
    },
    error:{}
}

const ChangePassword = ({onSubmit}) =>{

    const dispatch = useDispatch();

    const [formData,setFormData] = React.useState(initialFormData);
    const [loader, setLoader] = React.useState({changePassword: false});

    const stateHandler = (e) =>{
        let {name,value} = e.target;
        setFormData((preState)=>({
            ...preState,
            value:{
                ...preState.value,
                [name] : value,
            },
            error:{
                ...preState.error,
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
            if(item === 'confirm_new_password' && formData.value[item] !== formData.value['new_password']){
                errorObj = { ...errorObj, [item] : `${convertToTitleCase(item)} must be same as new password. `}
            }

        });
        setFormData((preState)=>({
            ...preState,
            error : errorObj,
        }));
        callBack(errorObj);
    }


    const changePasswordAPI = async (e) =>{
        let token = JSON.parse(localStorage.getItem('token'));
        let payload = formData?.value;
        dispatch({type : LOADER_START});
        try{
            setLoader((preState)=>({...preState, changePassword : true}));
            let res =  await fetchData({  method : 'POST', endPoint:`/api/auth/change-password`, payload: {payload, token}});
            if(res?.statusCode === 200){
                setFormData(()=>initialFormData);
                e.target.reset();
            }else {
                setFormData((preState)=>({...preState, error : res.message}))
            }
            setLoader((preState)=>({...preState, changePassword : false}));
            dispatch({type : LOADER_STOP,toaster: {toasterMessage: res?.message, toasterType:'success'}});
        }catch (e) {
            setLoader((preState)=>({...preState, changePassword : false}));
            dispatch({type : LOADER_STOP});
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        checkValidation(async (error)=>{
            if(Object.keys(error)?.every((item)=> error[item] === '') || formData.error === {}){
                await changePasswordAPI(e);
            }
        });
    };

    return(
        <div className={styles.mainContainer}>
            <form className={styles.amountForm} onSubmit={handleSubmit} autoComplete='off'>

                    <div>
                        <div className={styles.heading1}>Change Password</div>
                        {/*<div className={styles.heading2}></div>*/}
                    </div>

                    <div className={`${styles.fieldBox}`}>
                        <TextField
                            label='Old Password'
                            name='oldpassword'
                            value={formData?.values?.deoldpasswordposit}
                            onChange={stateHandler}
                            error={formData?.error?.oldpassword}
                            // disabled={true}
                        />
                    </div>
                    <div className={`${styles.fieldBox}`}>
                        <TextField
                            label='New Password'
                            name='new_password'
                            value={formData?.values?.new_password}
                            onChange={stateHandler}
                            error={formData?.error?.new_password}
                            // disabled={true}
                        />
                    </div>
                    <div className={`${styles.fieldBox}`}>
                        <TextField
                            label='Confirm Password'
                            name='confirm_new_password'
                            value={formData?.values?.confirm_new_password}
                            onChange={stateHandler}
                            error={formData?.error?.confirm_new_password}
                            // disabled={true}
                        />
                    </div>

                    <div className={`${styles.fieldBox} ${styles.mt20}`}>
                        <Button type="primary" shep='square' className={styles.submitBtn} >Save</Button>
                    </div>
                    {/*<div className={`${styles.fieldBox}`}>*/}
                    {/*    <Button shep='square' className={styles.cancelBtn} >Cancel</Button>*/}
                    {/*</div>*/}
            </form>
        </div>
    )
};

export default ChangePassword;