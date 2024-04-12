import {
    FETCH_DEPOSIT_METHOD_REQUEST,
    FETCH_DEPOSIT_METHOD_SUCCESS,
    FETCH_DEPOSIT_METHOD_FAILURE,
    FETCH_DEPOSIT_DETAILS_FAILURE,
    FETCH_DEPOSIT_DETAILS_REQUEST,
    FETCH_DEPOSIT_DETAILS_SUCCESS,
    FETCH_WITHDRAWALS_DETAILS_REQUEST,
    FETCH_WITHDRAWALS_DETAILS_FAILURE,
    FETCH_WITHDRAWALS_DETAILS_SUCCESS,
    FETCH_TRANSACTIONS_DETAILS_REQUEST,
    FETCH_TRANSACTIONS_DETAILS_SUCCESS,
    FETCH_TRANSACTIONS_DETAILS_FAILURE,
    FETCH_PL_TRANSACTIONS_DETAILS_REQUEST,
    FETCH_PL_TRANSACTIONS_DETAILS_SUCCESS,
    FETCH_PL_TRANSACTIONS_DETAILS_FAILURE,
    FETCH_ACCOUNT_STATEMENT_DETAILS_REQUEST,
    FETCH_ACCOUNT_STATEMENT_DETAILS_FAILURE,
    FETCH_ACCOUNT_STATEMENT_DETAILS_SUCCESS
} from "../types";

// Define commonReducer before using it in rootReducer
const initialState = {
    depositMethods: {},
    depositDetails :{},
    withdrawalsDetails :{},
    transactionsDetails : [],
    profitLossTransactionsDetails : [],
    accountStatementDetails : {},
    loading: false,
    error: null
};

export default function financeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DEPOSIT_METHOD_REQUEST:
        case FETCH_DEPOSIT_DETAILS_REQUEST:
        case FETCH_WITHDRAWALS_DETAILS_REQUEST:
        case FETCH_TRANSACTIONS_DETAILS_REQUEST:
        case FETCH_ACCOUNT_STATEMENT_DETAILS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_PL_TRANSACTIONS_DETAILS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DEPOSIT_METHOD_SUCCESS:
            return { ...state, loading: false, depositMethods: action.payload };
        case FETCH_DEPOSIT_DETAILS_SUCCESS:
            return { ...state, loading: false, depositDetails: action.payload };
        case FETCH_WITHDRAWALS_DETAILS_SUCCESS:
            return { ...state, loading: false, withdrawalsDetails: action.payload };
        case FETCH_TRANSACTIONS_DETAILS_SUCCESS:
            return { ...state, loading: false, transactionsDetails: action.payload };
        case FETCH_PL_TRANSACTIONS_DETAILS_SUCCESS:
            return { ...state, loading: false, profitLossTransactionsDetails: action.payload };
        case FETCH_ACCOUNT_STATEMENT_DETAILS_SUCCESS:
            return { ...state, loading: false, accountStatementDetails: action.payload };
        case FETCH_DEPOSIT_METHOD_FAILURE:
        case FETCH_DEPOSIT_DETAILS_FAILURE:
        case FETCH_WITHDRAWALS_DETAILS_FAILURE:
        case FETCH_TRANSACTIONS_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload, depositDetails : [] };
        case FETCH_PL_TRANSACTIONS_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload, depositDetails : [] };
        case FETCH_ACCOUNT_STATEMENT_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload, accountStatementDetails : {} };
        default:
            return state;
    }
};