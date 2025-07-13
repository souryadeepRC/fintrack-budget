import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@/store";
import { Toaster } from "sonner";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Toaster richColors position="top-right" />
          {children}
        </QueryClientProvider>
      </Provider>
    </>
  );
};
export default AppProvider;
