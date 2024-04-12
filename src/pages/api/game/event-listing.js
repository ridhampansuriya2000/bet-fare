import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    console.log("token 5",req.body)
    let {token,payload} = req.body;
    console.log("payload-------------->",payload)
   try {
       const result = await fetchData({ isServerCall: true, method : 'GET', endPoint:`/api/event-listing/${payload?.id}`, token: token});
       console.log("result",result)
       res.status(200).send(result);
       // res.status(200).send({result: ''});
   }catch (error) {
       console.log("error in server",error)
       res.status(500).send(error)
   }
}
