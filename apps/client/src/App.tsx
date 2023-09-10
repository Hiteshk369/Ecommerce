import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./Navigation";
import store from "./redux/store";

export const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
          <Toaster
            containerStyle={{
              zIndex: 1000000000,
            }}
          />
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
