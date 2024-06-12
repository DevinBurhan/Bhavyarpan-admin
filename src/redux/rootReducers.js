import { combineReducers } from "redux";
import authReducer from "./authentication/reducers";
import ChangeLayoutMode from "./themeLayout/reducers";
import categoryReducer from "./categoryredux/reducers";

const rootReducers = combineReducers({
    auth: authReducer,
    ChangeLayoutMode,
    categoryReducer: categoryReducer,
});

export default rootReducers;
