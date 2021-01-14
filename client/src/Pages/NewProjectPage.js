import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import axios from 'axios';

//Components, pages
import Dropzone from '../Component/Dropzone'
import ProjectEditDetails from '../Component/ProjectEditDetails'
import TopBar from '../Component/TopBarLoggedIn'


//UI, CSS
import './css/newProject.css';
import Grid from '@material-ui/core/grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

//Topbar location
const location = "settings"


export default class NewProjectPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: null,
            isLoading: false,
            createSuccess: false,
            errorOpen: false,
            errorMessage: null,
            newProjectDetails: {}
        }
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

    //send to backend
    createProjectDetails = (e) => {
        e.preventDefault();

        this.setState({
            isLoading: true
        })

        const accessToken = localStorage.getItem('token')
        
        axios.post(`${process.env.REACT_APP_API_SERVER}/projects/addNewProject`, {
            projectDetails: this.state.newProjectDetails,
            accessToken
        }).then(res => {
            // console.log(res)
            if (res.status === 200) {
                this.setState({
                    isLoading: false,
                    createSuccess: true
                })
                setTimeout(() => {
                    this.setState({
                        redirect: "/settings"
                    })
                }, 1500)
            } else {
                // console.log(res)
                this.setState({
                    errorMessage: "An Error has occurred while creating project. Please try again.",
                    errorOpen: true
                })
                setTimeout(() => {
                    this.setState({ errorMessage: null })
                }, 6000)
            }
        })
    }

    //passing states from children
    changeStatesProjectDetails = (data, error) => {
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
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Grid container justify="center" alignItems="flex-start">
                <TopBar value={location} />
                <form onSubmit={this.createProjectDetails} style={{width: '100%'}}>
                    <Grid container justify="center" alignItems="flex-start" className="project-view-grid-with-top-margin" >
                        <Grid item xs={12} md={6} lg={6} className="project-edit-dropzone-container">
                            <Dropzone edit={false} parentCallback={this.changeStatesProjectDetails}/>
                        </Grid>

                        <Grid item xs={12} md={5} lg={4}>
                            <ProjectEditDetails parentCallback={this.changeStatesProjectDetails} edit={false} />
                        </Grid>

                        <Grid item xs={12} md={5} lg={4} style={{textAlign:'center'}}>
                            <Button variant="contained" color="primary" size="small" type="submit" style={{ margin: "2em 1em" }}>save project</Button>
                            {this.state.isLoading ? (<CircularProgress color="primary" size="1em"  style={{margin: '0 0.5em', verticalAlign: 'sub'}}/>) : ""}
                            {this.state.createSuccess ? (<CheckIcon color="primary" size="1em"  style={{margin: '0 0.5em', verticalAlign: 'sub'}} />) : ""}
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
