const jwt = require('jsonwebtoken');
const config = require('../jwt/jwtConfig');

//database
const { development } = require('../knexfile');
const knex = require("knex")(development);

module.exports = (express) => {
    const router = express.Router();

    
//get projects for dashboard
router.get('/getAll', async (req, res) => {
    try {

        let allProjects = await knex('users_projects')
            .select('project_id', 'users_id', 'project_title', 'project_img_url1')
            .join('users', 'users_projects.users_id', '=', 'id').select('full_name', 'user_img_url')
            .orderBy('project_id', 'desc')

        console.trace(allProjects)

        res.json({
            projectDetails: allProjects,
        })

    } catch (err) {
        console.trace(err)
        res.sendStatus(400)
    }
})
    
router.post('/search', async (req, res) => {
    try {
        let searchKeywords = req.body.searchKeywords;

        //split by " " - searchKeywords.split(" ") //array


    } catch (err){
        console.trace(err)
        res.sendStatus(400)
    } 
})


    return router; 
}