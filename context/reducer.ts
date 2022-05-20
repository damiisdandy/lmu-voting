const reducer: ReducerType = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    default:
      return { ...state };
  }
};

export default reducer;
