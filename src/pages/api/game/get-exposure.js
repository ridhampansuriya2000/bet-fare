import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    let {token} = req.body;

   try {
       const result = await fetchData({ isServerCall: true, method : 'POST', endPoint:'/api/get-exposure', token: token   , payload: req.body.payload});
       res.status(200).send(result);
   }catch (error) {
       console.log("error in server get-exposure",error)
       res.status(500).send(error)
   }
}
