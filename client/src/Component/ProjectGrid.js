import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

//UI/CSS
import Grid from '@material-ui/core/grid';
import Button from '@material-ui/core/Button';

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
        axios.post(`${process.env.REACT_APP_API_SERVER}/projects/getOwnProjects/`, {
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
                        (<Grid item key={i} xs={11} sm={11} className="project-grid-project-container">
                            <Grid item xs={12} className="project-grid-img-container">
                        <Link to={`/project/${project.project_id}`}><img src={project.project_img_url1} alt={project.project_title} className="project-grid-project-img" /></Link>
                            </Grid>
                            <Grid item xs={12} className="project-grid-description-container">
                                <p className="project-grid-description project-grid-title"><b>{ project.project_title }</b></p>
                                <p className="project-grid-description">{ project.project_summary }</p>
                            {this.props.edit ? <Link to={`/project/${project.project_id}`} style={{textDecoration:'none'}}><Button variant="outlined" color="primary" size="small" style={{ margin: "0 0.5em" }}> Edit Project </Button></Link>:""}
                            </Grid>
                            <Grid item xs={12} className="project-grid-project-number-container">
                                <p className="project-grid-project-number">{ i +1 }</p>
                            </Grid>
                        </Grid>)
                    )}


            </Grid>

        )        
    }
    
}


//project img 1 - https://i.imgur.com/GoRbmAF.jpg
//project img 2 - https://i.imgur.com/3zltedL.jpg
//project img 3 - https://i.imgur.com/tGm6VNp.jpg
//project img 4 - https://i.imgur.com/5ZuBMmC.jpg