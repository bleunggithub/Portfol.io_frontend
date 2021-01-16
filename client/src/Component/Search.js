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

            if (res.status === 200 && res.data.length > 0) {
                this.props.parentCallbackSearch()
                this.setState({
                    searchResults: res.data.searchKeywords,
                    searchKeywords: ""
                })
            } else if (res.status === 200 && res.data.length === 0) {
                this.props.parentCallbackSearch()
                this.setState({
                    searchKeywords: "",
                    noMatch:true
                })
            } else {
                console.log(res)
                this.props.parentCallback("An error has occurred while searching the database. Please try again.")
                this.setState({
                    searchKeywords:""
                })
            }

        }).catch((err) => {
            console.log(err)
            this.props.parentCallback("An error has occurred while searching the database. Please try again.")
            this.setState({
                searchKeywords:""
            })
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


                {/* searched, no matching projects */}
                {this.state.searchResults.length === 0 && this.state.noMatch ? (
                    <Grid container justify="center">
                        <p>Your Search has no match.</p>
                        </Grid>
                ) : ""}

                {this.state.searchResults.length > 0 ? (
                    <Grid container justify="center">
                        <Pagination count={numberOfPage} page={this.state.currentPage} onChange={this.handleChange} />
                    </Grid>
                ):""}
            </Grid>
        )
    }
}
