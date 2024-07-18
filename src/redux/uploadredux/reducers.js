import actions from "./action";
const initialState = {
  list: [],
  add: {},
  update: {},
};

const uploadReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.UPLOAD_GET:
      return {
        ...state,
        list: data,
      };
    case actions.UPLOAD_ADD:
      return {
        ...state,
        add: data,
      };
    case actions.BANNER_UPDATE:
      return {
        ...state,
        update: data,
      };
    case actions.UPLOAD_DELETE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default uploadReducer;
