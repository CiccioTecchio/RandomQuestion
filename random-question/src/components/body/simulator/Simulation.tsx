import React, { ReactElement, useState } from 'react';
import { IQuestion, IQuestionAnswered } from '../home-page/Interfaces';
import QuestionNavigator from './components/question-list/QuestionNavigator';
import Questions from './components/questions/Questions';
import './Simulation.scss';

export default function Simulation(props:{questions:Array<IQuestion>}): ReactElement {
  function initAnsweredQuestion():Array<IQuestionAnswered> {
    return props.questions.map(() => {
      return {selectedOptions: [], isFlagged: false};
    });
  };
  const [answeredQuestion, setAnsweredQuestion] = useState<{qaList:Array<IQuestionAnswered>, idxCurrentQ:number}>({qaList: initAnsweredQuestion(), idxCurrentQ: 0});
  const handleAnsweredQuestion = (value:{qaList:Array<IQuestionAnswered>, idxCurrentQ:number}) => setAnsweredQuestion(value);

  return (
    <>
      <QuestionNavigator questionAnswered={answeredQuestion.qaList} currentQuestionIdx={answeredQuestion.idxCurrentQ}/>
      <Questions questions={props.questions} updateQAInSimulation={handleAnsweredQuestion} />
    </>
  );
}
