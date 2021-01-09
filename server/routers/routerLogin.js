const axios = require('axios');
const jwt = require('jsonwebtoken');
const config = require('../jwt/jwtConfig');
const bcrypt = require('./bcrypt');

const { json } = require('body-parser');

//database
const { development } = require('../knexfile');
const knex = require("knex")(development);

module.exports = (express) => {
    const router = express.Router();


//login (local)
router.post('/login', async (req, res) => {
    console.trace(req)
    let { email, password } = req.body;

    let errors = [];

    //form validation
    if (!email || !password) {
        errors.push({
            message: "Please enter all fields."
        })
    }

    if (errors.length > 0) {
        res.json({
            message: errors 
        })
    }

    // console.trace(errors)

    //check if user details are the same as data in db
    try {            
        let checkUser = await knex('users').where('email', email) //.andWhere('password', password);

        if (checkUser.length == 0) {
            errors.push({
                message: "The email address you entered is not registered."
            })
            res.json({
                message: errors
            })
        } else {
            //check password using bcrypt
            let passwordFromDB = await knex('users').where('email', email).returning(['password','id', 'admin']);
            let passwordResult = await bcrypt.checkPassword(password, passwordFromDB[0].password);

            // console.trace(passwordFromDB);

            //jwt
            if (passwordResult) {
            
                let payload = {
                    id: passwordFromDB[0].id 
                }

            let token = jwt.sign(payload, config.jwtSecret);

            //check if login user is admin
            let userType;
                
            if (passwordFromDB[0].admin) {
                userType = "admin"
            } else {
                userType = "user"
            }
            
            // console.trace(token, passwordFromDB[0].id, userType)
            
            //sending response to frontend
            res.json({
                token: token,
                userType: userType
                })
            } else {
                errors.push({
                    message: "Incorrect Credentials."
                })
                res.json({
                    message: errors
                })
                res.sendStatus(401);
            }

        }

    } catch (err) {
        res.sendStatus(401)
        console.trace(err)
    }
})

    

    
    
// facebook sign up /login
router.post('/login/facebook', (req, res) => {

    if (req.body) {
        let { name, email, picture, id, accessToken } = req.body;

        let pictures = ["https://i.imgur.com/wdkAL7s.png","https://i.imgur.com/t7FVhRO.png","https://i.imgur.com/YZQ4iOr.png","https://i.imgur.com/o9qKWxf.png"]

        if (picture == '' || undefined || null) {
            picture = pictures[Math.floor(Math.random()*4)]
        }

        axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`)
            .then(async(data) => {
                if (!data.data.error) {
                    let token;

                    //check if existing user
                    let findUser = await knex('users').where('facebook_id', id).returning('id')

                    if (findUser.length > 0) {
                        //update accessToken in DB
                        let updateUser = await knex('users').where('id','=',findUser[0].id).update('facebook_access_token', accessToken)

                       //jwt
                        let payload = {
                            id: findUser[0].id,
                            accessToken: accessToken
                        }; 

                        token = jwt.sign(payload, config.jwtSecret);

                        res.json({
                            token: token,
                            userType: 'user'
                        })

                    } else if (findUser.length == 0) {
                        //insert new user
                        let newFBUser = await knex('users').insert({
                            email: email,
                            facebook_id: id,
                            facebook_access_token: accessToken,
                            full_name: name,
                            user_img_url: picture,
                            admin: false
                        }).returning('id');
                        
                        console.trace(newFBUser)

                        //insert empty project in project table
                        const newUserProject = {
                            users_id: newFBUser[0],
                            project_title: "No project yet.",
                            project_img_url1: "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
                            project_summary: "",
                            project_url: "#"
                        }

                        let insertIntoProjectsTable = await knex('users_projects').insert(newUserProject);

                        //jwt
                        let payload = {
                            id: newFBUser[0],
                            accessToken: accessToken
                        }; 

                        token = jwt.sign(payload, config.jwtSecret);

                        res.json({
                            token: token,
                            userType: 'user' 
                        })
                    }
                } else {
                    res.sendStatus(401)
                }
            })
            .catch(err => {
                console.trace(err);
                res.sendStatus(401)
        })
    } else {
        res.sendStatus(401)
    }
})
    
// google sign up /login
router.post('/login/google', (req, res) => {

    if (req.body) {
        let { name, email, picture, id, accessToken, tokenId } = req.body;

        let pictures = ["https://i.imgur.com/wdkAL7s.png","https://i.imgur.com/t7FVhRO.png","https://i.imgur.com/YZQ4iOr.png","https://i.imgur.com/o9qKWxf.png"]

        if (picture == '' || undefined || null) {
            picture = pictures[Math.floor(Math.random()*4)]
        }

        axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`)
            .then(async(data) => {
                if (!data.data.error) {
                    let token;

                    //check if existing user
                    let findUser = await knex('users').where('google_id', id).returning('id')

                    if (findUser.length > 0) {
                        //update accessToken in DB
                        let updateUser = await knex('users').where('id','=',findUser[0].id).update('google_access_token', accessToken)

                       //jwt
                        let payload = {
                            id: findUser[0].id,
                            accessToken: accessToken
                        }; 

                        token = jwt.sign(payload, config.jwtSecret);

                        res.json({
                            token: token,
                            userType: 'user'
                        })

                    } else if (findUser.length == 0) {
                        //insert new user
                        let newGoogleUser = await knex('users').insert({
                            email: email,
                            google_id: id,
                            google_access_token: accessToken,
                            full_name: name,
                            user_img_url: picture,
                            admin: false
                        }).returning('id');
                        
                        console.trace(newGoogleUser)

                        //insert empty project in projects table
                        const newUserProject = {
                            users_id: newGoogleUser[0],
                            project_title: "No project yet.",
                            project_img_url1: "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
                            project_summary: "",
                            project_url: "#"
                        }

                        let insertIntoProjectsTable = await knex('users_projects').insert(newUserProject);

                        //jwt
                        let payload = {
                            id: newGoogleUser[0],
                            accessToken: accessToken
                        }; 

                        token = jwt.sign(payload, config.jwtSecret);

                        res.json({
                            token: token,
                            userType: 'user' 
                        })
                    }
                } else {
                    res.sendStatus(401)
                }
            })
            .catch(err => {
                console.trace(err);
                res.sendStatus(401)
        })
    } else {
        res.sendStatus(401)
    }
})

    
    //candidate register (local)
