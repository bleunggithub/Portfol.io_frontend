import React, { Component } from 'react'
import axios from 'axios'


//Components, pages
import TopBar from '../Component/TopBarLoggedIn'
import ProjectView from '../Component/ProjectView'
import ProjectEdit from '../Component/ProjectEdit'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

//UI, CSS
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

const location = "discover"

export default class ProjectPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDetails: {},
            edit: false,
            errorOpen: false,
            errorMessage: null,
        }
        const accessToken = localStorage.getItem('token')
        const projectId = this.props.match.params.id
        this.fetchProjects(projectId, accessToken)
    }

    //snackbar close
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            errorOpen: false,
            errorMessage: null
        })
    };

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

    changeRedirect = (data) => {
        this.setState({
            edit: false
        })
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
                    
                {this.state.edit ? (
                    <ProjectEdit params={this.props.match.params.id} parentCallback={this.changeRedirect} />
                ) : (
                    <ProjectView params={this.props.match.params.id} />
                    )}
                
                {/* handle error */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.errorOpen}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={this.state.errorMessage}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                            <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />

            </Grid>
        )
    }
}
