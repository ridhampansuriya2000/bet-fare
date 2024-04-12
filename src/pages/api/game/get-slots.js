import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    let {token} = req.body;

   try {
       const result = await fetchData({ isServerCall: true, method : 'GET', endPoint:`/api/get-slots`, token: token});
       res.status(200).send(result);
   }catch (error) {
       console.log("error in server ezugi/update-balance :",error)
       res.status(500).send(error)
   }
}
