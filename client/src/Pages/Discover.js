import React, { Component } from 'react'

//Components, pages
import TopBar from '../Component/TopBarLoggedIn'


//UI, CSS
import Grid from '@material-ui/core/grid';
import './css/discover.css';


const location = "discover"

export default class Discover extends Component {
    render() {
        return (
            <React.Fragment>
            <Grid container>
                    <TopBar value={location} />
                
            </Grid>
            </React.Fragment>
        )
    }
}
