const INITIALSTATE = {
  user: undefined,
  tasklist: [],
  alert: undefined,
};

const taskReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: {
          username: action.payload.username,
          isAdmin: action.payload.isAdmin,
        },
      };
    case "SIGN_UP_USER":
      return {
        ...state,
        user: {
          username: action.payload.username,
          isAdmin: action.payload.isAdmin,
        },
      };

    case "SET_ALL_TASK":
      return {
        ...state,
        tasklist: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        user: null,
        tasklist: [],
        alert: null,
      };
    case "SET_ALERT":
      return {
        ...state,
        alert: {
          message: action.payload.message,
          isError: action.payload.isError,
        },
      };
    case "CLEAR_ALERT":
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
};

export default taskReducer;
