
import AppRouter from './routes/AppRouter'
import { BrowserRouter as Router } from 'react-router-dom';
import { DateFilterProvider } from "@/contexts/DateFilterContext";


function App() {

  return (
    <DateFilterProvider>
    <Router>
      <AppRouter />
    </Router>
    </DateFilterProvider>
  );
}

export default App
