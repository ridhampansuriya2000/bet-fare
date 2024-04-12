import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    // console.log("token Fancy Odds",req.body)
    let {token, payload} = req.body;

   try {
       const result = await fetchData({ isServerCall: true, method : 'POST', endPoint:`/api/get-fancy-odds-from-api`,payload, token: token});
       // console.log("result Fancy Odds ",result, token)
       res.status(200).send(result);
       // res.status(200).send({result: ''});
   }catch (error) {
       console.log("error in server Fancy Odds ",error)
       res.status(500).send(error)
   }
}
