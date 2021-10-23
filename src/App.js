import logo from './logo.svg';
import './App.css';
//import Pads from './components/Pads';
import Board from './components/Board';
//import Music from './components/Music';

//const [playInLoop, setPlayInLoop] = useState(false);
import ReactAudioPlayer from 'react-audio-player';


function App() {
  return (
    <div className="App">
      <h1>Looper</h1>
      <Board></Board>

  
    </div>
  );
}

export default App;

/*
<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
*/