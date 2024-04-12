import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    let {token, payload} = req.body;
    console.log("token bet placed",req.body)

   try {
       const result = await fetchData({ isServerCall: true, method : 'POST', endPoint:'/api/bet-placed', token: token   , payload: payload});
       console.log("result bet placed",result)
       res.status(result?.statusCode || 200).send(result);
   }catch (error) {
       console.log("error in server bet placed",error)
       res.status(500).send(error)
   }
}
