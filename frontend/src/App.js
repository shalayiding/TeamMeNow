import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Blog from './components/Blog/Blog'
import {NextUIProvider} from "@nextui-org/react";
import React,{useState,useEffect} from 'react';


function App() {
  
  const [gameData,getGameData] = useState(null)
  const fetchData = (gameName) => {
    fetch(`http://localhost:80/v1/matchs?gamename=${gameName}`)
      .then(response => response.json())
      .then(data => {
        getGameData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  };
  useEffect(()=>{
    const defaultGameName = "League of Legends";
    fetchData(defaultGameName);
  },[]);





  return (
    <NextUIProvider>
     <main className="dark text-foreground bg-background">
    <div className="App">
      
      <Header fetchData = {fetchData}/>
    
      
      <Blog  gameData = {gameData}/>

     
      <Footer />


    </div>
     </main>
    </NextUIProvider>
  );
}

export default App;
