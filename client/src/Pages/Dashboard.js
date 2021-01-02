import React, { Component } from 'react'

//Components, pages
import TopBar from '../Component/TopBarLoggedIn'
import Submenu from '../Component/Submenu'

//UI, CSS
import Grid from '@material-ui/core/grid';
import './css/dashboard.css';

const location = "forYou"

export default class Dashboard extends Component {
    render() {
        return (
            <Grid container>
                <TopBar value={location} />
                <Submenu item1="FOLLOWED" item2="LIKED" />
            </Grid>
        )
    }
}
