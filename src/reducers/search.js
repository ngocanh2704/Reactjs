import { SEARCH } from "../contants/actionType";

var initialState = "";

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return action.keyword;
    default:
      return state;
  }
};

export default myReducer;
