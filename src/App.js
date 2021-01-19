import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { connect, useSelector } from 'react-redux';


//Components, pages
import TopBar from './Component/TopBar'
import Landing from './Pages/Landing'
import Dashboard from './Pages/Dashboard'
import Discover from './Pages/Discover'
import Settings from './Pages/Settings'
import ProfilePages from './Pages/ProfilePages'
import ProjectPages from './Pages/ProjectPages'
import NewProjectPage from './Pages/NewProjectPage'

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
  
  
 const isAuthenticated = useSelector(state => state.login.isAuthenticated)

  return (
    <Router>

      <Switch>
        {isAuthenticated ? "": <TopBar />}
      
        <PrivateRoute path="/project/addNewProject" exact component={NewProjectPage} /> 
        <PrivateRoute path="/project/:id" component={ProjectPages} /> 
        <PrivateRoute path="/profile/:id" component={ProfilePages} />
        <PrivateRoute path="/profile" exact component={Settings} />
        <PrivateRoute path="/settings" exact component={Settings} /> 
        <PrivateRoute path="/discover" exact component={Discover} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <Route path="/" exact component={Landing} />
      </Switch>

    </Router>
  );
}

export default App;
