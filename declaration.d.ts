interface GlobalState {
  isSidebarOpen: boolean;
  isAuthenticated: boolean;
  loader: boolean;
  startDate: string | null;
  endDate: string | null;
}

interface Action {
  type:
    | "TOGGLE_SIDEBAR"
    | "SET_IS_AUTH"
    | "CLOSE_SIDEBAR"
    | "SET_LOADER"
    | "SET_TIMER";
  payload?: any;
}

type ReducerType = (state: GlobalState, action: Action) => GlobalState;

type ContextHook = () => {
  state: GlobalState;
  dispatch: (action: Action) => void;
};

interface VoteCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  session: VoteSession;
  nominees: VoteNominee[];
  isVoted: boolean;
  votedFor: VoteNominee;
  createdAt: string;
}

interface VoteNominee {
  id: string;
  name: string;
  regno: number;
  level: number;
  department: string;
  picture: string;
  blurPicture: string;
  isVoted: boolean;
  votes: number;
  category: VoteCategory;
  createdAt: string;
  updatedAt: string;
}

interface Vote {
  name: string;
  regno: number;
  level: number;
  picture: string;
  isVoted: boolean;
  votes: number;
  category: VoteCategory;
  createdAt: string;
  updatedAt: string;
}

interface VoteSession {
  id: string;
  title: string;
  slug: string;
  description: string;
  logo: string;
  isActive: boolean;
  categories: VoteCategory[];
  nominees: VoteNominee[];
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
