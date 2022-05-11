import {
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateAnswers } from '../redux/userSlice';

function OnlineTest() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const userDetails = useSelector((state) => state.user);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const updateQuestion = (q, answerId) => {
    dispatch(updateAnswers({ ...q, selectedAnswerId: answerId }));
    currentQuestion < 4
      ? setcurrentQuestion(currentQuestion + 1)
      : navigation('/result');
  };

  useEffect(() => {
    userDetails.name.length > 0
      ? axios.get('http:///localhost:3010/questions').then((response) => {
          setQuestions(response.data);
        })
      : navigation('/');
  }, []);

  return questions.length !== 0 ? (
    <Card sx={{ maxWidth: 700, mx: 'auto', mt: 15 }}>
      <CardHeader title={`Question ${currentQuestion + 1} of 5`}></CardHeader>
      <Box>
        <LinearProgress
          variant="determinate"
          value={((currentQuestion + 1) * 100) / 5}
          color="warning"
        ></LinearProgress>
      </Box>
      <CardContent>
        <Typography variant="h6">
          {questions[currentQuestion].question}
        </Typography>
        <List>
          {questions[currentQuestion].options.map((option, index) => (
            <ListItemButton
              key={index}
              disableRipple
              onClick={() =>
                updateQuestion(questions[currentQuestion], index+1)
              }
            >
              <div>{option}</div>
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  ) : null;
}

export default OnlineTest;
