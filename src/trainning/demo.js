import { createStore } from "redux";
import { status, sort } from "./actions";
import myReducer from "./reducers";


const store = createStore(myReducer);
console.log(store.getState());

// Thực hiện công việc toggle status


store.dispatch(status());

console.log(store.getState());

//Thực hiện công việc sắp xếp tên từ Z-A

store.dispatch(sort({by: 'name', value: -1}));
console.log(store.getState());
