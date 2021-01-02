import React from 'react';
import { Link } from 'react-router-dom';

// UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import appIcon from '../img/app-icon.png'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100vw',
        backgroundColor: '#fff',
    },
    appBar: {
        // borderBottom: '1px solid #546e7a'  
    },
    tabs: {
        marginTop: '1em'
    },
    link: {
        color: theme.palette.primary.contrastText,
    },

}));


export default function TopBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value); 

  const handleChange = (e, v) => {
    setValue(v);
  };

  return (
    <Grid container className={classes.root}>
      <AppBar position="fixed" color="secondary" elevation="0" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="on"
          indicatorColor="primary"
          aria-label="Sign Up, Log In"
          centered
              >
          <div style={{display:"flex", alignItems:"flex-end", marginRight:"2em"}}>
          <img src={appIcon} style={{ height: "2em", marginBottom:"0.5em"}} alt="app logo" />
            </div>
  
            <Tab className={ classes.tabs } label="Explore" value="explore" component={ Link } to="/" />
            <Tab className={ classes.tabs } label="Sign Up" value="signUp" component={ Link } to="/signUp" />
            <Tab className={ classes.tabs } label="Log In" value="logIn" component={ Link } to="/logIn" />
  
        </Tabs>
      </AppBar>
          
      
    </Grid>
  );
}

