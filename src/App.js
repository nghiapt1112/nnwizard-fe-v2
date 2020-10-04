import React from 'react';
import './App.less';
import {Switch, Route} from 'react-router-dom';
import CreateOrder from "./screens/CreateOrder";

function App() {
  return (
    <main className="main">
      <Switch>
        <Route path="/create-order" component={CreateOrder} exact/>
      </Switch>
    </main>
  );
}

export default App;
