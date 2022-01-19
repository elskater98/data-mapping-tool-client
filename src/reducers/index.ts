import {combineReducers} from "@reduxjs/toolkit";
import mappingReducer from "./mappingReducer";


const rootReducer = combineReducers({mapping: mappingReducer})

export default rootReducer;