import logo from './cookies.jpg';
import Navbar from './components/Navbar.js'
import './App.css';

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            We all start from somewhere
          </p>
        </header>
      </div>
    </>
  );
}

export default App;
