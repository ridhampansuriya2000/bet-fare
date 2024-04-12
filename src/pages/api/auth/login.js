import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

   try {
       const result = await fetchData({ isServerCall: true, method : 'POST', endPoint:'/api/login', payload: req.body });
       res.status(result?.statusCode || 200).send(result);
   }catch (error) {
       console.log("error in server")
       res.status(500).send(error)
   }
}
