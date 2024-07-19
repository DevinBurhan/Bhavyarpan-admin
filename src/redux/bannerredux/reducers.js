import actions from "./action";
const initialState = {
  banner: [],
  addbanner: {},
  updatebanner: {},
  deletebanner: {},
};

const bannerReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.BANNER_GET:
      return {
        ...state,
        banner: data,
      };
    case actions.BANNER_ADD:
      return {
        ...state,
        addbanner: data,
      };
    case actions.BANNER_UPDATE:
      return {
        ...state,
        updatebanner: data,
      };
    case actions.BANNER_DELETE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default bannerReducer;
