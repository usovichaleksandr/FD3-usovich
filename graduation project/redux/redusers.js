import { combineReducers } from 'redux';

import muviesReducer from "./muviesReducer";

let combinedReducer=combineReducers({
    
    muvies: muviesReducer, 
    
});

export default combinedReducer;