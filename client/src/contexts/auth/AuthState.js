import React, { useReducer } from 'react';
import axios from 'axios';
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
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    // Load User
    const loadUser = () => {

    }
    // Register User
    const register = async(formData) => {
        const config = {
            headers: {
                'Content-Type': 'Application/json'
            }
        }
        try {
            const res = await axios.post(`/api/users`, formData, config);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data})
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    }
    // Login User
    const login = () => {

    }
    // Logout
    const logout = () => {

    }
    // Clear Errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            error: state.error,
            loading: state.loading,
            register,
            login,
            logout,
            clearErrors,
            loadUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;