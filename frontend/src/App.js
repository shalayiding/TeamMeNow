import './App.css';

import Match from "./pages/Match"
import Home from "./pages/Home"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {





  return (
    <Router>

    <Routes>
    
    <Route path = "/match" element={<Match/>}></Route>
    <Route path = "/" element={<Home/>}></Route>



    </Routes>

    </Router>
    
    
    
   
  );
}

export default App;
