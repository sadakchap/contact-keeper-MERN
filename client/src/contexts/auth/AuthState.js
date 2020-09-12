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
import setAuthToken from '../../utils/setAuthToken';


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
    const loadUser = async() => {
        if(localStorage.token){
            setAuthToken(localStorage.getItem('token'));
        }
        try {
            const res = await axios.get('/api/auth');
            console.log(res.data);
            dispatch({
                type: USER_LOADED,
                payload: res.data.user
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            });
        }
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
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    }
    // Login User
    const login = async(formData) => {
        const config = {
            headers: {
                'Content-Type': 'Application/json'
            }
        }
        try {
            console.log('fontent', formData);
            const res = await axios.post(`/api/auth/login`, formData, config);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
        }
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