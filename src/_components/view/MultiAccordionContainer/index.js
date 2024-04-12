import React, {useState} from 'react';
import styles from './MultiAccordionContainer.module.css';

const dummyData = [
    { title: 'Section 1', content: 'Content for section 1 goes here.' },
    { title: 'Section 2', content: 'Content for section 2 goes here.' },
    { title: 'Section 3', content: 'Content for section 3 goes here.' },
    // Add more dummy data as needed
];

function MultiAccordionContainer({accordionHeaderStyle, accordionItemStyle, controlIcon,data=dummyData,subAccordionHeaderStyle,subAccordionItemStyle,subControlIcon}) {

    const [activeIndex, setActiveIndex] = useState(null);
    const [activeSubIndex, setActiveSubIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
        setActiveSubIndex(null);
    };
    const handleSubToggle = (e,index) => {
        e.stopPropagation();
        setActiveSubIndex(activeSubIndex === index ? null : index);
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
                        <div className={`${styles.arrow} ${activeIndex === index ? styles.open : ''}`}>{controlIcon ? controlIcon : <img src={`images/${activeIndex === index ? 'minus.svg' : "plus.svg" }`} alt='arrow'/>}</div>
                    </div>
                    <div className={styles.accordionContent}>
                        {!Array.isArray(item.content) ?
                            <div>{item.content}</div>
                        :
                            <div className={styles.subAccordion}>
                                {item?.content?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.subAccordionItem} ${activeSubIndex === index ? styles.subOpen : ''}`}
                                        onClick={(e) => handleSubToggle(e,index)}
                                        style={subAccordionItemStyle}
                                    >
                                        <div className={styles.subAccordionHeader} style={subAccordionHeaderStyle}>
                                            {item.title}
                                            <div className={`${styles.subArrow} ${activeSubIndex === index ? styles.subOpen : ''}`}>{subControlIcon ? subControlIcon : <img src={`images/${activeSubIndex === index ? 'minus.svg' : "plus.svg" }`} alt='arrow'/>}</div>
                                        </div>
                                        <div className={styles.subAccordionContent}>
                                            {!Array.isArray(item.content) ?
                                                <div>{item.content}</div>
                                                : null
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MultiAccordionContainer;