import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {
    let {payload} = req.body;
    console.log("FORGOT_PASSWORD_FAILURE",payload)
   try {
       const result = await fetchData({ isServerCall: true, method : 'POST', endPoint:'/api/send-forgot-password-otp', payload: payload });
       res.status(result?.statusCode || 200).send(result);
   }catch (error) {
       console.log("error in send-forgot-password-otp")
       res.status(500).send(error)
   }
}
