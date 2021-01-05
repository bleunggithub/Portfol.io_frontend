import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


//Components, pages
import TopBar from '../Component/TopBarLoggedIn'
import Submenu from '../Component/Submenu'
// import ProjectGrid from '../Component/ProjectGrid';


//UI, CSS
import Grid from '@material-ui/core/grid';
import './css/dashboard.css';

const location = "forYou"

class Dashboard extends Component {

    toFollowed = () => {
        this.props.history.push("/followed")
    }
    toLiked = () => {
        this.props.history.push("/liked")
    }

    render() {
        return (
            <Grid container>
                <TopBar value={location} />
                <Submenu item1="FOLLOWED" item2="LIKED" handleItem1={this.toFollowed} handleItem2={this.toLiked} />
                <Grid xs={12} style={{ marginTop: "5vh" }}>
                {/* <ProjectGrid /> */}
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(Dashboard);
