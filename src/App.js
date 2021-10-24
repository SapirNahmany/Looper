import logo from './logo.svg';
import './App.css';
//import Pads from './components/Pads';
import Board from './components/Board';
import netaImg from './media/images/Netta-Barzilai.jpg';
import moveoImg from './media/images/moveo.jpg';
//import Music from './components/Music';

//const [playInLoop, setPlayInLoop] = useState(false);
import ReactAudioPlayer from 'react-audio-player';


function App() {
  return (
    <div className="App">
      <div className = "header">
        <div className='img-container'>
          <img src = {netaImg} height = "150px" width = "150px"/>
        </div>

        <div className = "header-title">
          <h1>Looper</h1>
        </div>

        <div className='img-container moveo-logo'>
          <img src = {moveoImg} height = "150px" width = "150px"/>
        </div>

      </div>
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