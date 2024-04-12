import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {
    let {token, searchParams} = req.body;
    try {
        const result = await fetchData({ isServerCall: true, method : 'GET', endPoint:`/api/my-deposits${searchParams ?? ''}`, token : token});
        res.status(result?.statusCode || 200).send(result);
    }catch (error) {
        console.log("error in server deposit-method :",error)
        res.status(500).send(error)
    }
}