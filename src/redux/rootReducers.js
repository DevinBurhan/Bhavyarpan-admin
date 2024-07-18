import { combineReducers } from "redux";
import authReducer from "./authentication/reducers";
import ChangeLayoutMode from "./themeLayout/reducers";
import categoryReducer from "./categoryredux/reducers";
import subcategoryReducer from "./subcategoryredux/reducers";
import productMasterReducer from "./productMasterredux/reducers";
import bannerReducer from "./bannerredux/reducers";

const rootReducers = combineReducers({
    auth: authReducer,
    ChangeLayoutMode,
    categoryReducer: categoryReducer,
    subcategoryReducer: subcategoryReducer,
    productMasterReducer: productMasterReducer,
    bannerReducer: bannerReducer,
});

export default rootReducers;
