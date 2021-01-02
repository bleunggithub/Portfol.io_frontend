import React, { Component } from 'react'

//Components, pages
import TopBar from '../Component/TopBarLoggedIn'
import Submenu from '../Component/Submenu'

//UI, CSS
import Grid from '@material-ui/core/grid';
import './css/discover.css';

const location = "discover"

export default class Discover extends Component {
    render() {
        return (
            <Grid container>
                <TopBar value={location} />
            </Grid>
        )
    }
}
