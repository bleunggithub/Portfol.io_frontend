import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

//UI/CSS
import Grid from '@material-ui/core/grid';
import './css/projectGrid.css';


export default class ProjectGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDetails:[]
        }
        let accessToken = localStorage.getItem('token');
        this.fetchProjects(accessToken);
    }
    

    fetchProjects = (accessToken) => {
        axios.post(`${process.env.REACT_APP_API_SERVER}/users/getOwnProjects/`, {
            accessToken
        }).then(res => {
            // console.log(res.data)
            this.setState({projectDetails: res.data.projects})
        })
    }
    
    render() {
        return (
            <Grid container justify="center" alignItems="flex-start" className="project-grid-outer-container">
                {this.state.projectDetails.map((project, i) => 
                        (<Grid item key={i} xs={11} sm={4} className="project-grid-project-container">
                            <Grid item xs={12} className="project-grid-img-container">
                        <Link to={`/project/${project.project_id}`}><img src={project.project_img_url} alt={project.project_title} className="project-grid-project-img" /></Link>
                            </Grid>
                            <Grid item xs={12} className="project-grid-description-container">
                                <p className="project-grid-description">{ project.project_summary }</p>
                            </Grid>
                            <Grid item xs={12} className="project-grid-project-number">
                                <p className="project-grid-description">{ i +1}</p>
                            </Grid>
                        </Grid>)
                    )}


            </Grid>

        )        
    }
    
}
