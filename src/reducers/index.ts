import {combineReducers} from "@reduxjs/toolkit";
import mainReducer from "./mainReducer";
import cleaningReducer from "./cleaningReducer";


const rootReducer = combineReducers({main: mainReducer, cleaning: cleaningReducer})

export default rootReducer;