import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AppState {
  isMobile: boolean;
  isLoggedIn: boolean;
  username: string;
  isAppDataLoaded: boolean;
}

const initialState: AppState = {
  isMobile: false,
  isLoggedIn: false,
  username: "",
  isAppDataLoaded: false,
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isMobile: action.payload,
      };
    },
    loginUser: (state) => {
      return {
        ...state,
        isLoggedIn: true,
      };
    },
    setUserDetails: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        ...(!!action.payload && { isLoggedIn: true }),
        username: action.payload,
      };
    },
    logoutUser: (state) => {
      return {
        ...state,
        isLoggedIn: false,
        username: "",
      };
    },
    dataLoadingComplete: (state) => {
      return {
        ...state,
        isAppDataLoaded: true,
      };
    },
    resetApp: () => {
      return initialState;
    },
  },
});

export const {
  setIsMobile,
  loginUser,
  setUserDetails,
  logoutUser,
  dataLoadingComplete,
  resetApp,
} = appSlice.actions;

export default appSlice.reducer;
