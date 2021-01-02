import { REGISTER_SUCCESS_ACTION, REGISTER_FAILURE_ACTION } from './types';
import { loginSuccessActionCreator } from './loginActions'
import axios from 'axios';

//action creators
const registerSuccessActionCreator = () => {
    return {
        type: REGISTER_SUCCESS_ACTION
    }
}

const registerFailureActionCreator = (message) => {
    return {
        type: REGISTER_FAILURE_ACTION,
        payload: message 
    }
}

//actions
//* local register
export const registerThunk = (candidateData) => dispatch =>{
    axios.post(`${process.env.REACT_APP_API_SERVER}/api/register`, {
        fullName: candidateData.name,
        email: candidateData.email,
        password: candidateData.password,
    })
        .then((res) => {
            if (res.data == null) {
                dispatch(registerFailureActionCreator("Unknown Error, no response."));
            } else if (!res.data.token) {
                dispatch(registerFailureActionCreator(res.data.message))
            } else {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userType", res.data.userType);
                dispatch(registerSuccessActionCreator());
                dispatch(loginSuccessActionCreator(res.data.userType));
        }
        })
        .catch(err => console.trace(err))
}
