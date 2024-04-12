import React from 'react';
import styles from './ProgressStepper.module.css';

{/**---------------  Dummy Sample Props ---------------------*/}
const stepsDummyProps = [
    { count :1, label : 'Register' },
    { count :2, label : 'Verify' },
    { count :3, label : 'Deposit' },
    { count :4, label : 'Success' },
];

const ProgressStepper = ({
    steps=stepsDummyProps,
    currentStep=2,
                         }) =>{
    return(
        <div className={styles.mainContainer}>
            {steps?.map((item,index)=>(
                <div
                    className={`${steps.length === index + 1 ? styles.lastStepOuterBox : styles?.stepOuterBox} ${currentStep > index ? styles.completedStep : currentStep === index ? styles.activeStep : ''}`}
                    key={`step_${index}`}>
                        <div className={styles.countIcon}>{item?.count}</div>
                        <div>{item?.label}</div>
                </div>
            ))}
        </div>
    )
};

export default ProgressStepper;