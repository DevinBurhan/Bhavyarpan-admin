import actions from "./action";
const initialState = {
    subCategory: [],
    addsubCategory: {},
    updatesubCategory: {},
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
                banner: data,
            };
        case actions.SUBCATEGORY_ADD:
            return {
                ...state,
                addbanner: data,
            };
        case actions.SUBCATEGORY_UPDATE:
            return {
                ...state,
                updatebanner: data,
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
