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

    
//get own projects
router.post('/getOwnProjects', async (req, res) => {

    console.trace(req.body)

    let accessToken = req.body.accessToken;

    try {
        let user = jwt.verify(accessToken, config.jwtSecret);
        // console.trace(user)

        let projects = await knex('users_projects').where('users_id', user.id)
            .orderBy('project_id','from', 'users_projects')

        console.trace(projects)

        res.json({
            projects
        })

            
        } catch (err) {
        console.trace(err)
        res.sendStatus(400)
}   
})
    
//get projects with id
router.post('/getProjectData/:projectId', async (req, res)=>{
    let projectId = parseInt(req.params.projectId); //the id of the project
    let accessToken = req.body.accessToken; // access token of requester
    console.trace(projectId)

    try {
        let requester = jwt.verify(accessToken, config.jwtSecret);

        let projectData = await knex('users_projects').where('project_id', projectId)

        // console.trace(projectData)  

        if (projectData.length > 0) {
        let sameUser;
        let tagsArray;
        let {users_id, project_title, project_summary, project_url, project_code_url} = projectData[0]
        let project_imgs = [projectData[0].project_img_url1, projectData[0].project_img_url2, projectData[0].project_img_url3, projectData[0].project_img_url4, projectData[0].project_img_url5, projectData[0].project_img_url6]
        
        if (projectData[0].users_id === requester.id) {
            sameUser = true    
        } else {
            sameUser = false
        }
            
                
        if (projectData[0].project_tags != null) {
            tagsArray = projectData[0].project_tags.split(",")
        }
            
        res.json({
            users_id,
            project_title,
            project_imgs,
            project_summary,
            project_url,
            project_code_url,
            tagsArray,
            sameUser,
        })
            
        } else {
            res.json({
                message: 'Project not found.'
            })
        }


    } catch(err) {
        console.trace(err)
        res.sendStatus(400)
    }
})





    
    

    return router; 
}