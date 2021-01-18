import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

//UI/css
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import Pagination from '@material-ui/lab/Pagination';

import './css/search.css';


//images
import { Image, Placeholder } from 'cloudinary-react';


export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchKeywords: "",
            searchResults: [],
            noMatch:false,
            
            currentPage: 1,
            projectsPerPage: 20,
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    paginationHandleChange = (e,v) => {
        this.setState({currentPage : v})
    }

    handleSearch = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_SERVER}/discover/search`, {
            searchKeywords: this.state.searchKeywords
        }).then(res => {
            console.log(res.data) // res.data.searchResults

            if (res.status === 200 && res.data.searchResults.length > 0) {
                this.props.search(true)
                this.setState({
                    searchResults: res.data.searchResults,
                    searchKeywords: ""
                })
            } else if (res.status === 200 && res.data.searchResults.length === 0) {
                this.props.search(true)
                this.setState({
                    searchKeywords: "",
                    noMatch:true
                })
            } else {
                console.log(res)
                this.props.handleError(null, "An error has occurred while searching the database. Please try again.")
                this.setState({
                    searchKeywords:""
                })
            }

        }).catch((err) => {
            console.log(err)
            this.props.handleError(null, "An error has occurred while searching the database. Please try again.")
            this.setState({
                searchKeywords:""
            })
        })
    }

    clearSearch = () => {
        this.setState({
            searchKeywords: "",
            searchResults: [],
            noMatch:false,
        })
        this.props.search(false)


    }

    render() {
        //pagination
        const indexOfLastProject = this.state.currentPage * this.state.projectsPerPage;
        const indexOfFirstProject = indexOfLastProject - this.state.projectsPerPage;
        const currentProjects = this.state.searchResults.slice(indexOfFirstProject, indexOfLastProject);
        const numberOfPage = Math.ceil(this.state.searchResults.length / this.state.projectsPerPage);

        return (
            <Grid container justify="center" style={{textAlign: 'center'}}>
                <Grid item xs={12} sm={6} style={{ marginBottom: '2em' }}>
                    <form onSubmit={this.handleSearch}>
                        <Grid container justify="center">
                            <TextField label="Search Keywords" name="searchKeywords" value={this.state.searchKeywords} style={{width: '80%', margin: '2em 0',}} onChange={this.handleChange} required />
                        </Grid>
                        <Button color="primary" variant="outlined" type="submit" ><SearchIcon /> Search </Button>
                </form>
                </Grid>


                {/* searched, no matching projects */}
                {this.state.searchResults.length === 0 && this.state.noMatch ? (
                    <React.Fragment>
                        <Grid container justify="center">
                        <p>Sorry, your Search has no match.</p>
                    </Grid>
                    <Grid container justify="center">
                        <Button variant="outlined" color="primary" size="small" component="span" style={{ margin: "1em" }} onClick={this.clearSearch}> Clear Search  </Button>
                    </Grid>
                    </React.Fragment>
                ) : ""}

                {this.state.searchResults.length > 0 ? (    
                    <Grid container justify="flex-start" alignItems="flex-start" className="project-grid-outer-container" style={{minHeight: '100vh', marginBottom:'3em'}} >

                        {currentProjects.map((project, i) =>
                        (<Grid item key={i} xs={12} sm={6} md={4} lg={3} className="search-project-container" style={{ marginBottom: '1em' }}>
                            <Grid item xs={12} className="search-img-container">
                                <Link to={`/project/${project.project_id}`}>
                                    <Image
                                        cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                        public_id={project.project_img_url1}
                                        height="220"
                                        crop="fill"
                                        loading="lazy"
                                        className="search-project-img"
                                    >
                                        <Placeholder type="vectorize" />
                                    </Image>
                                </Link>
                            </Grid>
                            <Grid container className="search-description-container" >
                                <Grid item xs={2}>
                                    <Link to={`/profile/${project.users_id}`}>
                                        <Image
                                            cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                            public_id={project.user_img_url}
                                            width="40"
                                            height="40"
                                            gravity="face"
                                            crop="fill"
                                            radius="max"
                                            loading="lazy"
                                            style={{ display: "inline-block", marginRight: "1em", marginTop: "0.2em" }}
                                        >
                                            <Placeholder type="vectorize" />
                                        </Image>
                                    </Link>
                                </Grid>
                                <Grid item xs={10} style={{ textAlign: 'left' }}>
                                    <p className="search-full-name"><b>{project.full_name}</b></p>
                                    <p className="search-title">{project.project_title}</p>
                                </Grid>
                            </Grid>
                        </Grid>))}
                        
                    <Grid container justify="center">
                        <Pagination count={numberOfPage} page={this.state.currentPage} onChange={this.handleChange} />
                    </Grid>
                    <Grid container justify="center">
                        <Button variant="outlined" color="primary" size="small" component="span" style={{ margin: "1em" }} onClick={this.clearSearch}> Clear Search  </Button>
                    </Grid>

                    </Grid>

                ):""}
            </Grid>
        )
    }
}
