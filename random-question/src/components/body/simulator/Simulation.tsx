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
  const [answeredQuestion, setAnsweredQuestion] = useState<{qaList:Array<IQuestionAnswered>}>({qaList: initAnsweredQuestion()});
  const handleAnsweredQuestion = (value:{qaList:Array<IQuestionAnswered>}) => setAnsweredQuestion(value);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);

  const handleChangeQuestion = (newIdx:number) => {
    try {
      setCurrentQuestionIdx(newIdx);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <QuestionNavigator questionAnswered={answeredQuestion.qaList} currentQuestionIdx={currentQuestionIdx} changeQuestion={handleChangeQuestion}/>
      <Questions questions={props.questions} updateQAInSimulation={handleAnsweredQuestion} currentQuestionIdx={currentQuestionIdx} changeQuestion={handleChangeQuestion} />
    </>
  );
}
