import { combineReducers } from "redux";
import {loginReducer} from "./loginReducer";
import {registerReducer} from "./registerReducer";
import {profileReducer} from "./profileReducer";



export default combineReducers({
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
})
