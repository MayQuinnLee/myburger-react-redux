import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess = (authData) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.userId
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
            dispatch(authSuccess(response.data))
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        })

    }
}