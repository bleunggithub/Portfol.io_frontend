import { LOGIN_SUCCESS_ACTION, LOGIN_FAILURE_ACTION, LOGOUT_NOW_ACTION } from '../actions/types';


const initialState = {
    isAuthenticated: false || localStorage.getItem("token") != null, 
    userType: !localStorage.getItem('userType')? 'guest' : localStorage.getItem('userType'),
    errorMessage: null
}


export const loginReducer = (state = initialState, action) =>{
    switch (action.type) {
        case LOGIN_SUCCESS_ACTION:
            return {
                isAuthenticated: true,
                userType: action.payload
            };
        case LOGIN_FAILURE_ACTION:
            return {
                isAuthenticated: false,
                errorMessage: action.payload};
        case LOGOUT_NOW_ACTION:
            return {
                isAuthenticated: false,
                userType: 'guest'
            }
        default:
            return state;
    }
};