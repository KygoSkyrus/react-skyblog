import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Toast, ToastContainer } from 'react-bootstrap'

import './App.css';



import Homepage from './components/Homepage';

function App() {



  

  return (
    <Router>
      <div className="App">
      
  
     <Homepage />
        


        {/* <Route path="/success" component={Success}>
          <Success />
        </Route>

        <Route path="/failed" component={Failed}>
          <Failed />
        </Route> */}

      </div>
    </Router>
  );
}

export default App;
