import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, LOGIN_SUCCESS, AUTH_ERROR, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS } from '../types';

export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
            };
    
        case REGISTER_FAIL:
            localStorage.removeItem(('token'));
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            };
    
        case USER_LOADED:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            };
        
        case LOGIN_SUCCESS:
            return state;
    
        case LOGIN_FAIL:
            return state;
    
        case LOGOUT:
            return state;
    
        case CLEAR_ERRORS:
        case AUTH_ERROR:
            return {
                ...state,
                error: null
            };
    
        default:
            return state;
    }
}