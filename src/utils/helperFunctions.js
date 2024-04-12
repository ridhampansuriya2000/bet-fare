import styles from "../_components/components/GamePage/GamePage.module.css";

export function formatNumberWithCommas(number) {
    // Convert number to string and remove any existing commas
    let formattedNumber = number.toString().replace(/,/g, '');

    // Convert to Indian Numbering System format
    formattedNumber = Number(formattedNumber).toLocaleString('en-IN');

    return formattedNumber;
}

export function convertToValidNumber(str) {
    const sanitizedStr = str?.replace(/,/g, '');

    const number = parseFloat(sanitizedStr);

    return number;
}

export function acceptOnlyNumber(value) {
    let newValue = value;
    newValue = newValue?.replace(/[^0-9]/g, '')
    return newValue;
}


export function debounce(func, delay) {
    let timerId;

    return function(...args) {
        const context = this;

        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
};

export function convertToTitleCase(sentence) {
    // Split the sentence into words
    const words = sentence?.split('_');

    // Capitalize the first letter of each word
    const capitalizedWords = words?.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the capitalized words back together with a space
    const titleCaseSentence = capitalizedWords?.join(' ');

    return titleCaseSentence;
}

export function convertToFirstLetterTitleCase(sentence) {
    // Split the sentence into words
    const words = sentence?.split('_');

    // Capitalize the first letter of the first word
    const firstWord = words?.[0]?.charAt(0).toUpperCase() + words?.[0]?.slice(1);

    // Join the first capitalized word with the rest of the sentence
    const titleCaseSentence = firstWord + (words?.length > 1 ? ' ' + words?.slice(1)?.join(' ') : '');

    return titleCaseSentence;
}

export function YYYYMMDDtoDDMMYYYY(inputDate) {
    const parts = inputDate?.split('-');
    const rearrangedDate = `${parts?.[2]}-${parts?.[1]}-${parts?.[0]}`;
    return rearrangedDate;
}

export function getYYYYMMDDDate({ beforeDay = 0, afterDay = 0 } = {}) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - beforeDay);
    currentDate.setDate(currentDate.getDate() + afterDay);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const currentDateISO = `${year}-${month}-${day}`;

    return currentDateISO;
}


export function hhmmssTime(dateTimeString='') {
    const dateTime = new Date(dateTimeString);

    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getSeconds().toString().padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    return timeString;
};

export function getYYYYMMDDFromTimestamp(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary

    return `${year}-${month}-${day}`;
}


export function getHHMM(dateTimeString,hour12=false) {
    const time = new Date(dateTimeString);
    return time.toLocaleTimeString('en-US', { hour12: hour12, hour: '2-digit', minute: '2-digit' });
}

export function groupByKey({array=[],key=''}) {
    return array.reduce((acc, transfer) => {
        const existingArray = acc.find(arr => arr[0]?.[key] === transfer?.[key]);
        if (existingArray) {
            existingArray.push(transfer);
        } else {
            acc.push([transfer]);
        }
        return acc;
    }, []);
}

export function convertObjectToQueryString(obj) {
    let queryString = '';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (queryString.length === 0) {
                queryString += `${key}=${value}`;
            } else {
                queryString += `&${key}=${value}`;
            }
        }
    }
    return queryString;
}

export function convertQueryStringToObject(queryString) {
    const obj = {};

    for (const key in queryString) {
        if (queryString.hasOwnProperty(key)) {
            const value = queryString[key];
            obj[key] = value;
        }
    }
    return obj;
}

export function getProfitLiability({stakes,odds,type}) {
    switch (type) {
        case 'matchodds' : return (odds*stakes) - stakes;
        case 'fancymarkets' : return stakes;
        case 'bookmaker' : return odds*stakes/ 100;
        case 'fancybookmaker' : return odds*stakes/ 100;
        default : return stakes;
    }
}

export function calculateSizeOfOdds({oddSize,gbp_conversion,bet_fair_percentage,tripple_pt}) {
    let price_val = '';
    if (oddSize !== '') {
        const temp_price = (oddSize * gbp_conversion) / bet_fair_percentage / tripple_pt;
        price_val = temp_price.toFixed(0);
        if (price_val > 500000) {
            price_val = '500000+';
        }
    }
    return oddSize ?  price_val : '';
}

export function checkTime(datetime) {
    // Parse the provided datetime string
    const providedDate = new Date(datetime);

    // Get the current date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time to beginning of the day for comparison

    // Set tomorrow's date
    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);
    tomorrowDate.setHours(0, 0, 0, 0); // Set time to beginning of the day for comparison

    // Compare the provided date with the current date and tomorrow's date
    if (providedDate.toDateString() === currentDate.toDateString()) {
        return 0; // Date is today
    } else if (providedDate.toDateString() === tomorrowDate.toDateString()) {
        return 1; // Date is tomorrow
    } else if (providedDate > currentDate) {
        return 2; // Date is in the future
    } else {
        return null; // Date is in the past
    }
}

export function convertBtwSportIdAndGameName(identifier, toSportId = true) {
    const games = [
        {name: "Inplay", sport_id: ''},
        {name: "Cricket", sport_id: 30},
        {name: "Tennis", sport_id: 188},
        {name: "Football", sport_id: 171},
        {name: "Horse", sport_id: 116},
        {name: "Greyhound", sport_id: 113},
        {name: "Ezugi", sport_id: 30},
        {name: "Evolution", sport_id: 30},
        {name: "Slot Games", sport_id: 30}
    ];

    if (toSportId) {
        // Convert game name to sport ID
        return  games.find(game => game.name.toLowerCase() === identifier.toLowerCase())?.sport_id || '';
    } else {
        // Convert sport ID to game name
        return games.find(game => game.sport_id == identifier)?.name || '';
    }
}

export const moveToTarget = ({move_to_target_id='',focus_target_id='',focus_class='',focus_time=500}) =>{
    let target_bet = document.getElementById(move_to_target_id);
    let focus_target = document.getElementById(focus_target_id);
    target_bet.scrollIntoView({ behavior: 'smooth' });
    focus_target.classList.add(`${focus_class}`);
    setTimeout(() => {
        focus_target.classList.remove(`${focus_class}`);
    }, focus_time);
}