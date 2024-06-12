import actions from "./action";
// import { updateCategory } from "./actionCreator";

const initialState = {
    Categories: [],
    addCategories: {},
    updateCategory: {},
    deleteCategory: {},
};

const categoryReducer = (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case actions.CATEGORY_GET:
            return {
                ...state,
                Categories: data,
            };
        case actions.CATEGORY_ADD:
            return {
                ...state,
                addCategories: data,
            };
        case actions.CATEGORY_UPDATE:
            return {
                ...state,
                updateCategory: data,
            };
        case actions.CATEGORY_DELETE:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default categoryReducer;
