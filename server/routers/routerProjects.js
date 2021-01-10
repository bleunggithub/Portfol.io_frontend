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
        let projectUserName = await knex('users').where('id', projectData[0].users_id)

        // console.trace(projectData)  

        if (projectData.length > 0) {
        let sameUser;
        let tagsArray;
        let {users_id, project_title, project_summary, project_url, project_code_url} = projectData[0]
        let users_full_name = projectUserName[0].full_name
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
            users_full_name,
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

//update project images
    router.post('/editProjectImgs/:projectId', async (req, res) => {
        let projectId = parseInt(req.params.projectId); 
        let updateImgs = req.body.updateImgs; //type == array
        
        // console.trace(projectId)
        // console.trace(updateImgs)

        try {

            if (updateImgs.length > 0 && updateImgs.length <= 6){
                for (let i = 0; i < updateImgs.length; i++){
                    await knex('users_projects').update(`project_img_url${i + 1}`, updateImgs[i])
                    .where('project_id', projectId)
                }

                if (updateImgs.length < 6) {
                    for (let i = 6; i > updateImgs.length; i--){
                        await knex('users_projects').update(`project_img_url${i}`, null)
                        .where('project_id', projectId)
                    }
                }

            } else {
                res.sendStatus(400)
            }
            
            
            res.sendStatus(200)

        } catch (err) {
            console.trace(err)
            res.sendStatus(400)
        }
    })
})
    
//update project details
    router.post('/editProjectDetails/:projectId', async (req, res) => {
        let projectId = parseInt(req.params.projectId); 
        let updateDetails = req.body.projectDetails; 
        
        console.trace(projectId)
        console.trace(updateDetails)

        try {
            let projectData = {};
            
            if (updateDetails.project_title != '') { 
                let changeProjectTitle = await knex.update('project_title', updateDetails.project_title)
                    .from('users_projects').where('project_id', projectId).returning('project_title')
                    
                    projectData.project_title = changeProjectTitle[0]

                    console.trace(changeProjectTitle) 
            }

            if (updateDetails.project_summary != '') { 
                let changeProjectSummary = await knex.update('project_summary', updateDetails.project_summary)
                    .from('users_projects').where('project_id', projectId).returning('project_summary')
                    
                    projectData.project_summmary = changeProjectSummary[0]

                    console.trace(changeProjectSummary) 
            }

            if (updateDetails.project_url != '') { 
                let changeProjectUrl = await knex.update('project_url', updateDetails.project_url)
                    .from('users_projects').where('project_id', projectId).returning('project_url')
                    
                    projectData.project_url = changeProjectUrl[0]

                    console.trace(changeProjectUrl) 
            }

            if (updateDetails.project_code_url != '') { 
                let changeProjectCodeUrl = await knex.update('project_code_url', updateDetails.project_code_url)
                    .from('users_projects').where('project_id', projectId).returning('project_code_url')
                    
                    projectData.project_code_url = changeProjectCodeUrl[0]

                    console.trace(changeProjectCodeUrl) 
            }

            if (updateDetails.project_tags != '') {
                // console.trace(updateDetails.project_tags)
                let mappedTags = updateDetails.project_tags.map(x => x.skill)
                // console.trace(mappedTags)
                let stringTags = mappedTags.toString()
                // console.trace(stringTags)
                    
                let changeTags = await knex.update('project_tags', stringTags)
                .from('users_projects').where('project_id', projectId).returning('project_tags')
                
                let tagsArray = changeTags[0].split(",")
                
                projectData.tagsArray = tagsArray

                console.trace(changeTags) 
            } 

            console.trace(projectData)
            res.json(projectData)


        } catch (err) {
            console.trace(err)
            res.sendStatus(400)
        }
    })



    return router; 
}