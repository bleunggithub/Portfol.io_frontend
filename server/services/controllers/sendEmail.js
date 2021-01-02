require('dotenv').config();
const AWS = require("aws-sdk");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../../jwt/jwtConfig');

//database
const { development } = require('../../knexfile');
const knex = require("knex")(development);


exports.emailViaAWS_SES = async(req, res, next) => {
    console.trace(req.body);
    //candidate id
    console.trace(req.body.candidateId)

    try {
    
    //decode employer id
    let employer = jwt.verify(req.body.accessToken, config.jwtSecret)
    console.trace(employer.id);
    
        let employerData = await knex('employers').select('companyName').where('users_id', employer.id);
        let candidateData = await knex('users').select('email').where('id', req.body.candidateId);
        let candidateDataName = await knex('candidates').select('fullName').where('users_id', req.body.candidateId);
        
        let employerCompanyName = employerData[0].companyName;
        let candidateEmail = candidateData[0].email;
        let candidateName = candidateDataName[0].fullName;

    AWS.config.update({
        accessKeyId: process.env.AWS_accessKeyId,
        secretAccessKey: process.env.AWS_secretAccessKey,
        region: process.env.AWS_region
    });
    
    const ses = new AWS.SES({ apiVersion: "2010-12-01" });
    const params = {
      Destination: {
        ToAddresses: [candidateEmail] // Email address/addresses that you want to send your email
      },
      Message: {
        Body: {
          Html: {
            // HTML Format of the email
            Charset: "UTF-8",
            Data:
                `<html>
                    <body>
                    <p>Dear ${candidateName},</p>
                    <p><strong>${employerCompanyName}</strong> came across your profile on Higher.io and is interested in knowing more about you! </p>
                    <p>Would you like to <strong>upload your CV/ Resume</strong> for them?</p>
                    <p>Click <a href="https://localhost:3000/" target="_blank" style="color:#000">here</a> to log into your Higher.io account. </p>
                    <p>Thank you for using our services.<br />
                    Your Higher.io Team</p>
                    <img src="https://i.imgur.com/sgmfYQU.png">
                    </body>
                </html>`
          },
          Text: {
            Charset: "UTF-8",
            Data: "An Employer is interested in your profile..."
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: "An Employer is interested in your profile..."
        }
      },
      Source: "Higher.io" + process.env.AWS_SenderEmailId
    };

    //For Sender
    const params1 = {
      Destination: {
         ToAddresses: [process.env.AWS_SenderEmailId] // Email address/addresses that you want to send your email
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<html>
                <h2> Report from Higher.io - AWS SES Services</h2><br />
                <h3> To Name: ${candidateName} </h3><br />
                <h3> To Email: ${candidateEmail} </h3><br />
                <h3> Message: ${params.Message.Body.Html.Data}</h3>
                </html>`
          }, 
          Text: {
           Charset: "UTF-8",
           Data: "This is the feedback message from user"
          }
        },
        Subject: {
         Charset: "UTF-8",
         Data: `Feedback from ${employerCompanyName}`
        }
     },
     Source: "Feedback from Higher.io" + process.env.AWS_SenderEmailId
   };

    const sendEmailReceiver = ses.sendEmail(params).promise();
    const sendEmailSender = ses.sendEmail(params1).promise();
    
    sendEmailReceiver
      .then(data => {
        console.log("email submitted to SES", data);
        sendEmailSender.then(data => {
            console.log("email submitted to SES", data);
            res.status(200).send({
                message:'Message send successfully !'
            })
        }).catch(error => {
            console.log(error);
            res.status(404).send({
                message:'Failed to send !'
            })
        });
      })
      .catch(error => {
        console.log(error);
        res.status(404).send({
            message:'Failed to send !'
        })
    });        

    } catch (err) {
        console.trace(err)
        res.status(400)
    }

 

    
}