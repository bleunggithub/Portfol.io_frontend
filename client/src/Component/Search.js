import React, { Component } from 'react'
import axios from 'axios';

//UI/css
import Grid from '@material-ui/core/grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import Pagination from '@material-ui/lab/Pagination';


export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchKeywords: "",
            searchResults: [],
            
            currentPage: 1,
            projectsPerPage: 20,
            errorMessage: null,
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
            console.log(res.data) // array of object to map

        })
    }

    render() {
        //pagination
        const indexOfLastProject = this.state.currentPage * this.state.projectsPerPage;
        const indexOfFirstProject = indexOfLastProject - this.state.projectsPerPage;
        const currentProjects = this.state.searchResults.slice(indexOfFirstProject, indexOfLastProject);
        const numberOfPage = Math.ceil(this.state.searchResults.length / this.state.projectsPerPage);

        return (
            <Grid container justify="center" style={{textAlign: 'center'}}>
                <Grid xs={12} sm={6} style={{ marginBottom: '2em' }}>
                <form onSubmit={this.handleSearch}>
                    <TextField label="Search Keywords" name="searchKeywords" value={this.state.searchKeywords} style={{width: '100%', margin: '2em 0',}} onChange={this.handleChange} required />
                        <Button color="primary" variant="outlined" type="submit" ><SearchIcon /> Search </Button>
                </form>
                </Grid>

                {this.state.searchResults.length > 0 ? (
                    <Grid container justify="center">
                        <Pagination count={numberOfPage} page={this.state.currentPage} onChange={this.handleChange} />
                    </Grid>
                ):""}
            </Grid>
        )
    }
}
