import { RootState } from "@/store";

export const selectIsMobile = (store: RootState): boolean => store.app.isMobile;
