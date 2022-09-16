import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ParticipantDash from './ParticipantDash';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/participantdash" element={<ParticipantDash />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
