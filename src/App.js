import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Featured from './pages/Featured';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/featured/' component={Featured} />
      </Switch>
    </>
  );
}

export default App;
