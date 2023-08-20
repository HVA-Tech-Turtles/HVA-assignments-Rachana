import React from 'react';
import Footerelem from './components/Footerelem';
import './App.css';
import Banner from './components/Banner';
import NewsApp from './NewsApp';

const App = () => {
  return (
    <div className="container">

      <div id='header'>
          <Banner/>
      </div>
      <div className="content">
        
        
        <div id='feed'>

          <NewsApp/>
          
        </div>
        
      </div>
      <footer className="footer">
        <Footerelem/>
      </footer>
    </div>
  );
};

export default App;
