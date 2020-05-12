import {
  LIST_ALL,
  ADD_TASK,
  UPDATE_STATUS_TASK,
  DElETE_TASK,
} from "../contants/actionType";

var data = JSON.parse(localStorage.getItem("tasks"));
var initalState = data ? data : [];

var id = "";
var index = -1;
// console.log(data)

var s4 = () => {
  return Math.floor((1 + Math.random()) * 0x100000)
    .toString(16)
    .substring(1);
};

var generateID = () => {
  return s4() + s4() + "-" + s4();
};

var findIndex = (tasks, id) => {
  var result = -1;
  tasks.forEach((task, index) => {
    if (task.id === id) {
      result = index;
    }
  });
  return result;
};

var myReducer = (state = initalState, action) => {
  switch (action.type) {
    case LIST_ALL:
      return state;
    case ADD_TASK:
      var newTask = {
        id: generateID(),
        name: action.task.name,
        status: action.task.status,
      };
      state.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case UPDATE_STATUS_TASK:
      id = action.id;
      index = findIndex(state, id);
      state[index] = {
        ...state[index],
        status: !state[index].status,
      };
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case DElETE_TASK:
      id = action.id;
      index = findIndex(state, id);
      state.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    default:
      return state;
  }
};

export default myReducer;
