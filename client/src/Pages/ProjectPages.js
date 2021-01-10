import React, { Component } from 'react'
import axios from 'axios'


//Components, pages
import TopBar from '../Component/TopBarLoggedIn'
import ProjectView from '../Component/ProjectView'
import ProjectEdit from '../Component/ProjectEdit'

//UI, CSS
import Grid from '@material-ui/core/grid';
import Switch from '@material-ui/core/Switch';

const location = "discover"

export default class ProjectPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDetails: {},
            edit:false
        }
        const accessToken = localStorage.getItem('token')
        const projectId = this.props.match.params.id
        this.fetchProjects(projectId, accessToken)
    }

    fetchProjects = (projectId, accessToken) => {
        axios.post(`${process.env.REACT_APP_API_SERVER}/projects/getProjectData/${projectId}`, {
            accessToken
        }).then(res => {
            // console.log(res.data)
            this.setState({
                projectDetails: res.data,
            })
        })
    } 

    handleToggleChange = (e) => {
        this.setState({ edit: !this.state.edit })
    }

    render() {

        return (
            <Grid container justify="center" alignItems="flex-start">
                <TopBar value={location} />
                
                <Grid className="project-view-grid-with-top-margin" />
                    {this.state.projectDetails.sameUser ? 
                        (<Grid component="label" container alignItems="center" justify="center" style={{ marginBottom: '0.8em' }} >
                            <Grid item className="profile-switch-label">View</Grid>
                            <Grid item>
                                <Switch size="small" color="primary" checked={this.state.edit} onChange={this.handleToggleChange} name="edit" />
                            </Grid>
                            <Grid item className="profile-switch-label">Edit</Grid>
                        </Grid>):""
                    }
                    
                {this.state.edit ? <ProjectEdit params={this.props.match.params.id} />:<ProjectView  params={this.props.match.params.id} />}

            </Grid>
        )
    }
}


// sameUser: true
// users_id: 1