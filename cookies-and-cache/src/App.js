import logo from './cookies.jpg';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <>
      <Layout>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              We all start from somewhere
            </p>
          </header>
        </div>
      </Layout>
    </>
  );
}

export default App;
