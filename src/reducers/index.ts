import {combineReducers} from "@reduxjs/toolkit";
import instanceReducer from "./instanceReducer";


const rootReducer = combineReducers({instance: instanceReducer})

export default rootReducer;