import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {
    let {token, searchParams} = req.body;
    console.log("token sider",token,searchParams)
    try {
        const result = await fetchData({ isServerCall: true, method : 'GET', endPoint:`/api/getSiderBar${searchParams ?? ''}`, token : token});
        res.status(result?.statusCode || 200).send(result);
    }catch (error) {
        console.log("error in server getSiderBar:",error)
        res.status(500).send(error)
    }
}