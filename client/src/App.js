import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';


//Components, pages
import Landing from './Pages/Landing'
import LogIn from './Pages/LogIn'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Discover from './Pages/Discover'
import Settings from './Pages/Settings'
import Profile from './Component/Profile'
import Project from './Component/Project'

//CSS
import './App.css';
import "@fontsource/roboto"
import "@fontsource/montserrat/400.css"

function App() {
  //define logged in only route
  const PurePrivateRoute = ({ component, isAuthenticated, ...rest }) => {
    const Component = component;
    if (Component != null) {
      return (
        <Route
          {...rest}
          render={(props) =>
            isAuthenticated ? (<Component {...props} />) : (<Redirect to={{ pathname: "/logIn", }}/>)
          }
        />
      );
    } else { return null; }
  };

  const PrivateRoute = connect((state) => ({
      isAuthenticated: state.login.isAuthenticated,
    }))(PurePrivateRoute); 
  
  
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/project/:id" exact component={Discover} /> 
        <PrivateRoute path="/profile/:id" exact component={Discover} />
        <PrivateRoute path="/profile/" exact component={Settings} />
        <PrivateRoute path="/settings" exact component={Settings} /> 
        <PrivateRoute path="/discover" exact component={Discover} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <Route path="/signUp" exact component={SignUp} />
        <Route path="/logIn" exact component={LogIn} />
        <Route path="/" exact component={Landing} />
      </Switch>

    </Router>
  );
}

export default App;
