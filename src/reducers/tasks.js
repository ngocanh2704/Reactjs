import { LIST_ALL, ADD_TASK } from "../contants/actionType";

var data = JSON.parse(localStorage.getItem("tasks"));
var initalState = data ? data : [];
// console.log(data)

var s4 = () => {
  return Math.floor((1 + Math.random()) * 0x100000)
    .toString(16)
    .substring(1);
};

var generateID = () => {
  return s4() + s4() + "-" + s4();
};

var myReducer = (state = initalState, action) => {
  switch (action.type) {
    case LIST_ALL:
      return state;
    case ADD_TASK:
      var newTask = {
        id: generateID(),
        name: action.task.name,
        state: action.task.status === "true" ? true : false,
      };

      state.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    default:
      return state;
  }
};

export default myReducer;
