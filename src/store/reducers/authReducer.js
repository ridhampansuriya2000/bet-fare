import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REFREASH_LOGIN,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    RESET_USER_DETAILS_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAILURE, VERIFY_OTP_REQUEST, VERIFY_OTP_FAILURE,
} from "../types";

// Define authReducer before using it in rootReducer
const initialState = {
    data: [],
    loading: false,
    error: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
        case LOGOUT_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
        case VERIFY_OTP_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
        case RESET_USER_DETAILS_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case REFREASH_LOGIN :
            return { ...state,  isLogin: action.payload};
        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
            return { ...state, loading: false, error: action.payload, isLogin: false };
        case LOGOUT_SUCCESS:
            return { ...state, loading: false, error: action.payload, isLogin: false, data : {}};
        case LOGOUT_FAILURE:
            return { ...state, loading: false, error: action.payload, isLogin: false, data : {}};
        case FORGOT_PASSWORD_FAILURE:
            return { ...state, loading: false, error: action.payload, data : {}};
        case VERIFY_OTP_FAILURE:
            return { ...state, loading: false, error: action.payload, data : {}};
        default:
            return state;
    }
};

// export default authReducer;