import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems:'center',
    flexDirection: 'column',
  },
  card: {
    marginTop: theme.spacing(2),
    width: '56vw', // Set card width
    height: '30vh', // Set card height
    textAlign: 'left',
    fontFamily: '"Quicksand", sans-serif', // Add the font family here
    background:'#F0F7F9',
    boxShadow: 'none', // remove shadows
    justifyContent: 'center',
  },
  senderText:{
    fontSize: '1.2vw',
    fontFamily: '"Quicksand", sans-serif'
  },
  content:{
    fontSize: '0.9vw',
    fontFamily: '"Quicksand", sans-serif'
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center', // Center cards horizontally
  },
  pos: {
    marginBottom: 12,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end', // Right-align buttons
    alignItems: 'flex-end', // Align buttons at the bottom,
     },
  acceptButton:{
     textAlign:'center',
     margin:'1vw',
     backgroundColor:'#E1FCEF',
     fontFamily: '"Quicksand", sans-serif',
     width:'8vw',
     fontSize: '0.9vw',
     color:'#037847',
     borderColor: '#037847',
     padding:'1vh'
    
   
  },
  rejectButton:{
   
    textAlign:'center',
    margin:'1vw',
    backgroundColor:'#FFD9E1',
    fontFamily: '"Quicksand", sans-serif',
    width:'8vw',
    fontSize: '0.9vw',
    color:'#D1204D',
    borderColor: '#D1204D',
    padding:'1vh'
 }

 
}));

const invitations = [
  {
    id: 1,
    senderName: "Dr. Hermione Granger",
    caseSummary:
      "A 55-year-old male, presents with persistent lower back pain and recent onset of numbness and tingling in the right leg. Symptoms have been progressively worsening over the past two weeks, impairing his mobility and quality of life. Physical examination reveals limited range of motion and tenderness over the lumbar spine. Suspected diagnosis includes lumbar disc herniation or spinal stenosis. Urgent X-ray of the lumbar spine is requested.",
  },
  {
    id: 2,
    senderName: "Dr. Lord Voldemort",
    caseSummary:
      "A 42-year-old female, presents with persistent abdominal pain localized to the right upper quadrant. History of intermittent nausea and vomiting, with no significant weight changes reported. Physical examination reveals tenderness on palpation in the area of the gallbladder. Suspected diagnosis includes cholecystitis or biliary colic. Routine X-ray of the abdomen is requested to evaluate for possible gallstones or other biliary abnormalities.",
  },
];

export default function Invitations() {
  const classes = useStyles();
  const handleAcceptClick = () => {
    // Implement your logic for handling accept click here
    console.log('Accept button clicked!');
  };

  const handleRejectClick = () => {
    // Implement your logic for handling reject click here
    console.log('Reject button clicked!');
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {invitations.map((invitation) => (
          <Grid item xs={12} key={invitation.id} className={classes.cardContainer}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" component="div" className={classes.senderText}>
                  {invitation.senderName} has invited you
                </Typography>
                <Typography variant="body2" component="p" className={classes.content}>
                  Case Summary: {invitation.caseSummary}
                </Typography>
                
              </CardContent>
              <div className={classes.cardActions}>
                <Button variant="outlined" className={classes.acceptButton } onClick={handleAcceptClick}>Accept</Button>
                <Button variant="outlined" className={classes.rejectButton} onClick={handleRejectClick}>Reject</Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
