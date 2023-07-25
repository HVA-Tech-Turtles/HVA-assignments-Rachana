import React from 'react';
import Footerelem from './components/Footerelem';
import './App.css';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Weather from './components/Tweet/Weather';


const App = () => {
  return (
    <div className="container">

      <div id='header'>
          <Banner/>
          <div id='navbar'>
          <Navbar/>
        </div>
      </div>
      <div className="content">
        
        
        <div id='feed'>

          <Weather/>
          
        </div>
        
      </div>
      <footer className="footer">
        <Footerelem/>
      </footer>
    </div>
  );
};

export default App;
