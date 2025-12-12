
import AppRouter from './routes/AppRouter'
import { BrowserRouter as Router } from 'react-router-dom';
import { DateFilterProvider } from "@/contexts/DateFilterContext";
import { TenantProvider } from '@/contexts/TenantContext';


function App() {

  return (
    <TenantProvider>
      <DateFilterProvider>
      <Router>
        <AppRouter />
      </Router>
      </DateFilterProvider>
    </TenantProvider>
  );
}

export default App
