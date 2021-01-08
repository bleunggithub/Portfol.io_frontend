import React, { Component } from 'react'

//Components, pages
import TopBar from '../Component/TopBarLoggedIn'
import Profile from '../Component/Profile'

//UI, CSS
import Grid from '@material-ui/core/grid';


const location = "discover"

export default class ProfilePages extends Component {
    render() {
        return (
            <React.Fragment>
            <Grid container>
                    <TopBar value={location} />
                    <Grid style={{width:"100%", marginTop: "11vh"}} />

                    <Profile location={ this.props.location.pathname } params={ this.props.match.params }/>
            </Grid>
            </React.Fragment>
        )
    }
}
