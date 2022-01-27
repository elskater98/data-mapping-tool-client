import {combineReducers} from "@reduxjs/toolkit";
import instanceReducer from "./instanceReducer";
import mappingReducer from "./mappingReducer";


const rootReducer = combineReducers({instance: instanceReducer, mapping: mappingReducer})

export default rootReducer;