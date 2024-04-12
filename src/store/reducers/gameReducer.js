import {
    FETCH_MY_BETS_DETAILS_REQUEST,
    FETCH_MY_BETS_DETAILS_SUCCESS,
    FETCH_MY_BETS_DETAILS_FAILURE,
    FETCH_UNMATCHED_DETAILS_FAILURE,
    FETCH_MATCHED_DETAILS_FAILURE,
    FETCH_MATCHED_DETAILS_REQUEST,
    FETCH_UNMATCHED_DETAILS_REQUEST,
    FETCH_MATCHED_DETAILS_SUCCESS,
    FETCH_UNMATCHED_DETAILS_SUCCESS,
    FETCH_SCORE_BY_MARKET_REQUEST,
    FETCH_SCORE_BY_MARKET_SUCCESS,
    FETCH_SCORE_BY_MARKET_FAILURE
} from "../types";

// Define commonReducer before using it in rootReducer
const initialState = {
    myBets : {},
    matchedBets : {},
    unMatchedBets : {},
    scoreByMarket : [],
    loading: false,
    error: null
};

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MY_BETS_DETAILS_REQUEST:
        case FETCH_MATCHED_DETAILS_REQUEST:
        case FETCH_UNMATCHED_DETAILS_REQUEST:
        case FETCH_SCORE_BY_MARKET_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_MY_BETS_DETAILS_SUCCESS:
            return { ...state, loading: false, myBets: action.payload };
        case FETCH_MATCHED_DETAILS_SUCCESS:
            return { ...state, loading: false, matchedBets: action.payload };
        case FETCH_UNMATCHED_DETAILS_SUCCESS:
            return { ...state, loading: false, unMatchedBets: action.payload };
        case FETCH_SCORE_BY_MARKET_SUCCESS:
            return { ...state, loading: false, scoreByMarket: action.payload };
        case FETCH_MY_BETS_DETAILS_FAILURE:
        case FETCH_MATCHED_DETAILS_FAILURE:
        case FETCH_UNMATCHED_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload, myBets : {}, matchedBets: {}, unMatchedBets: {} };
        case FETCH_SCORE_BY_MARKET_FAILURE:
            return { ...state, loading: false, error: action.payload, };
        default:
            return state;
    }
};