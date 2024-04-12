import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {
    let {token, payload} = req.body;
    try {
        const result = await fetchData({ isServerCall: true, method : 'POST', endPoint:`/api/verify-promocode`, token : token, payload: payload});
        res.status(result?.statusCode || 200).send(result);
    }catch (error) {
        console.log("error in server deposit-method :",error);
        res.status(500).send(error)
    }
}