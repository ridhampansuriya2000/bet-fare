import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    let {token, payload} = req.body;

   try {
       const result = await fetchData({ isServerCall: true, method : 'POST', endPoint:'/api/scores-by-market', token: token   , payload: payload});
       console.log("result scores-by-market",result, token)
       res.status(200).send(result);
   }catch (error) {
       console.log("error in server scores-by-market",error)
       res.status(500).send(error)
   }
}
