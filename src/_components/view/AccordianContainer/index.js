import React, {useState} from 'react';
import styles from './AccordionContainer.module.css';

const dummyData = [
    { title: 'Section 1', content: 'Content for section 1 goes here.' },
    { title: 'Section 2', content: 'Content for section 2 goes here.' },
    { title: 'Section 3', content: 'Content for section 3 goes here.' },
    // Add more dummy data as needed
];

function AccordionContainer({accordionHeaderStyle, accordionItemStyle, controlIcon,data=dummyData}) {

    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={styles.accordion}>
            {data.map((item, index) => (
                <div
                    key={index}
                    className={`${styles.accordionItem} ${activeIndex === index ? styles.open : ''}`}
                    onClick={() => handleToggle(index)}
                    style={accordionItemStyle}
                >
                    <div className={styles.accordionHeader} style={accordionHeaderStyle}>
                        {item.title}
                        <div className={`${styles.arrow} ${activeIndex === index ? styles.open : ''}`}>{controlIcon ? controlIcon : <img src='images/arrow-down-dark.svg' alt='arrow'/>}</div>
                    </div>
                    <div className={styles.accordionContent} onClick={(e)=>e.stopPropagation()}>
                        {item.content ?
                            <>{item.content}</>
                            : item?.emptyContent
                                ?
                                <div className={styles.emptyContent}>{item?.emptyContent}</div> : <div className={styles.emptyContent}><img src="images/caution-icon.svg" alt="caution icon"/></div>}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AccordionContainer;