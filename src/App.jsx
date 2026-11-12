import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import PlayerBar from './components/PlayerBar';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <CustomCursor />
      <div className="layout">
        <Sidebar />
        <MainContent />
      </div>
      <PlayerBar />
    </div>
  );
}

export default App;
