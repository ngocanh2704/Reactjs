import { LIST_ALL, ADD_TASK, TOGGLE_FORM, OPEN_FORM, CLOSE_FORM, UPDATE_STATUS_TASK } from "../contants/actionType";

export const listAll = () => {
  return {
    type: LIST_ALL,
  };
};

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    task, // task : task
  };
};

export const toggleForm = () => {
  return {
    type: TOGGLE_FORM,
  };
};

export const openForm = () =>{
    return {
        type: OPEN_FORM
    }
}

export const closeForm = () =>{
    return {
        type: CLOSE_FORM
    }
}


export const updateStatus = (id) => {
  return {
    type: UPDATE_STATUS_TASK,
    id // id: id
  }
}