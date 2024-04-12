import React from 'react';
import styles from './RacingGameBets.module.css';
import Table from "../Table";
import {checkTime, convertToFirstLetterTitleCase, getHHMM} from "../../../utils/helperFunctions";
import Label from "../Label";
import {useRouter} from "next/router";

const timeFilter = ['Today','Tomorrow','Future'];

const RacingGameBets = ({type,gameData=[]}) =>{

    const router = useRouter();
    const [selectedMatch,setSelectedMatch] = React.useState(0);
    const [selectedTime,setSelectedTime] = React.useState(0);

    const handleMatchSelect = ({sport_id,tournament_id,match_id,market_id}) =>{
        router.push({
            pathname: '/game',
            query: {sport_id,tournament_id,match_id,market_id},
        });
    }

    const getUniqCountry = React.useCallback(() =>{
        const uniqueCountryCodes = new Set();

        if(Array.isArray(gameData)){gameData?.forEach(subArray => {
            subArray.forEach(item => {
                uniqueCountryCodes.add(item.country_code);
            });
        });}
        return  Array.from(uniqueCountryCodes);
    },[gameData]);

    const  filterDataByCountryCode=(data, countryCode)=>{

        let filteredData = [];
        if(Array.isArray(data)){
            filteredData = data.map(subArray => {
                const filteredSubArray = subArray.filter(item => item.country_code === countryCode && checkTime(item?.market_time) === selectedTime );
                return filteredSubArray.length > 0 ? filteredSubArray : null;
            }).filter(Boolean); // Remove null values from the result
        }

        const transformedData = filteredData.map(subArray => {
            return {
                ...subArray[0],
                match_name: subArray[0].match_name,
                market_time: subArray.map(item => item.market_time),
            };
        });

        return transformedData;
    };

    React.useEffect(()=>{
        let arr = filterDataByCountryCode(gameData,'AU');
    },[])

    const column = [
        {
            fieldName : 'match_name',
            title : 'Match',
            cellStyle:{}
            },
        {
            fieldName : 'market_time',
            title : 'Schedule',
            render:(rowData,data)=><div className={styles.matchScheduleTimes}>
                {data?.map((item)=><span onClick={()=>{
                    handleMatchSelect({sport_id : rowData?.sport_id,tournament_id : rowData?.tournament_id,match_id : rowData?.match_id, market_id : rowData?.market_id})
                }}>
                    <Label width='27px' count1={getHHMM(item)} bgColor='#888'/>
                </span>)}
            </div>},
    ];

    return(
        <div className={styles.mainContainer}>
            <div>
                <div className={styles.headerBox}>
                    <div className={styles.heading}>Horse Racing Schedule</div>
                    <div className={styles.timeFilterBox}>
                        <div className={`${styles.filterItemsBox}`}>
                            {timeFilter?.map((item,index)=>(
                                <div className={`${styles.filterItemBox}  ${selectedTime === index ? styles.activeItemBox : '' }`}
                                     onClick={()=>setSelectedTime(index)}
                                     key={index}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.countryFilterBox}>
                    {getUniqCountry()?.map((item,index)=>(
                        <div className={`${styles.countryFlagBox}  ${selectedMatch === index && styles.selectedMatch}`} key={index} onClick={()=>setSelectedMatch(index)}>
                            <div className={`${styles.countryImage}`}><img src={`https://indianhorse.lordofdevs.com/img/flags/${item}.png`} width='100%' height='100%'/></div>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
                <Table
                    column={column}
                    rows={filterDataByCountryCode(gameData,getUniqCountry()?.[selectedMatch])}
                    greenNote=''
                    fontSize={13}
                    textAlign='left'
                    cellStyle={{paddingLeft: '10px'}}
                />
            </div>
        </div>
    )
};

export default RacingGameBets;