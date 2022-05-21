interface GlobalState {
  isSidebarOpen: boolean;
  isAuthenticated: boolean;
}

interface Action {
  type: "TOGGLE_SIDEBAR" | "SET_IS_AUTH" | "CLOSE_SIDEBAR";
  payload?: any;
}

type ReducerType = (state: GlobalState, action: Action) => GlobalState;

type ContextHook = () => {
  state: GlobalState;
  dispatch: (action: Action) => void;
};
