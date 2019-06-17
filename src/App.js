import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="mdl-layout">
        <Router>
          <Header />
          <Routes />
        </Router>
      </div>
    );
  }
}
export default App;
