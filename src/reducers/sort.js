import { SORT } from "../contants/actionType";

var initialState = {
  by: "name",
  value: 1, // 1 tăng, -1 giảm,
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case SORT:
      // console.log(action);
      return { by: action.sort.by, value: action.sort.value };
    default:
      return state;
  }
};

export default myReducer;
