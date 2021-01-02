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
export const profileFetchThunk = (userId, accessToken) => dispatch => {
    console.log(userId, accessToken)
    // localStorage.removeItem('token')
    axios.post(`${process.env.REACT_APP_API_SERVER}/getProfile/${userId}`, {
        userId, accessToken
    })
        .then((res) =>
            // console.log(res.data)
        {
            if (res.data == null) {
                dispatch(profileFailureActionCreator("Unknown Error, no response."));
            } else if (res.status != 200) {
                dispatch(profileFailureActionCreator(res.data.message))
            } else {
                // console.log(res.data)
                // localStorage.setItem('projects',JSON.stringify(res.data.projects));
                // console.log(localStorage.getItem('projects'))
                dispatch(profileSuccessActionCreator(res.data));
        }
        }
        )
        .catch(err => console.trace(err))
}

//fetch own profile (no params)
export const ownProfileFetchThunk = (accessToken) => dispatch => {
    axios.post(`${process.env.REACT_APP_API_SERVER}/getOwnProfile/`, {
        accessToken
    })
        .then((res) =>
            // console.log(res.data)
        {
            if (res.data == null) {
                dispatch(profileFailureActionCreator("Unknown Error, no response."));
            } else if (res.status != 200) {
                dispatch(profileFailureActionCreator(res.data.message))
            } else {
                // console.log(res.data)
                // localStorage.setItem('projects',JSON.stringify(res.data.projects));
                // console.log(localStorage.getItem('projects'))
                dispatch(profileSuccessActionCreator(res.data));
        }
        }
        )
        .catch(err => console.trace(err))
}

//update profile fields

export const updateProfileThunk = (candidateData) => dispatch => {
    axios.post(`${process.env.REACT_APP_API_SERVER}/updateProfile/`, {
        candidateData
    }).then(res => {
        console.log(res)

        if (res.data == null) {
            dispatch(profileFailureActionCreator("Unknown Error, no response."));
        } else if (res.status != 200) {
            dispatch(profileFailureActionCreator("An Error has occurred while updating profile."))
        } else {
            // localStorage.setItem('projects',JSON.stringify(res.data.projects));
            dispatch(profileSuccessActionCreator(res.data))
        }
    }).catch(err => console.trace(err))
}