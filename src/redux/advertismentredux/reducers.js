import actions from "./action";
// import { updateCategory } from "./actionCreator";

const initialState = {
  getAdvertisment: [],
  addAdvertisment: {},
  updateAdvertisment: {},
  deleteAdvertisment: {},
};

const advertismentReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.ADVERTISMENT_GET:
      return {
        ...state,
        getAdvertisment: data,
      };
    case actions.ADVERTISMENT_ADD:
      return {
        ...state,
        addAdvertisment: data,
      };
    case actions.ADVERTISMENT_UPDATE:
      return {
        ...state,
        updateAdvertisment: data,
      };
    case actions.ADVERTISMENT_DELETE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default advertismentReducer;
