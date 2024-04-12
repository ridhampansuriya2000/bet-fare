import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {
    let {payload, token} = req.body;
   try {
       const result = await fetchData({ isServerCall: true, method : 'PUT', endPoint:'/api/change-password', payload: payload, token: token });
       res.status(result?.statusCode || 200).send(result);
   }catch (error) {
       console.log("error in change-password")
       res.status(500).send(error)
   }
}
