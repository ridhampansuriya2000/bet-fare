import React from 'react';
import styles from './BalanceTransfer.module.css';
import TextField from "../../view/TextField";
import Button from "../../view/Button";
import PhoneNumber from "../../view/PhoneNumberField";
import {convertToTitleCase} from "../../../utils/helperFunctions";

const BalanceTransfer = ({onSubmit}) =>{

    const [formData,setFormData] = React.useState({
        value:{
            deposit : 0
        },
        error:{}
    });

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

        });
        setFormData((preState)=>({
            ...preState,
            error : errorObj,
        }));
        callBack(errorObj);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        checkValidation(async (error)=>{
            if(Object.keys(error)?.every((item)=> error[item] === '') || formData.error === {}){
                await onSubmit({balance:formData?.value?.deposit});
                e.target.reset();
            }
        });
    };

    return(
        <div className={styles.mainContainer}>
            <form className={styles.amountForm} onSubmit={handleSubmit} autoComplete='off'>

                    <div>
                        <div className={styles.heading1}>Evolution Casino</div>
                        <div className={styles.heading2}>1 points = 1 point in Casino</div>
                    </div>

                    <div className={`${styles.fieldBox}`}>
                        <PhoneNumber
                            label='Deposit'
                            name='deposit'
                            value={formData?.values?.deposit}
                            onChange={stateHandler}
                            error={formData?.error?.deposit}
                            // disabled={true}
                        />
                    </div>
                    <div className={`${styles.fieldBox}`}>
                        <Button shep='square' className={styles.cancelBtn} >Cancel</Button>
                    </div>
                    <div className={`${styles.fieldBox}`}>
                        <Button type="primary" shep='square' className={styles.submitBtn} >Transfer</Button>
                    </div>
            </form>
        </div>
    )
};

export default BalanceTransfer;