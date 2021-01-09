import React, { Component } from 'react'

//UI/CSS
import Grid from '@material-ui/core/grid';


import './css/about.css'



export default class AboutProject extends Component {
    render() {
        return (
            <Grid container justify="center" alignItems="flex-start" style={{ height: "100vh" }}>
                
                <Grid item xs={11} sm={11} md={9} className="about-content-grid">
                    <p className="about-title">About this project &#8226; <em>Portfol.io</em></p>
                    <Grid item xs={12} sm={6}>
                        <h3 className="about-subtitle-highlight">What is Portfol.io?</h3>
                        <p>A platform for developers to showcase their portfolio visually and to get inspired</p>
                        <h3 className="about-subtitle-highlight">What problem is it trying to solve?</h3>
                        <p>A platform for developers to showcase their portfolio visually and to get inspired</p>
                        <h3 className="about-subtitle-highlight">Who are the users and what are their goals?</h3>
                        <p>A platform for developers to showcase their portfolio visually and to get inspired</p>
                        <h3 className="about-subtitle-highlight">What is my solution to solve this problem?</h3>
                        <p>A platform for developers to showcase their portfolio visually and to get inspired</p>
                        <h3 className="about-subtitle-highlight">Why is my app better than those existing on the market?</h3>
                        <p>A platform for developers to showcase their portfolio visually and to get inspired</p>
                        <h3 className="about-subtitle-highlight">Why are the key features of Portfol.io?</h3>
                        <p>A platform for developers to showcase their portfolio visually and to get inspired</p>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
