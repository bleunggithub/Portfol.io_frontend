import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


//UI/CSS
import Grid from '@material-ui/core/grid';
import Button from '@material-ui/core/Button';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

//Components / Pages
import DeleteDialog from './DeleteAlert.js'

import './css/projectGrid.css';


 class ProjectGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDetails: [],
            errorOpen: false,
            noProject: false,
            deleteOpen: false,
            deleteProjectId: "",
        }
        let accessToken = localStorage.getItem('token');
        this.fetchProjects(accessToken);
    }
    

    fetchProjects = (accessToken) => {
            axios.post(`${process.env.REACT_APP_API_SERVER}/projects/getOwnProjects/`, {
                accessToken
            }).then(res => {
                // console.log(res.data)
                if (res.status !== 200) {
                    this.setState({
                        errorOpen: true
                    })
                    
                } else if (res.status === 200 && !res.data.projects) {
                    this.setState({
                        noProject: true
                    })
                } else {
                    this.setState({projectDetails: res.data.projects})
                }
            })
        }
    
    

    //snackbar close
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            errorOpen:false,
            errorMessage:""
        })
    };

    //delete alert open
    handleDeleteOpen = (e) => {
        // console.log(e.target.parentElement.name)
        this.setState({
            deleteOpen: true,
            deleteProjectId: e.target.parentElement.name
        })
    }
    
    //delete alert close
    handleDeleteClose = (data) => {
        this.setState({
            deleteOpen: false,
            deleteProjectId: ""
        })
    }

    //delete project confirm
    deleteProject = (e, v) => {
        //button name = projectId 
        axios.delete(`${process.env.REACT_APP_API_SERVER}/projects/deleteProject/${this.state.deleteProjectId}`)
            .then(res => {
            // console.log(res)
                if (res.status === 200) {
                    this.setState({
                        deleteOpen: false,
                        deleteProjectId: "",
                    })
                this.fetchProjects(localStorage.getItem('token'));
            } else {
                this.setState({
                    errorOpen: true
                })
            }
        })
    }

    render() {

        return (
            <Grid container justify="center" alignItems="flex-start" className="project-grid-outer-container">
                {this.state.projectDetails.length > 0 ? (
                    this.state.projectDetails.map((project, i) => 
                        (<Grid item key={i} xs={11} sm={11} className="project-grid-project-container">
                            <Grid item xs={12} className="project-grid-img-container">
                        <Link to={`/project/${project.project_id}`}><img src={project.project_img_url1} alt={project.project_title} className="project-grid-project-img" /></Link>
                            </Grid>
                            <Grid item xs={12} className="project-grid-description-container">
                                <p className="project-grid-description project-grid-title"><b>{ project.project_title }</b></p>
                                <p className="project-grid-description">{ project.project_summary }</p>
                            {this.props.edit ?
                                (<React.Fragment>
                                    <Button variant="outlined" name={project.project_id} color="primary" size="small" style={{ margin: "0 0.5em" }} onClick={this.handleDeleteOpen}> Delete </Button>

                                    <Link to={`/project/${project.project_id}`} style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" color="primary" size="small" disableElevation style={{ margin: "0 0.5em" }}> Edit Project </Button>
                                    </Link>
                                </React.Fragment>)
                                : ""}
                            </Grid>
                            <Grid item xs={12} className="project-grid-project-number-container">
                                <p className="project-grid-project-number">{ i +1 }</p>
                            </Grid>
                    </Grid>))
                ) : (
                <Grid item xs={11}>
                    <p>This user has not created any project.</p>
                </Grid>
                    )}
                {this.state.projectDetails.length < 3 && this.props.edit === true ? 
                    (<Grid container justify="center" className="project-grid-add-project-btn-container">
                        <Grid item xs={12}>
                            <Link to={`/project/addNewProject`} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" disableElevation style={{ margin: "0 0.5em" }}> Add a project</Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <p style={{fontSize:'0.8em'}}>Each user may create a maximum of <u>3 projects</u>.</p>
                        </Grid>
                    </Grid>) : ""
                }

                {/* delete project */}
                <DeleteDialog open={this.state.deleteOpen} close={this.handleDeleteClose} confirmDelete={ this.deleteProject }/>

                {/* handle error */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.errorOpen}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message="An error has occurred, please try again."
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

export default ProjectGrid