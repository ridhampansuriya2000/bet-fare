import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {
    let {token} = req.body;
    try {
        const result = await fetchData({ isServerCall: true, method : 'GET', endPoint:`/api/deposit-method`, token : token});
        res.status(200).send(result);
    }catch (error) {
        console.log("error in server deposit-method :",error)
        res.status(500).send(error)
    }
}