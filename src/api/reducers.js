import { combineReducers } from "@reduxjs/toolkit";

import newsApi from "./slices/newsApi";
import newYorkTimes from "./slices/newYorkTimes";
import theGuardian from "./slices/theGuardian";


// alphabetical-wise
const combinedReducer = combineReducers({
    newsApi,
    newYorkTimes,
    theGuardian
});

const RootReducer = (state, action) => {
    if (action.type === "RESET") {
        state = undefined;
    }

    return combinedReducer(state, action);
};

export default RootReducer;
