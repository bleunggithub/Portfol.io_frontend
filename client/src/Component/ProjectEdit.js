import React, { Component } from 'react'
import axios from 'axios';

//Components, pages
import Dropzone from './Dropzone'
import ProjectEditDetails from '../Component/ProjectEditDetails'


//UI, CSS
import './css/project.css';
import Grid from '@material-ui/core/grid';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


export default class ProjectEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectDetails: {},
            isLoading: false,
            updateSuccess: false,
            errorOpen: false,
            errorMessage: null,
            newProjectDetails:{},
        }
        this.fetchProjects(this.props.params, localStorage.getItem('token'))
    }

    //fetch original data
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


    //snackbar close
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            errorOpen:false,
            errorMessage:null
        })
    };

    //send to backend
    changeProjectDetails = (e) => {
        e.preventDefault();

        this.setState({
            isLoading:true
        })

        const projectId = this.props.params;
        
        axios.post(`${process.env.REACT_APP_API_SERVER}/projects/editProjectDetails/${projectId}`, { 
            projectDetails: this.state.newProjectDetails,
            accessToken: localStorage.getItem('token')
        }).then(res => {
            // console.log(res)
            if (res.status === 200) {
                //clear input
                this.setState({
                    isLoading: false,
                    updateSuccess:true
                })
                setTimeout(() => {
                    this.props.parentCallback(false)
                    }, 1500)
            } else if (res.status === 401) {
                this.setState({
                    errorMessage: "You are not authorised to edit this project.",
                    errorOpen: true
                })
                setTimeout(() => {
                    this.setState({errorMessage:""})
                },6000)
            } else {
                // console.log(res)
                this.setState({
                    errorMessage: "An Error has occurred while updating project details. Please try again.",
                    errorOpen: true
                })
                setTimeout(() => {
                    this.setState({errorMessage:""})
                },6000)
            }
        })
    }

    changeStatesProjectDetails = (data,error) => {
        this.setState({
            newProjectDetails: { ...this.state.newProjectDetails,...data }, 
            errorMessage: error,
        })
        if (this.state.errorMessage !== null) {
            this.setState({
                errorOpen: true
            })
        }
    }
    
    render() {

        return (
            <Grid container justify="center" alignItems="flex-start">
                <form onSubmit={this.changeProjectDetails}>
                    <Grid container justify="center" alignItems="flex-start" className="project-edit-grid-top" >
                        <Grid item xs={12} md={6} lg={6} className="project-edit-dropzone-container">
                            <Dropzone location={this.props.params} edit={true} parentCallback={this.changeStatesProjectDetails}/>
                        </Grid>

                        <Grid item xs={12} md={5} lg={4}>
                            <ProjectEditDetails parentCallback={this.changeStatesProjectDetails} edit={true} projectDetails={this.state.projectDetails} />
                        </Grid>

                        <Grid item xs={12} md={5} lg={4} style={{textAlign:'center'}}>
                            <Button variant="contained" color="primary" size="small" type="submit" style={{ margin: "2em 1em" }}>save project</Button>
                            {this.state.isLoading ? (<CircularProgress color="primary" size="1em"  style={{margin: '0 0.5em', verticalAlign: 'sub'}}/>) : ""}
                            {this.state.updateSuccess ? (<CheckIcon color="primary" size="1em"  style={{margin: '0 0.5em', verticalAlign: 'sub'}} />) : ""}
                        </Grid>
                    </Grid>
                </form>

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
