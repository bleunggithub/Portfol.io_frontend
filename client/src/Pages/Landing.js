import React, { Component } from 'react'

//redux
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


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
                        <div className="landing-animated-title">
                            <div className="text-top">
                                <div>
                                    <p>Showcase <br /> Your Developer <br /> <span className="landing-highlight">Portfolio</span></p>
                                </div>
                            </div>
                            <div className="text-bottom">
                                <div>
                                    <p>Discover<br /> The World's  <br /> Top Developers</p></div>
                            </div>
                        </div>
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