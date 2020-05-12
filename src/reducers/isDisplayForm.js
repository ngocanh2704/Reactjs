import { TOGGLE_FORM, OPEN_FORM, CLOSE_FORM } from "../contants/actionType";

var initialState = false;

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FORM:
      return !state;
    case OPEN_FORM:
      return (state = true);
    case CLOSE_FORM:
      return (state = false);
    default:
      return state;
  }
};

export default myReducer;
