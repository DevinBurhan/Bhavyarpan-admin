import actions from "./action";
const initialState = {
    subCategories: [],
    addsubCategories: {},
    updatesubCategory: {},
    deletesubCategory: {},
};

const subCategoryReducer = (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case actions.SUBCATEGORY_GET:
            return {
                ...state,
                getsubCategory: data,
            };
        case actions.SUBCATEGORY_ADD:
            return {
                ...state,
                addsubCategory: data,
            };
        case actions.SUBCATEGORY_UPDATE:
            return {
                ...state,
                updatesubCategory: data,
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
