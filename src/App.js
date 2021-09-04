import LandingPage from './components/LandingPage/LandingPage';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <LandingPage/>
      </div>
    </Router>
  );
}

export default App;
