import { PROFILE_SUCCESS_ACTION, PROFILE_FAILURE_ACTION } from './types';
import axios from 'axios';

//action creators
export const profileSuccessActionCreator = (userData) => {
    return {
        type: PROFILE_SUCCESS_ACTION,
        payload: userData
    }
}

const profileFailureActionCreator = (message) => {
    return {
        type: PROFILE_FAILURE_ACTION,
        payload: message 
    }
}


//actions
//fetch candidate profile
export const profileFetchThunk = (id, accessToken) => dispatch => {
    // console.log(id, accessToken)
    axios.post(`${process.env.REACT_APP_API_SERVER}/users/getProfile/${id}`, {
        accessToken
    })
        .then((res) =>
            // console.log(res.data)
        {
            if (res.data === null) {
                dispatch(profileFailureActionCreator("Unknown Error, no response."));
            } else if (res.status !== 200) {
                dispatch(profileFailureActionCreator(res.data.message))
            } else {
                dispatch(profileSuccessActionCreator(res.data));
        }
        }
        )
        .catch(err => console.trace(err))
}

//fetch own profile
export const ownProfileFetchThunk = (accessToken) => dispatch => {
    axios.post(`${process.env.REACT_APP_API_SERVER}/users/getOwnProfile/`, {
        accessToken
    })
        .then((res) =>
            // console.log(res.data)
        {
            if (res.data === null) {
                dispatch(profileFailureActionCreator("Unknown Error, no response."));
            } else if (res.status !== 200) {
                dispatch(profileFailureActionCreator("An error has occured. "))
            } else {
                // console.log(res.data)
                dispatch(profileSuccessActionCreator(res.data));
        }}
        ).catch(err => console.trace(err))
}

//update profile fields

export const updateProfileThunk = (userData) => dispatch => {
    let accessToken = localStorage.getItem('token')

    axios.post(`${process.env.REACT_APP_API_SERVER}/users/updateProfile/`, {
        userData, accessToken
    }).then(res => {
        // console.log(res)

        if (res.data === null) {
            dispatch(profileFailureActionCreator("Unknown Error, no response."));
        } else if (res.status !== 200) {
            dispatch(profileFailureActionCreator("An error has occurred while updating profile."))
        } else {
            dispatch(profileSuccessActionCreator(res.data))
        }
    }).catch(err => console.trace(err))
}

//follow/unfollow

export const followProfileThunk = (id, accessToken) => dispatch => {
    // console.log(id, accessToken)

    axios.post(`${process.env.REACT_APP_API_SERVER}/users/follow/${id}`, {
        accessToken
    }).then(res => {
        console.log(res)

        if (res.data === null) {
            dispatch(profileFailureActionCreator("Unknown Error, no response."));
        } else if (res.status !== 200) {
            dispatch(profileFailureActionCreator("An error has occurred."))
        } else {
            dispatch(profileSuccessActionCreator(res.data))
        }
    }).catch(err => console.trace(err))
}