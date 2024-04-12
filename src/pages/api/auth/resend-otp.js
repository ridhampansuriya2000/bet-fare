import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {
    let {payload,token} = req.body;
   try {
       const result = await fetchData({ isServerCall: true, method : 'POST', endPoint:'/api/resend-otp', token: token, payload: payload, redirectToLogin:false });
       res.status(result?.statusCode || 200).send(result);
   }catch (error) {
       console.log("error in resend-otp")
       res.status(500).send(error)
   }
}
