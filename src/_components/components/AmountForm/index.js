import React from 'react';
import styles from './AmountForm.module.css';
import TextField from "../../view/TextField";
import Button from "../../view/Button";

const RequireMarker = ({marker=''}) =>(
    <span className={styles.requireMarker}>{marker}</span>
)

const AmountForm = ({stateHandler,deposit,onSubmit, paymentType, applyPromocode}) =>{

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await onSubmit(e)
    };

    const verifyPromocode = (e) =>{
        e.preventDefault();
        applyPromocode();
    }

    return(
        <div className={styles.mainContainer}>
            <form className={styles.amountForm} onSubmit={handleSubmit}>
                <div className={`row`}>
                    {paymentType === 'bank_transfers' && <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Bank Name'
                            value={deposit?.values?.bank_name}
                            disabled={true}
                        />
                    </div>}
                    {paymentType !== 'bank_transfers' && <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Wallet'
                            value={deposit?.values?.wallet}
                            disabled={true}
                        />
                    </div>}
                    <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Account Holder Name'
                            value={deposit?.values?.account_holder_name}
                            disabled={true}
                        />
                    </div>
                    {paymentType === 'bank_transfers' && <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Account Number'
                            value={deposit?.values?.account_number}
                            disabled={true}
                        />
                    </div>}
                    {paymentType === 'bank_transfers' && <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Account Type'
                            value={deposit?.values?.account_type}
                            disabled={true}
                            />
                    </div>}
                    {paymentType === 'bank_transfers' && <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='IFSC Code'
                            value={deposit?.values?.ifsc_code}
                            disabled={true}
                        />
                    </div>}
                    {paymentType === 'bank_transfers' && <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Branch'
                            value={deposit?.values?.branch}
                            disabled={true}
                        />
                    </div>}
                    {paymentType === 'bank_transfers' && <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Enter Amount'
                            labelMarker={<RequireMarker marker='*' />}
                            name='bank_amount'
                            value={deposit?.values?.bank_amount}
                            onChange={stateHandler}
                            error={deposit?.errors?.bank_amount?.[0]}
                        />
                    </div>}
                     {paymentType !== 'bank_transfers' && <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Enter Amount'
                            labelMarker={<RequireMarker marker='*' />}
                            name='wallet_amount'
                            value={deposit?.values?.wallet_amount}
                            onChange={stateHandler}
                            error={deposit?.errors?.wallet_amount?.[0]}
                        />
                    </div>}
                    <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='USER ID'
                            name='username'
                            value={deposit?.values?.username}
                            onChange={stateHandler}
                            error={deposit?.errors?.username?.[0]}
                            disabled={true}
                        />
                    </div>
                    <div className={`col col-md-6 col-sm-12`}>
                        <TextField
                            label='Ref. No. / Trans. ID / UTR'
                            labelMarker={<RequireMarker marker='*' />}
                            name='reference_id'
                            value={deposit?.values?.reference_id}
                            onChange={stateHandler}
                            error={deposit?.errors?.reference_id?.[0]}
                        />
                    </div>
                   <div className={`col col-md-6 col-sm-12`}>
                       {paymentType === 'bank_transfers' && <div className={styles.transferTypeInputBox}>
                            <div className={styles.labelBox}><div>Transferred By</div><RequireMarker marker='*' /></div>
                            <div className={styles?.transferTypeRadioGroupBox}>
                                <input type="radio" value='IMPS' id='transfer_via' name='transfer_via' onClick={stateHandler}/>
                                <label htmlFor='transfer_via'>IMPS</label>
                                <input type="radio" value='NEFT' id='transfer_via' name='transfer_via' onClick={stateHandler}/>
                                <label htmlFor='transfer_via'>NEFT</label>
                                <input type="radio" value='RTGS' id='transfer_via' name='transfer_via' onClick={stateHandler}/>
                                <label htmlFor='transfer_via'>RTGS</label>
                            </div>
                        </div>}
                    </div>
                    <div className={`col col-md-6 col-sm-12`}>
                        <div className={styles.promocodeBox}>
                            <TextField
                                label='Promocode'
                                name='promocode'
                                value={deposit?.values?.promocode}
                                onChange={stateHandler}
                            />
                            <Button text='Apply' shep='square' type='primary' className={styles?.promocodeBtn} disabled={!deposit?.values?.promocode} onClick={verifyPromocode} />
                        </div>
                        <span className={styles.errorText}>{deposit?.errors?.promocode?.[0]}</span>
                    </div>
                </div>
                <Button type="submit" className={styles.submitBtn}  >Continue</Button>
            </form>
        </div>
    )
};

export default AmountForm;