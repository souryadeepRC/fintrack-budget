import { RootState } from "@/store";

export const selectIsMobile = (store: RootState): boolean => store.app.isMobile;
export const selectIsLoggedIn = (store: RootState): boolean =>
  store.app.isLoggedIn;
export const selectUsername = (store: RootState): string => store.app.username;
export const selectIsAppDataLoaded = (store: RootState): boolean =>
  store.app.isAppDataLoaded;
