import Routes from "./Navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
