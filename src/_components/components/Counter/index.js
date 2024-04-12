import React from 'react';
import styles from './Counter.module.css';

const Counter = ({ count = 0, onTimerEnd=()=>{} }) => {
    const [counterNumber, setCounterNumber] = React.useState(count);

    React.useEffect(()=>{
        setCounterNumber(count);
    },[count])

    React.useEffect(() => {
        let timer = 0;
        if (counterNumber > 0) {
            timer = setTimeout(() => {
                setCounterNumber(prevState => prevState - 1);
            }, 1000);
        } else if (counterNumber === 0) {
            onTimerEnd();
        }

        return () => {
            clearTimeout(timer);
        };
    }, [counterNumber]);

    return (
        <>
            {counterNumber ?
                <div className={styles.mainContainer}>
                    <div className={styles.countBox}>
                        <span className={styles.countNumber}>{counterNumber}</span>
                    </div>
                </div>
                : null
            }
        </>
    );
};

export default Counter;
