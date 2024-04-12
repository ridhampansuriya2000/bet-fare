import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    let {token, payload} = req.body;

   try {
       const result = await fetchData({ isServerCall: true, method : 'GET', endPoint:`/api/load-game`, token: token, payload});
       res.status(200).send(result);
   }catch (error) {
       console.log("error in server load-game :",error)
       res.status(500).send(error)
   }
}
