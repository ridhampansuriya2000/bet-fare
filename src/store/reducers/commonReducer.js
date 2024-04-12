import {
    FETCH_BALANCE_SUCCESS,
    FETCH_BALANCE_REQUEST,
    FETCH_BALANCE_FAILURE,
    FETCH_SEARCH_REQUEST, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_FAILURE,
} from "../types";

// Define commonReducer before using it in rootReducer
const initialState = {
    balance: {},
    searchEvent: {},
    loading: false,
    error: null
};

export default function commonReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_BALANCE_REQUEST:
        case FETCH_SEARCH_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_BALANCE_SUCCESS:
            return { ...state, loading: false, balance: action.payload };
        case FETCH_SEARCH_SUCCESS:
            return { ...state, loading: false, searchEvent: action.payload?.['0']?.matches };
        case FETCH_BALANCE_FAILURE:
        case FETCH_SEARCH_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};