import React from 'react';
import { Redirect } from 'react-router-dom';


// UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import appIcon from '../img/app-icon.png'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//Pages
import Landing from '../Pages/Landing'
import LogIn from '../Pages/LogIn'
import SignUp from '../Pages/SignUp'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: '#f5f5f5',
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
  const [value, setValue] = React.useState(1);

  const handleChange = (e, v) => {
    setValue(v);
  };

  
  const parentChangeTabCB = (data) => {
    setValue(data)
  }
  if (props.redirect === "/dashboard") {
    return <Redirect to="/dashboard" />
  }
  return (
    <div className={classes.root}>
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
  
          <Tab className={classes.tabs} label="Explore" {...a11yProps(1)} />
            <Tab className={ classes.tabs } label="Sign Up" {...a11yProps(2)}/>
            <Tab className={ classes.tabs } label="Log In" {...a11yProps(3)} />
  
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={1}>
        <Landing parentChangeTabCB={parentChangeTabCB} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SignUp />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <LogIn />
      </TabPanel>
      
    </div>
  );
}

