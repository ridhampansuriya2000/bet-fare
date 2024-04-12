import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {

    let {token, payload} = req.body;
    console.log("token odds-by-match-fancy",token, payload)

   try {
       const result = await fetchData({ isServerCall: true, method : 'POST', endPoint:`/api/odds-by-match-fancy`, token, payload});
       res.status(200).send(result);
   }catch (error) {
       console.log("error in server odds-by-match-fancy ",error)
       res.status(500).send(error)
   }
}