router.post('/register', async (req, res) => {
    console.trace(req.body)   
    let { fullName, email, password } = req.body;

    //form validation
    let errors = [];

    if (!email || !password || !fullName) {
        errors.push({message: "Please complete all required fields."})
    }

    if (password.length < 6) {
        errors.push({message: "Password should be at least 6 characters."})
    }

    if (errors.length > 0) {
        res.json({
            message: errors 
        });
        console.trace(errors)

    } else {
        //passed form validation, create user in db
        try {
            let query = await knex("users").where({ email: email })
            
            if (query.length > 0) {
                errors.push({ message: "The email address you entered has already been registered." })
                res.json({
                    message: errors 
                })
            } else {
                let hashedPassword = await bcrypt.hashPassword(password)
                // console.trace(hashedPassword);

                let pictures = ["https://i.imgur.com/wdkAL7s.png","https://i.imgur.com/t7FVhRO.png","https://i.imgur.com/YZQ4iOr.png","https://i.imgur.com/o9qKWxf.png"]

                //details to be inserted in users table
                const newUser = {
                    email: email,
                    password: hashedPassword,
                    full_name: fullName,
                    user_img_url: pictures[Math.floor(Math.random()*4)],
                    admin: false,
                }

                let userId = await knex('users').insert(newUser).returning('id');
                
                //insert empty project in project table
                const newUserProject = {
                    users_id: userId[0],
                    project_title: "No project yet.",
                    project_img_url1: "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
                    project_summary: "",
                    project_url: "#"
                }

                let insertIntoProjectsTable = await knex('users_projects').insert(newUserProject);

                //authenticate new user
                let payload = {
                    id: newUser.id,
                    userType: 'user'
                }

                let token = jwt.sign(payload, config.jwtSecret)
                
                //sending token and id back to front end
                res.json({
                    token: token,
                    userType: 'user', 
                })
            }
            
        } catch (err) {
            console.trace(err);
            res.sendStatus(401)
        }
    }

})

    return router; 
}
