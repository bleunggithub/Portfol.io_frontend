const axios = require('axios');
const jwt = require('jsonwebtoken');
const config = require('../jwt/jwtConfig');
const bcrypt = require('./bcrypt');
const { json } = require('body-parser');

//database
const { development } = require('../knexfile');
const { map } = require('lodash');
const knex = require("knex")(development);

module.exports = (express) => {
    const router = express.Router();

    
//get projects for dashboard
router.get('/dashboard/:viewing/:accessToken/:page', async (req, res) => {
    try {
        let viewing = req.params.viewing //"Following", "Liked", "All"
        let accessToken = req.params.accessToken
        let page = parseInt(req.params.page)
        // console.trace(req.params)


        let requester = jwt.verify(accessToken, config.jwtSecret);
        
            if (viewing === "Following") {
                let followUserProjects = await knex('users_follows').where('followers_id', requester.id)
                console.trace(followUserProjects)
                
                let projects = []
                if (followUserProjects.length > 0) {
                    let mappedProjectCreatorIds = followUserProjects.map(user => user.users_id)
                    console.trace(mappedProjectCreatorIds) //Array of users_id

                    for (i = 0; i < mappedProjectCreatorIds.length; i++){
                        projects = [...projects, ...await knex('users_projects')
                            .where('users_id', mappedProjectCreatorIds[i])
                            .select('project_id', 'users_id','project_title','project_img_url1')
                            .join('users','users_projects.users_id','=','id').select('full_name','user_img_url')]
                        // await knex('users').where('id',mappedProjectCreatorIds[i])
                    }
                }
                
                //reverse order of projects, latest first
                projects = projects.sort((a,b)=>{
                    let fa = a.project_id,
                    fb = b.project_id;
                    
                    if (fa > fb) {
                        return -1;
                    }
                    
                    if (fa < fb) {
                        return 1;
                    }
                    
                    return 0;
                })
                
                if(projects.length > 20){
                    let pageNum = page*20
                    let pageLastItem = pageNum + 20;
                    
                    projects = projects.slice(pageNum, pageLastItem)
                    
                }
                
                console.trace(projects)

                    res.json({
                        projectDetails: projects,
                    })
                



            } else if (viewing === "Liked") {

            } else if (viewing === "All"){
                
            } else {

            }
        
        
    } catch (err) {
        console.trace(err)
        res.sendStatus(400)
    }
})


    return router; 
}