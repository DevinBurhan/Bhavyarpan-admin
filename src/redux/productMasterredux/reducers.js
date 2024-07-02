import actions from "./action";
const initialState = {
    productMaster: [],
    addproductMaster: {},
    updateproductMaster: {},
    deleteproductMaster: {},
};

const productMasterReducer = (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case actions.PRODUCTMASTER_GET:
            return {
                ...state,
                productMaster: data,
            };
        case actions.PRODUCTMASTER_ADD:
            return {
                ...state,
                addproductMaster: data,
            };
        case actions.PRODUCTMASTER_UPDATE:
            return {
                ...state,
                updateproductMaster: data,
            };
        case actions.PRODUCTMASTER_DELETE:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default productMasterReducer;
