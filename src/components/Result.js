import {
  Card,
  CardContent,
  Box,
  CardMedia,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
} from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { green, red,grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset } from '../redux/userSlice';

function Result() {
  const [result, setResult] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const userDetails = useSelector((state) => state.user);

  useEffect(() => {
    userDetails.name.length === 0 ? navigation('/') : getScore();
  }, []);

  const getScore = () => {
    let _score = userDetails.questionsAndAnswers.reduce((prev, curr) => {
      return curr.correctOption == curr.selectedAnswerId ? prev + 1 : prev;
    }, 0);
    setResult(_score);
  };

  const retry = () => {
    dispatch(reset());
    navigation('/');
  };

  const markAnswer = (q,i) => {
    if([q.correctOption,q.selectedAnswerId].includes(i+1)){
      return {sx:{color:q.correctOption == i+1 ? green[400]:red[400]}}
    }
  }

  return (
    <>
      <Card
        sx={{
          mt: 10,
          display: 'flex',
          width: '100%',
          maxWidth: 700,
          mx: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
            <Typography variant="h5">
              Thanks ${userDetails.name}, Test Completed
            </Typography>
            <Typography variant="h6">TEST RESULT</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              <Typography variant="span" color={green[400]}>
                {result}
              </Typography>
              /5
            </Typography>
            <Button
              variant="contained"
              color="warning"
              sx={{ m: 2 }}
              onClick={retry}
            >
              Retry
            </Button>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 200, m: 4 }}
          image="./done.png"
        ></CardMedia>
      </Card>
      <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', mt: 2 }}>
        {userDetails.questionsAndAnswers.map((q, index) => (
          <Accordion disableGutters key={index}>
            <AccordionSummary
              expandIcon={
                <ExpandCircleDownIcon
                  sx={{
                    color:
                      q.correctOption == q.selectedAnswerId
                        ? green[400]
                        : red[500],
                  }}
                />
              }
            >
              {q.question}
            </AccordionSummary>
            <AccordionDetails sx={{backgroundColor:grey[900]}}>
              <List>
                {q.options.map((option, i) => (
                  <ListItemButton key={i} disableRipple>
                    <Typography {...markAnswer(q,i)}>{option}</Typography>
                  </ListItemButton>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
}

export default Result;
