import React, { Component } from 'react'
import axios from 'axios'

//images
import { Image, Placeholder } from 'cloudinary-react';

//redux
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


//UI, CSS
import Grid from '@material-ui/core/grid';
import './css/landing.css';


export class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: null,
            errorOpen: false,
            projectDetails:[],
        }
        this.fetchProjects()
    }

        // fetch project from server
    fetchProjects = () => {
    
        axios.get(`${process.env.REACT_APP_API_SERVER}/discover/get12`)
        .then(res => {
        // console.log(res)
            if (res.status === 200) {
                this.setState({
                    projectDetails: [...this.state.projectDetails,...res.data.projectDetails],
                })
            
            } else {
                this.setState({
                    errorMessage: "An Error has occurred while loading project data. Please try again.",
                })
                this.handleError(null, this.state.errorMessage)
        }
        }).catch((err) => {
            console.log(err)
            this.setState({
                errorMessage:"An Error has occurred while loading project data. Please try again."
            })
            this.handleError(null, this.state.errorMessage)
        })

    }

    handleError = () => {
        this.setState({
            errorOpen: true
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

    changeTab = () => {
        this.props.parentChangeTabCB(2)
    }

    render() {
        if (this.props.isAuthenticated) {
            return (<Redirect to="/dashboard" />)
        } else {
            return (
                <Grid container>
                    <Grid className="landing-heroImg">
                    </Grid>

                    <Grid container justify="flex-start" alignItems="flex-start" className="landing-outer-container" style={{marginBottom:'1em'}} >

                        {this.state.projectDetails.map((project, i) =>
                        (<Grid item key={i} xs={12} sm={6} md={4} lg={3} className="landing-project-container" style={{ marginBottom: '1em' }}>
                            <Grid item xs={12} className="project-grid-img-container">

                                    <Image
                                        cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                        public_id={project.project_img_url1}
                                        height="220"
                                        crop="fill"
                                        loading="lazy"
                                        className="landing-project-img"
                                    >
                                        <Placeholder type="vectorize" />
                                    </Image>

                            </Grid>
                            <Grid container className="landing-description-container" >
                                <Grid item xs={2}>

                                        <Image
                                            cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                            public_id={project.user_img_url}
                                            width="40"
                                            height="40"
                                            gravity="face"
                                            crop="fill"
                                            radius="max"
                                            loading="lazy"
                                            style={{ display: "inline-block", marginRight: "1em", marginTop: "0.5em" }}
                                        >
                                            <Placeholder type="vectorize" />
                                        </Image>

                                </Grid>
                                <Grid item xs={10} style={{ textAlign: 'left' }}>
                                    <p className="landing-full-name"><b>{project.full_name}</b></p>
                                    <p className="landing-title">{project.project_title}</p>
                                </Grid>
                            </Grid>
                        </Grid>))}
                    </Grid>

                    <Grid container justify="center" style={{ marginBottom: '1em' }}>
                        <h2 className="landing-highlight landing-sign-up-link"  onClick={this.changeTab}>
                            Sign Up to see more
                        </h2>
                    </Grid>
                    <Grid className="landing-bottom-link">
                        <Link to="/about" className="landing-link" style={{ textDecoration: "none" }}>About this Project</Link> &nbsp;
                        <span className="landing-light-text">&#169; {new Date().getFullYear()} Betty Leung</span>
                    </Grid>
                
                {/* handle errors */}
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
}

//redux
const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated,
    userType: state.login.userType,
})


export default connect(mapStateToProps, null)(Landing);