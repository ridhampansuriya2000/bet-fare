
const BACKEND_BASE_URL = process.env.API_BASE_URL;

const fetchData = async ({ method = 'GET', endPoint, isServerCall, header = {}, onSuccess = e => e, onFail = e => e, payload = null, token='',redirectToLogin=true }) => {
    // console.log(`token ${endPoint}`, token, BACKEND_BASE_URL);
    // console.log(`token2 `, BACKEND_BASE_URL);

    try {
        const url = `${isServerCall ? BACKEND_BASE_URL : ""}${endPoint}`;
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': isServerCall ? `Bearer ${token}` : '',
                ...header
            }
        };

        if (method !== 'GET' && method !== 'HEAD') {
            options.body = JSON.stringify(payload);
        }
        // console.log("https api url/options :", url, options);

        const response = await fetch(url, options);

        // console.log(`https api response ${endPoint}:`,response);
        let result = await response.json();
        // console.log(`https api result ${endPoint}:`,result);
        if((response?.status === 401 || result?.statusCode === 401) && !isServerCall && redirectToLogin){
            // localStorage.clear();
            // window.location.href = '/login';
            // window.location?.reload();
        }
        return {...result, statusCode : result?.statusCode ? result?.statusCode : response?.status};
        // Uncomment the following lines if you want to handle success and failure in your fetchData function
        // const data = await response.json();
        // if (response.ok) {
        //     return data;
        // } else {
        //     throw new Error(data.message);
        // }
    } catch (error) {
        console.log("error in https action", error);
        // throw new Error(error); // rethrow the caught error
    }
};

export default fetchData;
