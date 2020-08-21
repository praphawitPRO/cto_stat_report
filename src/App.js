import React from 'react';
import './App.css';
import Tap from './components/tap';
import Header from './components/header';
import { useSelector } from 'react-redux';
import Login from './components/login';
function App() {
  const dataLogin = useSelector(state => state.report.dataLogin);
  document.title = 'CTO Work Statistics';
  
    if(Object.keys(dataLogin).length === 0){
      return (
        
        <Login />
        
      );
    }else{
      return (
        <div className="App">
          <Header />
          <Tap />
        </div>
      );
    }
    
  
}

export default App;
