import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    // console.log("token 5 :",req.body)
    let {token} = req.body;

   try {
       const result = await fetchData({ isServerCall: true, method : 'GET', endPoint:`/api/event-details${req.body.querys}`, token: token});
       // console.log("result event details :",result, token)
       res.status(200).send(result);
   }catch (error) {
       console.log("error in server event details :",error)
       res.status(500).send(error)
   }
}
