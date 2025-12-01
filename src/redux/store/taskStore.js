import { applyMiddleware, combineReducers, createStore } from "redux";
import taskReducer from "../reducer/reducer";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  tasksRoot: taskReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
