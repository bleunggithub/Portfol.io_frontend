import React, { Component } from 'react'
import axios from 'axios'


//Components, pages
import TopBar from '../Component/TopBarLoggedIn'
import ProjectAutoPlay from '../Component/ProjectAutoPlay'

//UI, CSS
import Grid from '@material-ui/core/grid';
import './css/projectPages.css';


const location = "discover"

export default class ProjectPages extends Component {

    // fetchProjects = (accessToken) => {
    //     axios.post(`${process.env.REACT_APP_API_SERVER}/users/getOwnProjects/`, {
    //         accessToken
    //     }).then(res => {
    //         // console.log(res.data)
    //         this.setState({projectDetails: res.data.projects})
    //     })
    // } //! get summary,title, tags, url

    render() {
        return (
            <React.Fragment>
                <Grid container spacing={3} justify="center" alignItems="flex-start">
                <TopBar value={location} />
                
                    <Grid style={{ width: "100%", marginTop: "13vh" }} />
                    <Grid item xs={12} md={7}>
                        <ProjectAutoPlay className="project-view-autoplay" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Grid container>
                            <Grid item xs={12} md={10}>
                                <h3>Project Title</h3>
                                <p>Project Summary</p>
                                <p>Tags</p>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                social sharing icons
                            {/* add social sharing */}
                            </Grid>
                        </Grid>
                    </Grid>
            </Grid>
            </React.Fragment>
        )
    }
}
