import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';


import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

const Accordion = withStyles({
  root: {
      backgroundColor:'#ffffff00',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#ffffff00',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '0px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
        padding: theme.spacing(2),
        border: '1px solid rgba(0, 0, 0, .125)',
        borderRadius: '5px'
  },
}))(MuiAccordionDetails);

const header = {
    margin: '0',
    background: 'linear-gradient(to top, #546e7a45 40%, transparent 40%)',
	color: '#535353',
	marginBottom: '0',
	fontWeight: '700',
	// cursor: 'pointer',
}


export default function CustomizedAccordions(props) {
    const [expanded, setExpanded] = useState(false);
    const [emailContent, setContent] = useState({
        contactName: "",
        contactEmail: "",
        emailMessage: "",
    })

    const [isLoading,setLoading] = useState(false)
    const [isSent,setSent] = useState(false)

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    
    const handleContactMe = (e) => {
        e.preventDefault();

        setLoading(true);

        const message = {
            name: emailContent.contactName,
            email: emailContent.contactEmail,
            body: emailContent.emailMessage,
        }

        axios.post(`${process.env.REACT_APP_API_SERVER}/api/contactMe/`, {
            message
        }).then(res => {
            // console.log(res.data.message)

            if (res.status !== 200) {
                console.log(res.data)
                props.handleErrorCB()
                setLoading(false)
            } else {
                setSent(true)
                setLoading(false)
            }      
        }).then(setTimeout(() => {
                setSent(false)
                setExpanded(false)
        }, 2000))
            .catch(err => {
                console.log(err)
                setLoading(false)
                props.handleErrorCB()
        })
    }
    
    const handleInputChange = (e) => {
        const {value, name} = e.target;

        setContent(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
  }

  return (
    <div>
      <Accordion square defaultExpanded={false} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <p style={header}>Contact Me</p>
        </AccordionSummary>
        <AccordionDetails>
            <form onSubmit={handleContactMe}>
                <TextField label="Your Name" name="contactName" value={emailContent.contactName} onChange={handleInputChange} style={{ width:"95%", margin: "10px 0" }} required/>
                <TextField label="Your Email" name="contactEmail" type="email" value={emailContent.contactEmail} onChange={handleInputChange} style={{ width:"95%", margin: "10px 0" }} required/>
                <TextField
                    label="Message"
                    multiline
                    rows={10}
                    name="emailMessage"
                    onChange={handleInputChange}
                    value={emailContent.emailMessage}
                    variant="outlined"
                    style={{margin: '1em 0', width:'95%'}}
                    required
                      />
            <Button variant="contained" color="primary" size="small" disableElevation style={{ margin: "0 0.5em" }} type="submit"> Send </Button> 
                      {isLoading && <CircularProgress color="primary" size="1em"  style={{margin: '0 0.5em', verticalAlign: 'sub'}}/>}
                      {isSent && <CheckIcon color="primary" size="1em"  style={{margin: '0 0.5em', verticalAlign: 'sub'}} />}
            </form>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}
