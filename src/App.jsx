import { AppProvider } from './contexts/AppContext';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';

function App() {
  return (
    <AppProvider>
      <div className="app-wrapper">
        <Navbar />
        <Homepage />
      </div>
    </AppProvider>
  );
}

export default App;
