import React from 'react';
import logo from '../../../assets/img/logo/logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import { Provider } from 'react-redux';
import {store} from '../../../config/redux'




function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login"  exact component={Login}>
              {/* <Login /> */}
            </Route>
            <Route path="/register" exact component={Register}>
              {/* <Register /> */}
            </Route>
            <Route path="/"  exact component={Dashboard}>
              {/* <Dashboard /> */}
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
