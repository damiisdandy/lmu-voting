const reducer: ReducerType = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case "CLOSE_SIDEBAR":
      return { ...state, isSidebarOpen: false };
    case "SET_IS_AUTH":
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case "SET_LOADER":
      return {
        ...state,
        loader: action.payload,
      };
    case "SET_TIMER":
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    default:
      return { ...state };
  }
};

export default reducer;
