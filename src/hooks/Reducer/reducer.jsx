export const initialState = {
    showDone: false,
    sortBy: 'difficulty',
    taskPerPage: 3,
  };
  
  export const stateReducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "changeShow":
        return { ...state, showDone: payload };
  
      case "changeSort":
        return { ...state, sortBy: payload };
  
      case "changeTasksNum":
        return { ...state, taskPerPage: payload };
  
      default:
        return state;
    }
  };

  
  