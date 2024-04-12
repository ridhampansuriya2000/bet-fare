import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {
    let {token, searchParams} = req.body;
    try {
        const result = await fetchData({ isServerCall: true, method : 'GET', endPoint:`/api/account-statement${searchParams ?? ''}`, token : token, payload : {
                "is_evo": 0
            }});
        res.status(result?.statusCode || 200).send(result);
    }catch (error) {
        console.log("error in server account-statement :",error)
        res.status(500).send(error)
    }
}