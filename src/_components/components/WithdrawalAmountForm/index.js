import React from 'react';
import styles from './WithdrawalAmountForm.module.css';
import TextField from "../../view/TextField";
import Button from "../../view/Button";

const WithdrawalAmountForm = ({stateHandler,withdrawal,onSubmit, paymentType, loader}) =>{

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSubmit(e);
    };


    return(
        <div className={styles.mainContainer}>
            <form className={styles.amountForm} onSubmit={handleSubmit}>
                <div className={`row`}>
                    <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Enter Amount'
                            name='amount'
                            value={withdrawal?.values?.amount}
                            onChange={stateHandler}
                            error={withdrawal?.errors?.amount?.[0]}
                        />
                    </div>
                    <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Account Holder Name'
                            name='account_name'
                            value={withdrawal?.values?.account_name}
                            onChange={stateHandler}
                            error={withdrawal?.errors?.account_name?.[0]}
                        />
                    </div>
                    <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Account Number'
                            name='account_number'
                            value={withdrawal?.values?.account_number}
                            onChange={stateHandler}
                            error={withdrawal?.errors?.account_number?.[0]}
                        />
                    </div>
                    <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='IFSC Code'
                            name='ifsc_code'
                            value={withdrawal?.values?.ifsc_code}
                            onChange={stateHandler}
                            error={withdrawal?.errors?.ifsc_code?.[0]}
                        />
                    </div>
                    <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Bank Name'
                            name='bank_name'
                            value={withdrawal?.values?.bank_name}
                            onChange={stateHandler}
                            error={withdrawal?.errors?.bank_name?.[0]}
                        />
                    </div>
                    <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Branch'
                            name='bank_branch'
                            value={withdrawal?.values?.bank_branch}
                            onChange={stateHandler}
                            error={withdrawal?.errors?.bank_branch?.[0]}
                        />
                    </div>
                   <div className={`col col-md-6 col-sm-12`}>
                      <div className={styles.transferTypeInputBox}>
                            <div>Transferred By</div>
                            <div className={styles?.transferTypeRadioGroupBox}>
                                <input type="radio" value='IMPS' id='transfer_type' name='transfer_type' onClick={stateHandler}/>
                                <label htmlFor='transfer_via'>IMPS</label>
                                <input type="radio" value='NEFT' id='transfer_type' name='transfer_type' onClick={stateHandler}/>
                                <label htmlFor='transfer_via'>NEFT</label>
                                <input type="radio" value='RTGS' id='transfer_type' name='transfer_type' onClick={stateHandler}/>
                                <label htmlFor='transfer_via'>RTGS</label>
                            </div>
                        </div>
                       <span className={styles.errorText}>{withdrawal?.errors?.transfer_type?.[0]}</span>
                    </div>
                </div>
                <Button type="submit" className={styles.submitBtn} disabled={loader?.withdrawal} >Continue</Button>
            </form>
        </div>
    )
};

export default WithdrawalAmountForm;