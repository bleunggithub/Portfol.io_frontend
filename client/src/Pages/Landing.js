import React, { Component } from 'react'

//redux
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

//Components, pages
import TopBar from '../Component/TopBar'

//UI, CSS
import Grid from '@material-ui/core/grid';
import './css/landing.css';


const location = "explore";

export class Landing extends Component {
    render() {
        if (this.props.isAuthenticated) {
            return (<Redirect to="/dashboard" />)
        } else {
            return (
                <Grid container>
                    <TopBar value={location} />
                    <Grid className="landing-heroImg">
                    </Grid>
                    <Grid className="landing-bottom-link">
                        <Link to="/about" className="landing-link" style={{ textDecoration: "none" }}>About this Project</Link> &nbsp;
                        <span className="landing-light-text">&#169; 2020 Betty Leung</span>

                    </Grid>
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