import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "regenerator-runtime/runtime.js";

import Menu from './components/Menu.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const App = () => {
 


          return(
         
            <div className="container-fluid">
  <Menu/>
            </div>
          
         
      
         
        
          );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
