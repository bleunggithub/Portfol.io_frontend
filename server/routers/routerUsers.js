const axios = require('axios');
const jwt = require('jsonwebtoken');
const config = require('../jwt/jwtConfig');
const bcrypt = require('./bcrypt');
const sendAWSEmail = require('../services/controllers/sendEmail')
const { json } = require('body-parser');

//database
const { development } = require('../knexfile');
const knex = require("knex")(development);

module.exports = (express) => {
    const router = express.Router();


//get own profile 
router.post('/getOwnProfile', async (req, res) => {

    console.trace(req.body)

    let accessToken = req.body.accessToken;

    try {
        let user = jwt.verify(accessToken, config.jwtSecret);
        console.trace(user)

        let DataFromUsersTable = await knex('users').where('id', user.id).returning('*')
        let projects = await knex('users_projects').where('users_id', user.id).returning('*')

        let { email, full_name, user_img_url, current_company, current_job_title, github_url, facebook_url, twitter_url, linkedin_url, website_url, summary} = DataFromUsersTable[0];
            // console.trace(DataFromUsersTable[0])
        
        let facebookUser, googleUser = false;
        if (DataFromUsersTable[0].facebook_id != null) {
            facebookUser = true
        } else if (DataFromUsersTable[0].google_id != null) {
            googleUser = true
        }
        
        let skillsArray;
        if (DataFromUsersTable[0].skills != null) {
            skillsArray = DataFromUsersTable[0].skills.split(",")
        }
            
        res.json({
            email,
            facebookUser,
            googleUser,
            full_name,
            user_img_url,
            current_company,
            current_job_title,
            skillsArray,
            github_url,
            facebook_url,
            twitter_url,
            linkedin_url,
            website_url,
            summary,
            projects
        })

            
        } catch (err) {
        console.trace(err)
        res.sendStatus(400)
}   
})
    
//get own projects
router.post('/getOwnProjects', async (req, res) => {

    // console.trace(req.body)

    let accessToken = req.body.accessToken;

    try {
        let user = jwt.verify(accessToken, config.jwtSecret);
        // console.trace(user)

        let projects = await knex('users').where('id', user.id)
            .join('users_projects', 'users_projects.users_id', '=', 'users.id')
            .select('users_projects.project_id', 'users_projects.project_img_url', 'users_projects.project_title', 'users_projects.project_summary', 'users_projects.project_url')
            .orderBy('project_id','from', 'users_projects')

        // console.trace(projects)

        res.json({
            projects
        })

            
        } catch (err) {
        console.trace(err)
        res.sendStatus(400)
}   
})

    
    



    return router; 
}