import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react"; 

const queryClient = new QueryClient();

interface QueryProviderProps {
  children: ReactNode; 
}

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

export default QueryProvider;
