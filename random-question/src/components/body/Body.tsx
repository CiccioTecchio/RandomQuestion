import React, { ReactElement, useState } from 'react';
import {Container} from 'react-bootstrap';
import './Body.scss';
import { PageName } from './Constants';
import HomePage from './home-page/HomePage';
import { IPageToShow, IQuestion, IQuestionAnswered } from './home-page/Interfaces';
import ResumeSimulation from './resume-simulation/ResumeSimulation';
import Simulation from './simulator/Simulation';

export default function Body():ReactElement {
  const [show, setShow] = useState<IPageToShow>({
    showHome: true,
    showDoc: false,
    showSimulation: false,
    showResumeSimulation: false
  });

  function initAnsweredQuestion(question:Array<IQuestion>):Array<IQuestionAnswered> {
    return question.map(() => {
      return {selectedOptions: [], isFlagged: false};
    });
  };

  const [questionJSON, setQuestionJSON] = useState<Array<IQuestion>>([]);
  const [qaList, setQaList] = useState<Array<IQuestionAnswered>>([]);
  const [timer, setTimer] = useState<number>(0);
  const [passingScore, setPassingScore] = useState<number>(0);
  const handleAnsweredQuestion = (newQaList:Array<IQuestionAnswered>) => setQaList(newQaList);

  const handleHowToShow = (pageToShow:PageName) => {
    setShow({
      showHome: (pageToShow == PageName.Home)?true: false,
      showDoc: (pageToShow == PageName.Doc)?true: false,
      showSimulation: (pageToShow == PageName.Simulator)?true: false,
      showResumeSimulation: (pageToShow == PageName.ResumeSimulation)?true: false
    });
  };

  const handleQuestionJSON = (questions:Array<IQuestion>) => {
    setQuestionJSON(questions);
    setQaList(initAnsweredQuestion(questions));
  };

  const handleTimer = (timer:number) => setTimer(timer);
  const handlePassingScore = (ps:number) => setPassingScore(ps);

  return (
    <Container>
      {show.showHome && (<HomePage startSimulation={handleHowToShow} takeQuestions={handleQuestionJSON} takeTimer={handleTimer} takePassingScore={handlePassingScore}/>)}
      {show.showSimulation && (<Simulation goToResumePage={handleHowToShow} questions={questionJSON!} qaList={qaList} updateQaList={handleAnsweredQuestion} timer={timer} />)}
      {show.showResumeSimulation && (<ResumeSimulation passingScore={passingScore} question={questionJSON} qaList={qaList}/>)}
    </Container>
  );
}
