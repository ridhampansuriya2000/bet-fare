import fetchData from '../../../utils/httpAction';

export default async function handler(req, res) {
    let {token, searchParams} = req.body;
    try {
        const result = await fetchData({ isServerCall: true, method : 'GET', endPoint:`/api/account-statement-detail/${searchParams?.session_id}?session_id=${searchParams?.session_id}&market_id=${searchParams?.market_id}&game_type_id=${searchParams?.game_type_id}&game_id=${searchParams?.game_id}&is_evo=${searchParams?.is_evo}&is_vivo_bet=${searchParams?.is_vivo_bet}&is_spade=${searchParams?.is_spade}&is_ezugi=${searchParams?.is_ezugi}`, token : token });
        res.status(result?.statusCode || 200).send(result);
    }catch (error) {
        console.log("error in server account-statement-detail :",error)
        res.status(500).send(error)
    }
}