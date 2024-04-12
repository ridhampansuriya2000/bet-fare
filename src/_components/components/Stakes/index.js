import React from 'react';
import styles from './Stakes.module.css';
import Button from "../../view/Button";
import {formatNumberWithCommas} from "../../../utils/helperFunctions";

const Stakes = ({stakeOptions=[],disabled=false, onSave=(stake)=>{}, viewMode=false, boxStyle={}}) =>{

    const [isDisabled,setIsDisabled] = React.useState(disabled);
    const [isEditable,setIsEditable] = React.useState(false);
    const [stakes,setStakes] = React.useState(stakeOptions);
    const [position,setPosition] = React.useState();

    React.useEffect(()=>{
        setIsDisabled(disabled);
        setStakes(stakeOptions);
    },[disabled,stakeOptions]);

    const stakeHandler = (e,item,index) =>{
        let {value} = e.target;
        value = value.replace(/[^0-9]/g, '');
        let newArr = JSON.parse(JSON.stringify(stakes));
        if(typeof item === 'object'){
            let obj = {...stakes[index],amount : value}
            newArr[index] = obj;
        }else {
            newArr[index] = value;
        }
        setStakes(newArr);
    };

    const selectStake = (item,index) =>{
        let newArr = JSON.parse(JSON.stringify(stakes));
        if(typeof item === 'object'){
            let obj = {"save":"position","position": index + 1}
            setPosition(obj)
        }
        setStakes(newArr);
    };

    const onCancel = () =>{
        setIsEditable((preState)=>!preState);
        if(isEditable){
            setStakes(stakeOptions);
        }
    }

    return(
        <div className={`${styles.mainContainer} ${disabled && styles.disabled}`} style={boxStyle}>
            <div className={`row`}>
                {stakes?.map((item,index)=>(
                    <div className={`col col-md-4 col-xs-12  ${styles.inputBox}`} key={index}>
                       {!isEditable ?
                           <span className={` ${styles.details} ${position?.position ?  position?.position === index + 1 ? styles.active : ""  :parseInt(item?.status) ? styles.active : ''}`} onClick={()=>(!disabled && !viewMode) && selectStake(item,index)}>+{formatNumberWithCommas(item?.amount || item)}</span> :
                        <input type="text" className={`${styles.details} ${parseInt(item?.status) ? styles.active : ''} ${styles.input}`} value={`+${formatNumberWithCommas(item?.amount || item)}`} onChange={(e)=>stakeHandler(e,item,index)}/>}
                    </div>
                ))}
            </div>

            {!viewMode && <div className={`row`}>
                <div className={`col col-md-6 col-xs-12`}>
                    <Button shep='square' className={styles.cancelBtn} onClick={onCancel} disabled={isDisabled}>
                        {!isEditable ? "Edit" : 'Cancel' }
                    </Button>
                </div>
                <div className={`col col-md-6 col-xs-12`}>
                    <Button shep='square' className={styles.saveBtn}  disabled={disabled} onClick={()=>onSave(isEditable ? stakes : position)}>
                        Save
                    </Button>
                </div>
            </div>}
        </div>
    )
};

export default Stakes;