import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

//UI/CSS
import Grid from '@material-ui/core/grid';
import Avatar from '@material-ui/core/Avatar';
import Pagination from '@material-ui/lab/Pagination';

import './css/projectGridSmall.css';


export default class ProjectGridSmall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDetails: [],
            isLoading: false,
            currentPage: 1,
            projectPerPage: 24,
            errorMessage: null,
        }
        this.fetchProjects()
    }


    // fetch project from server
    fetchProjects = () => {
        const accessToken = localStorage.getItem('token');
        
        if (this.props.location === "discover") {
            
            axios.get(`${process.env.REACT_APP_API_SERVER}/discover/getAll`)
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
                    this.props.parentCallback(null, this.state.errorMessage)
            }
            }).catch((err) => {
                console.log(err)
                this.setState({
                    errorMessage:"An Error has occurred while loading project data. Please try again."
                })
                this.props.parentCallback(null, this.state.errorMessage)
            })

        } else if (this.props.location === "dashboard") {
            const viewing = this.props.viewing;
 
            axios.get(`${process.env.REACT_APP_API_SERVER}/dashboard/${viewing}/${accessToken}`)
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

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.viewing !== this.props.viewing) {
            this.fetchProjects()
        }
        if (prevState.errorMessage !== this.state.errorMessage) {
            this.props.parentCallback(null, this.state.errorMessage)
        }
    }


    paginationHandleChange = (e,v) => {
        this.setState({currentPage : v})
    }


    render() {
        //pagination
        const indexOfLastProject = this.state.currentPage * this.state.projectPerPage;
        const indexOfFirstProject = indexOfLastProject - this.state.projectPerPage;
        const currentProjects = this.state.projectDetails.slice(indexOfFirstProject, indexOfLastProject);
        const numberOfPage = Math.ceil(this.state.projectDetails.length / this.state.projectPerPage);


        return (
            <Grid container justify="flex-start" alignItems="flex-start" className="project-grid-outer-container" style={{minHeight: '100vh', marginBottom:'3em'}} >

                {this.state.projectDetails.length > 0 ? (
                    currentProjects.map((project, i) => 
                    (<Grid item key={i} xs={12} sm={6} md={4} lg={3} className="project-grid-small-project-container" style={{marginBottom:'1em'}}>
                            <Grid item xs={12} className="project-grid-img-container">
                            <Link to={`/project/${project.project_id}`}>
                                <img src={project.project_img_url1} alt={project.project_title} className="project-grid-small-project-img" />
                            </Link>
                            </Grid>
                        <Grid container className="project-grid-small-description-container" >
                            <Grid item xs={2}>
                            <Link to={`/profile/${project.users_id}`}>
                                <Avatar alt={project.full_name} src={project.user_img_url} /> 
                            </Link>
                            </Grid>
                            <Grid item xs={10} style={{textAlign:'left'}}>
                                <p className="project-grid-small-full-name"><b>{project.full_name}</b></p>
                                <p className="project-grid-small-title">{project.project_title}</p>
                            </Grid>
                            </Grid>
                    </Grid>))
                    
                ) : (
                    <Grid item xs={12}>
                            {this.props.location === "dashboard" ? (
                                <p>No project to show. Go follow someone & like some projects!</p>
                            ) : (
                                <p>No project to show. Add some projects!</p>
                            )
                }
                </Grid>
                    )}
                {this.state.projectDetails.length === 0 ? "" : (
                <Grid container justify="center">
                    <Pagination count={numberOfPage} page={this.state.currentPage} onChange={this.paginationHandleChange} />
                </Grid>
                    
                )}
                    
            </Grid>

        )        
    }
    
}

