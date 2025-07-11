import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@/store";
import { useEffect } from "react";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const handleSecureCall = async () => {
    const res = await fetch("/api/secure-handler");
    console.log({ res });

    const text = await res.text();
    console.log({ text });
    console.log(text);
  };
  useEffect(() => {
    handleSecureCall();
  }, []);
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </>
  );
};
export default AppProvider;
