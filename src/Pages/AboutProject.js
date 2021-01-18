import React, { Component } from 'react'

//Component
import ExpandContactBox from '../Component/ExpandContactBox'


//UI/CSS
import Grid from '@material-ui/core/grid';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';


//images
import { Image, Placeholder } from 'cloudinary-react';

import './css/about.css'



export default class AboutProject extends Component {


    handleClose = () => {
        this.props.handleClose();
    }

    handleErrorCB = () => {
        this.props.handleErrorCB("An Error has occurred, please try again.")
    }

    render() {
        return (
            <Grid container justify="center" alignItems="flex-start" style={{ height: "80vh",width: "90vw" }} className="about-outermost-container">
                    
                <Grid item xs={11} sm={11} md={9} className="about-content-grid">
                    <Grid container justify="flex-end" alignItems="center" style={{height:'5vh'}}>
                        <Fab color="secondary" className="about-close-fab" aria-label="close" size="small" style={{margin:'2em 0 1em 0'}} onClick={this.handleClose}>
                            <CloseIcon />
                        </Fab>
                    </Grid>
                    <p className="about-title">About this project &#8226; <em>Portfol.io</em></p>
                    <Grid container>
                        <Grid item xs={12} sm={6} >
                            <h3 className="about-subtitle-highlight">
                                Who am I?
                            </h3>
                            <p className="about-content-paragraph">
                                Hello, I'm Betty. A full-stack web developer who has graduated the 
                                Full-Stack Software Engineering Immersive Bootcamp at &nbsp;
                                <a href="https://xccelerate.co/en/" rel="noreferrer" target="_blank" className="about-link">Xccelerate</a> 
                                 &nbsp; in December 2020. This web app is my capstone project.<br />
                                <ExpandContactBox handleErrorCB={this.handleErrorCB} />
                            </p>
                            <Grid>

                            </Grid>
                            <h3 className="about-subtitle-highlight">
                                What is Portfol.io?
                            </h3>
                            <p className="about-content-paragraph">
                                A show-and-tell platform for developers to showcase their portfolio visually and to also to get inspired.
                            </p>
                            <h3 className="about-subtitle-highlight">
                                What problems is it trying to solve?
                            </h3>
                            <p className="about-content-paragraph" style={{paddingBottom:'1em'}}>
                                <ul>
                                    <li>
                                        On average, only 80% of website visitors skim through the content; 
                                        and out of those 20% who read, they read only about 28% of the page.
                                    </li>
                                    <li>
                                        Developers created their portfolio website but not sure where to get noticed.
                                    </li>
                                </ul>
                            </p>
                            <h3 className="about-subtitle-highlight">
                                What is my solution to solve this problem?
                            </h3>
                            <p className="about-content-paragraph">
                                Portfol.io is a visual-content-driven platform for developers to showcase their work.
                                Unlike Github, which allows developers to share their code, Portfol.io lets developers showcase 
                                their work visually, drive traffic to their websites, and to get inspired by fellow developers more easily.
                            </p>
                            <h3 className="about-subtitle-highlight">
                                Why are the key features of Portfol.io?
                            </h3>
                            <p className="about-content-paragraph">
                                <ul>
                                    <li>
                                        Create an online profile easily
                                    </li>
                                    <li>
                                        Upload and present to the world thier best projects with images
                                    </li>
                                    <li>
                                        Show the project on social media
                                    </li>
                                    <li>
                                        Follow & connect with fellow developers, like and save projects for inspirations
                                    </li>
                                    <li>
                                        Search projects by keywords to get inspired
                                    </li>
                                </ul>
                            </p>
                            <h3 className="about-subtitle-highlight">
                                Tech Stack & Attributions
                            </h3>
                            <p className="about-content-paragraph">
                                <span>Front End</span>
                                <ul>
                                    <li>
                                        Framework: &nbsp;
                                        <a href="https://reactjs.org/" rel="noreferrer" target="_blank" className="about-link">
                                            React (Create-react-app)
                                        </a> 
                                    </li>
                                    <li>
                                        Packages: &nbsp;
                                        <a href="https://material-ui.com/" rel="noreferrer" target="_blank" className="about-link">
                                            Material-UI
                                        </a>,  &nbsp;
                                        <a href="https://github.com/fontsource/fontsource" rel="noreferrer" target="_blank" className="about-link">
                                            Fontsource
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/axios" rel="noreferrer" target="_blank" className="about-link">
                                            Axios
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/cloudinary-react" rel="noreferrer" target="_blank" className="about-link">
                                            Cloudinary-React
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/react-beautiful-dnd" rel="noreferrer" target="_blank" className="about-link">
                                            React-Beautiful-DnD
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/react-dropzone" rel="noreferrer" target="_blank" className="about-link">
                                            React-Dropzone
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/react-facebook-login" rel="noreferrer" target="_blank" className="about-link">
                                            React Facebook Login
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/react-google-login" rel="noreferrer" target="_blank" className="about-link">
                                            React Google Login
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/react-redux" rel="noreferrer" target="_blank" className="about-link">
                                            React Redux
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/redux-logger" rel="noreferrer" target="_blank" className="about-link">
                                            Redux-Logger
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/redux-thunk" rel="noreferrer" target="_blank" className="about-link">
                                            Redux Thunk
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/redux" rel="noreferrer" target="_blank" className="about-link">
                                            Redux
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/react-router-dom" rel="noreferrer" target="_blank" className="about-link">
                                            React-router-dom
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/react-share" rel="noreferrer" target="_blank" className="about-link">
                                            React-share
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/react-swipeable-views" rel="noreferrer" target="_blank" className="about-link">
                                            React-Swipeable-Views
                                        </a>
                                    </li>
                                    <li>
                                        Images/ icons: <br />
                                        <ul>
                                            <li>
                                                <a href="https://www.canva.com/" rel="noreferrer" target="_blank" className="about-link">
                                                    Canva
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.flaticon.com/authors/smashicons" rel="noreferrer" target="_blank" className="about-link">
                                                    Smashicons
                                                </a>
                                                &nbsp; from &nbsp;
                                                <a href="https://www.flaticon.com/" rel="noreferrer" target="_blank" className="about-link">
                                                    Flaticon
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.flaticon.com/authors/freepik" rel="noreferrer" target="_blank" className="about-link">
                                                    Freepik
                                                </a>
                                                &nbsp; from &nbsp;
                                                <a href="https://www.flaticon.com/" rel="noreferrer" target="_blank" className="about-link">
                                                    Flaticon
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.flaticon.com/authors/pixel-perfect" rel="noreferrer" target="_blank" className="about-link">
                                                    Pixel perfect
                                                </a>
                                                &nbsp; from &nbsp;
                                                <a href="https://www.flaticon.com/" rel="noreferrer" target="_blank" className="about-link">
                                                    Flaticon
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.flaticon.com/authors/ultimatearm" rel="noreferrer" target="_blank" className="about-link">
                                                    ultimatearm
                                                </a>
                                                &nbsp; from &nbsp;
                                                <a href="https://www.flaticon.com/" rel="noreferrer" target="_blank" className="about-link">
                                                    Flaticon
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://unsplash.com/@cgower" rel="noreferrer" target="_blank" className="about-link">
                                                    Christopher Gower
                                                </a>
                                                &nbsp; from &nbsp;
                                                <a href="https://unsplash.com/" rel="noreferrer" target="_blank" className="about-link">
                                                    Unsplash
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://unsplash.com/@markusspiske" rel="noreferrer" target="_blank" className="about-link">
                                                    Markus Spiske
                                                </a>
                                                &nbsp; from &nbsp;
                                                <a href="https://unsplash.com/" rel="noreferrer" target="_blank" className="about-link">
                                                    Unsplash
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://unsplash.com/@bugsster" rel="noreferrer" target="_blank" className="about-link">
                                                    Taras Shypka
                                                </a>
                                                &nbsp; from &nbsp;
                                                <a href="https://unsplash.com/" rel="noreferrer" target="_blank" className="about-link">
                                                    Unsplash
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://unsplash.com/@glenncarstenspeters" rel="noreferrer" target="_blank" className="about-link">
                                                    Glenn Carstens-Peters
                                                </a>
                                                &nbsp; from &nbsp;
                                                <a href="https://unsplash.com/" rel="noreferrer" target="_blank" className="about-link">
                                                    Unsplash
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <span>Back End</span>
                                <ul>
                                    <li>
                                        Runtime: &nbsp;
                                        <a href="https://nodejs.org/en/" rel="noreferrer" target="_blank" className="about-link">
                                            Node.js
                                        </a>
                                    </li>
                                    <li>
                                        Framework: &nbsp;
                                        <a href="https://expressjs.com/" rel="noreferrer" target="_blank" className="about-link">
                                            Express.js
                                        </a>
                                    </li>
                                    <li>
                                        Database: &nbsp;
                                        <a href="https://www.postgresql.org/" rel="noreferrer" target="_blank" className="about-link">
                                            PostgresQL
                                        </a>
                                    </li>
                                    <li>
                                        SQL query builder: &nbsp;
                                        <a href="https://knexjs.org/" rel="noreferrer" target="_blank" className="about-link">
                                            Knex.js
                                        </a>
                                    </li>
                                    <li>
                                        Reverse Proxy Server: &nbsp;
                                        <a href="https://knexjs.org/" rel="noreferrer" target="_blank" className="about-link">
                                            Nginx
                                        </a>
                                    </li>
                                    <li>
                                        Packages: &nbsp;
                                        <a href="https://www.npmjs.com/package/aws-sdk" rel="noreferrer" target="_blank" className="about-link">
                                            AWS SDK for JavaScript
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/axios" rel="noreferrer" target="_blank" className="about-link">
                                            Axios
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/bcrypt" rel="noreferrer" target="_blank" className="about-link">
                                            bcrypt
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/body-parser" rel="noreferrer" target="_blank" className="about-link">
                                            body-parser
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/cors" rel="noreferrer" target="_blank" className="about-link">
                                            cors
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/dotenv" rel="noreferrer" target="_blank" className="about-link">
                                            dotenv
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/jsonwebtoken" rel="noreferrer" target="_blank" className="about-link">
                                            JSON Web Token
                                        </a>,  &nbsp;
                                        <a href="https://www.npmjs.com/package/passport" rel="noreferrer" target="_blank" className="about-link">
                                            Passport
                                        </a>
                                    </li>

                                </ul>
                                <span>REST API</span>
                                <ul>
                                    <li>
                                        <a href="https://cloudinary.com/documentation/image_upload_api_reference" rel="noreferrer" target="_blank" className="about-link">
                                            Cloudinary 
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://restcountries.eu/" rel="noreferrer" target="_blank" className="about-link">
                                            RESTCountries 
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://developers.facebook.com/docs/facebook-login/access-tokens/" rel="noreferrer" target="_blank" className="about-link">
                                            Facebook OAuth Login 
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://developers.google.com/identity/protocols/oauth2" rel="noreferrer" target="_blank" className="about-link">
                                            Google OAuth Login
                                        </a>
                                    </li>
                                </ul>
                            </p>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Image
                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                public_id="portfolio_capstone_project/pitch/Portfol.io-one-page-pitch_jei6i8.png"
                                loading="lazy"
                                className="about-pitch-img"
                            >
                                <Placeholder type="vectorize" />
                            </Image>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
