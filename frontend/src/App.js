import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Blog from './components/Blog/Blog'

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
      <Header />
      </header>
      <div className='App-Blog'>
      <Blog />
      </div>
      
      <footer className="App-footer">
        <Footer />
      </footer>


    </div>
  );
}

export default App;
