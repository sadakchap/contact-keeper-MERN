import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";


const AuthState = (props) => {

    const initialState = {
        
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    return (
        <AuthContext.Provider value={}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;