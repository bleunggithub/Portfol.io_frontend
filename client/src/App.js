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
import ProfilePages from './Pages/ProfilePages'
import ProjectPages from './Pages/ProjectPages'
import AboutProject from './Pages/AboutProject'

//CSS
import './App.css';
import "@fontsource/roboto"
import "@fontsource/montserrat/400.css"
import { AnimatedSwitch } from 'react-router-transition';

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
  
  
  function mapStyles(styles) {
    return {
      transform: `translateY(${styles.offset}%)`,
    };
  }

  const riseTransition = {
    atEnter: {
      opacity: 0,
      offset: 100,
    },
    atLeave: {
      opacity: 0,
      offset:100,
    },
    atActive: {
      opacity: 1,
      offset:0,
    },
  };
  
  return (
    <Router>
      <AnimatedSwitch
          atEnter={riseTransition.atEnter}
          atLeave={riseTransition.atLeave}
          atActive={riseTransition.atActive}
          mapStyles={mapStyles}
        >
        <Route path="/about" exact component={AboutProject} />
      </AnimatedSwitch>

      <Switch>
        <PrivateRoute path="/project/:id" exact component={ProjectPages} /> 
        <PrivateRoute path="/profile/:id" component={ProfilePages} />
        <PrivateRoute path="/profile" component={ProfilePages} />
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
