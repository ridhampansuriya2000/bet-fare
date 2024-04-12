import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    let {token, payload} = req.body;
   try {
       const result = await fetchData({ isServerCall: true, method : 'POST', endPoint:`/api/get-fancy-bookmaker-odds`, token: token, payload : payload});
       // console.log("result Fancy Odds ",result, token)
       res.status(result?.statusCode || 200).send(result);
   }catch (error) {
       console.log("error in server get-fancy-bookmaker-odds ",error)
       res.status(500).send(error)
   }
}
