import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    let {token, payload} = req.body;

   try {
       const result = await fetchData({ isServerCall: true, method : 'POST', endPoint:`/api/evolution/update-evo-balance`, token: token, payload : payload});
       // const result = await fetchData({ isServerCall: true, method : 'GET', endPoint:`/api/get-slots`, token: token, payload : payload});
       res.status(200).send(result);
   }catch (error) {
       console.log("error in server bet setting :",error)
       res.status(500).send(error)
   }
}
