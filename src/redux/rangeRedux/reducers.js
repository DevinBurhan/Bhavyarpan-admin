import actions from "./action";
const initialState = {
    content: [],
    addContent: {},
    updateContent: {},
};

const rangeReducer = (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case actions.RANGE_GET:
            return {
                ...state,
                content: data,
            };
        case actions.RANGE_ADD:
            return {
                ...state,
                addContent: data,
            };
        case actions.RANGE_UPDATE:
            return {
                ...state,
                updateContent: data,
            };
        case actions.RANGE_DELETE:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default rangeReducer;
