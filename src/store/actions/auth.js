import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess = (authData) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
        };
};

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error,
        };
};

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START,
        };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime*1000);
    };
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const auth =( email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNzOUD49icpz_sGzBnsSvBW12R1UPS5kU';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNzOUD49icpz_sGzBnsSvBW12R1UPS5kU'
        };
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error => {
            // console.log(error);
            // console.log(error.response);
            dispatch(authFail(error.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    }
}