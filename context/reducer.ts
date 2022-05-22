const reducer: ReducerType = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case "CLOSE_SIDEBAR":
      return { ...state, isSidebarOpen: false };
    case "SET_IS_AUTH":
      return {
        ...state,
        isAuthenticated: action.payload.status,
        regno: action.payload.regno,
      };
    default:
      return { ...state };
  }
};

export default reducer;
