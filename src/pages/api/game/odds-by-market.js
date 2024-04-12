import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    console.log("token 5",req.body)
    let {token} = req.body;

   try {
       const result = await fetchData({ isServerCall: true, method : 'POST', endPoint:'/api/odds-by-market', token: token   , payload: req.body.payload});
       console.log("result Odds-by-market",result, token)
       res.status(200).send(result);
       // res.status(200).send({result: ''});
   }catch (error) {
       console.log("error in server Odds-by-market",error)
       res.status(500).send(error)
   }
}
