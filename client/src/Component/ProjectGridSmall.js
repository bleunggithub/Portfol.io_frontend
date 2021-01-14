import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

//UI/CSS
import Grid from '@material-ui/core/grid';
import Avatar from '@material-ui/core/Avatar';

import './css/projectGridSmall.css';


export default class ProjectGridSmall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDetails: [],
            isLoading: false,
            pageNum: 0,
            noMoreItems: false,
            errorMessage: null,
        }
        this.fetchProjects()
    }
    // fetch project from server
    fetchProjects = () => {
        const viewing = this.props.viewing;
        const accessToken = localStorage.getItem('token');
        const pageNum = this.state.pageNum;
        axios.get(`${process.env.REACT_APP_API_SERVER}/discover/dashboard/${viewing}/${accessToken}/${pageNum}`)
            .then(res => {

            // console.log(res)
                if (res.data) {
                    this.setState({
                        projectDetails: res.data.projectDetails,
                    })
                
                } else {
                    this.setState({
                        errorMessage: "An Error has occurred while loading project data. Please try again.",
                    })
                    this.props.parentCallback(null, this.state.errorMessage)
            }
            }).catch((err) => {
                console.log(err)
                this.setState({
                    errorMessage:"An Error has occurred while loading project data. Please try again."
                })
                this.props.parentCallback(null, this.state.errorMessage)

        })
    }

    // infinityScroll = () => {
    //     if (window.scrollY > 1) {
    //         console.log(window.innerHeight, window.scrollY, document.body.scrollTop, document.documentElement.offsetHeight)
    //     }
    // }

    // componentDidMount = () => {
    //     window.addEventListener('scroll',
    //         this.infinityScroll);
    //     console.log('scroll')
    // }

    // componentDidUpdate = (prevProps, prevState) => {
    //     if (prevState.projectDetails !== this.state.projectDetails) {
            
    //     }
    // }

    render() {

        return (
            <Grid container justify="center" alignItems="flex-start" className="project-grid-outer-container" style={{minHeight: '100vh', marginBottom:'3em'}} >

                {this.state.projectDetails.length > 0 ? (
                    this.state.projectDetails.map((project, i) => 
                    (<Grid item key={i} xs={12} sm={4} lg={3} className="project-grid-small-project-container" style={{marginBottom:'1em'}}>
                            <Grid item xs={12} className="project-grid-img-container">
                            <Link to={`/project/${project.project_id}`}>
                                <img src={project.project_img_url1} alt={project.project_title} className="project-grid-small-project-img" />
                            </Link>
                            </Grid>
                        <Grid container className="project-grid-description-container" style={{padding:'0 1.5em', marginBottom:'2em'}}>
                            <Grid item xs={2}>
                            <Link to={`/profile/${project.users_id}`}>
                                <Avatar alt={project.full_name} src={project.user_img_url} /> 
                            </Link>
                            </Grid>
                            <Grid item xs={10}>
                                <p className="project-grid-small-full-name"><b>{project.full_name}</b></p>
                                <p className="project-grid-small-title">{project.project_title}</p>
                            </Grid>
                            </Grid>
                    </Grid>))
                ) : (
                <Grid item xs={12}>
                    <p>No project to show. Go follow someone & like some projects!</p>
                </Grid>
                        )}
                    
            </Grid>

        )        
    }
    
}

