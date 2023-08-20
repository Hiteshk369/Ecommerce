import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Navigation";
import store from "./redux/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

export const queryClient = new QueryClient();

function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Provider>
    </CookiesProvider>
  );
}

export default App;
