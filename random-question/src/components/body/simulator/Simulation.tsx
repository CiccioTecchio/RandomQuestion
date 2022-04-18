import React, { ReactElement, useEffect, useState } from 'react';
import { IQuestion, IQuestionAnswered } from '../home-page/Interfaces';
import QuestionNavigator from './components/question-list/QuestionNavigator';
import Questions from './components/questions/Questions';
import Timer from './components/timer/Timer';
import './Simulation.scss';

export default function Simulation(props:{questions:Array<IQuestion>, timer:number}): ReactElement {
  const convetTimerMinutesInSecond = (minutes:number) => minutes * 60;
  function initAnsweredQuestion():Array<IQuestionAnswered> {
    return props.questions.map(() => {
      return {selectedOptions: [], isFlagged: false};
    });
  };
  const [answeredQuestion, setAnsweredQuestion] = useState<{qaList:Array<IQuestionAnswered>}>({qaList: initAnsweredQuestion()});
  const handleAnsweredQuestion = (value:{qaList:Array<IQuestionAnswered>}) => setAnsweredQuestion(value);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [currentTimer, setTimer] = useState<number>(convetTimerMinutesInSecond(props.timer));

  const handleChangeQuestion = (newIdx:number) => {
    try {
      setCurrentQuestionIdx(newIdx);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => setTimer(currentTimer-1), 1000);
    return () => clearInterval(interval);
  }, [currentTimer]);

  return (
    <>
      <QuestionNavigator questionAnswered={answeredQuestion.qaList} currentQuestionIdx={currentQuestionIdx} changeQuestion={handleChangeQuestion}/>
      <Questions questions={props.questions} updateQAInSimulation={handleAnsweredQuestion} currentQuestionIdx={currentQuestionIdx} changeQuestion={handleChangeQuestion} />
      <Timer minutes={Math.floor(currentTimer/60)} seconds={currentTimer%60}/>
    </>
  );
}
