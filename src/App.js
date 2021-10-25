import './App.css';
import Board from './components/Board';
import netaImg from './media/images/Netta-Barzilai.jpg';
import moveoImg from './media/images/moveo.jpg';

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
