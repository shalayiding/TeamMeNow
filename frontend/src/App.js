import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Blog from './components/Blog/Blog'
import {NextUIProvider} from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
     
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
     
    </NextUIProvider>
  );
}

export default App;
