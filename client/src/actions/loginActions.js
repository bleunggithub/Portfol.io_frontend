import { LOGIN_SUCCESS_ACTION, LOGIN_FAILURE_ACTION, LOGOUT_NOW_ACTION } from './types';
import axios from 'axios';

//action creators
export const loginSuccessActionCreator = (userType) => {
    return {
        type: LOGIN_SUCCESS_ACTION,
        payload: userType
    }
}

const loginFailureActionCreator = (message) => {
    return {
        type: LOGIN_FAILURE_ACTION,
        payload: message 
    }
}

const logoutSuccessActionCreator = () =>{
    return {
        type: LOGOUT_NOW_ACTION,
    };
}

//actions
//* local login
export const loginUserThunk = (email, password) => dispatch =>{
    axios.post(`${process.env.REACT_APP_API_SERVER}/api/login`, {
        email: email,
        password: password
    })
        .then((res) => {
            if (res.data == null) {
                dispatch(loginFailureActionCreator("Unknown Error, no response."));
            } else if (!res.data.token) {
                dispatch(loginFailureActionCreator(res.data.message))
            } else {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userType", res.data.userType);
                dispatch(loginSuccessActionCreator(res.data.userType));
        }
    }).catch(err=> console.trace(err))
}

//* facebook login
export const loginFacebookThunk = (userData) => dispatch => {
    return axios.post(`${process.env.REACT_APP_API_SERVER}/api/login/facebook`, {
        name: userData.name,
        email: userData.email,
        picture: userData.picture.data.url,
        id: userData.id,
        accessToken: userData.accessToken
    })
        .then((res) => {
            if (res.data == null) {
                dispatch(loginFailureActionCreator("Unknown Error"));
            } else if (!res.data.token) {
                dispatch(loginFailureActionCreator(res.data.message || ""));
            } else {
                // console.log(res.data)
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userType", res.data.userType);
                dispatch(loginSuccessActionCreator(res.data.userType))
        }
    }).catch((err)=> console.trace(err))
}


//* google login
export const loginGoogleThunk = (userData) => dispatch => {
    return axios.post(`${process.env.REACT_APP_API_SERVER}/api/login/google`, {
        name: userData.profileObj.name,
        email: userData.profileObj.email,
        picture: userData.profileObj.imageUrl,
        id: userData.googleId,
        accessToken: userData.accessToken,
        tokenId: userData.tokenId
    })
        .then((res) => {
            if (res.data == null) {
                dispatch(loginFailureActionCreator("Unknown Error"));
            } else if (!res.data.token) {
                dispatch(loginFailureActionCreator(res.data.message || ""));
            } else {
                // console.log(res.data)
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userType", res.data.userType);
                dispatch(loginSuccessActionCreator(res.data.userType))
        }
    }).catch((err)=> console.trace(err))
}


//* log out
export const logoutNowThunk = () => dispatch => {
    // localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    dispatch(logoutSuccessActionCreator());
}