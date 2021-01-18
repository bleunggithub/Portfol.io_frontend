import { REGISTER_SUCCESS_ACTION, REGISTER_FAILURE_ACTION } from '../actions/types';

const initialState = {
    errorMessage: null
}

export const registerReducer = (state = initialState, action) =>{
    switch (action.type) {
        case REGISTER_SUCCESS_ACTION:
            return state;
        case REGISTER_FAILURE_ACTION:
            return {
                errorMessage: action.payload
            };
        default:
            return state;
    }
};