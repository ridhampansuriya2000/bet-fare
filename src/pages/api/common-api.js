import fetchData from '../../utils/httpAction';

export default async function handler(req, res) {

    try {
        const result = await fetchData({ isServerCall: true, method : 'GET', endPoint:`/api/common-api`,});
        res.status(200).send(result);
    }catch (error) {
        console.log("error in server common-api :",error)
        res.status(500).send(error)
    }
}
