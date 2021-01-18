import { PROFILE_SUCCESS_ACTION, PROFILE_FAILURE_ACTION } from '../actions/types';

const initialState = {
    errorMessage: null,
    userData: {},
}


export const profileReducer = (state = initialState, action) =>{
    switch (action.type) {
        case PROFILE_SUCCESS_ACTION:
            return {
                userData:  {...state.userData,...action.payload }
            }
        case PROFILE_FAILURE_ACTION:
            return {
                errorMessage: action.payload
            };
        default:
            return state;
    }
};