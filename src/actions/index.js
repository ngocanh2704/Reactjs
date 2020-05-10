import { LIST_ALL, ADD_TASK } from "../contants/actionType"

export const listAll = () => {
    return {
        type: LIST_ALL
    }
}

export const addTask = (task) =>{
    return {
        type: ADD_TASK,
        task // task : task
    }
}