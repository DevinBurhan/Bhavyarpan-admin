import actions from "./action";
const initialState = {
    subCategory: [],
    addSubcategory: {},
    updateSubcategory: {},
    deletesubCategory: {},
};

const subCategoryReducer = (state = initialState, action) => {
    const { type, data } = action;
    console.log("file: reducers.js:11  subCategoryReducer  data", data);
    console.log("file: reducers.js:11  subCategoryReducer  type", type);
    switch (type) {
        case actions.SUBCATEGORY_GET:
            return {
                ...state,
                subCategory: data,
            };
        case actions.SUBCATEGORY_ADD:
            return {
                ...state,
                addSubcategory: data,
            };
        case actions.SUBCATEGORY_UPDATE:
            return {
                ...state,
                updateSubcategory: data,
            };
        case actions.SUBCATEGORY_DELETE:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default subCategoryReducer;
