export const isOddsDisable = ({type,odds,sport_id, allow_betfair_horse_lay,selectionStatus='ONLINE'}) =>{
    if(['116','113']?.includes(sport_id) && type === 'Lay' && !allow_betfair_horse_lay){
        return true;
    }
    if(odds > 100 || !odds || !["ACTIVE","ONLINE"]?.includes(selectionStatus)){
        return true;
    }
}