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
      if(dataLogin[0].department=="President, CRC's Office" || (dataLogin[0].department=="Retail Innovation" && (dataLogin[0].position=="Innovation Engineer Professional"||dataLogin[0].position=="Head of Retail Innovation"))){
        return (
          <div className="App">
            <Header />
            <Tap />
          </div>
        );

      }else{
        return (
          <div className="App">
            <Header />
            
          </div>
        );
      }
      
    }
    
  
}

export default App;
