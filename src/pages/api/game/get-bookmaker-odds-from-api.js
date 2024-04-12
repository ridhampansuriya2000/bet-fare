import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    console.log("token BookMaker Odds",req.body)
    let {token} = req.body;

   try {
       const result = await fetchData({ isServerCall: true, method : 'POST', endPoint:`/api/get-bookmaker-odds-from-api`, token: token   , payload: req.body.payload});
       console.log("result BookMaker Odds ",result, token)
       res.status(200).send(result);
       // res.status(200).send({result: ''});
   }catch (error) {
       console.log("error in server BookMaker Odds ",error)
       res.status(500).send(error)
   }
}
