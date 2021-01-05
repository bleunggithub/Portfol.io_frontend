import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

//Redux
import { logoutNowThunk } from '../actions/loginActions';
import { connect } from 'react-redux';

//Components, pages
import TopBar from '../Component/TopBarLoggedIn'
import Submenu from '../Component/Submenu'
import Profile from '../Component/Profile'

//UI, CSS
import Grid from '@material-ui/core/grid';
import './css/settings.css';

const location = "settings"

class Settings extends Component {


    toSettings = () => {
        this.props.history.push("/settings")
    }

    logout = () => {
        this.props.logoutNowThunk()
    }

    render() {
        return (
            <Grid container>
                <TopBar value={location} />
                <Submenu item1="YOUR PROFILE" item2="LOGOUT" handleItem1={ this.toSettings } handleItem2={this.logout} />
                <Profile location={ this.props.location.pathname } params={ this.props.match.params }/>
            </Grid>
        )
    }
}

export default withRouter(connect(null, { logoutNowThunk })(Settings));
