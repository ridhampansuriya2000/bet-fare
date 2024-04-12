import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    let {token} = req.body;

   try {
       const result = await fetchData({ isServerCall: true, method : 'GET', endPoint:`/api/clear-casino-session`, token: token});
       res.status(result?.statusCode || 200).send(result);
   }catch (error) {
       console.log("error in server clear-casino-session :",error)
       res.status(500).send(error)
   }
}
