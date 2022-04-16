import React, { ReactElement, useState } from 'react';
import {Container} from 'react-bootstrap';
import './Body.scss';
import { PageName } from './Constants';
import HomePage from './home-page/HomePage';
import { IPageToShow, IQuestion } from './home-page/Interfaces';
import Simulation from './simulator/Simulation';

export default function Body():ReactElement {
  const [show, setShow] = useState<IPageToShow>({
    showHome: true,
    showDoc: false,
    showSimulation: false,
    showPreSendSimulation: false,
    showResumeSimulation: false
  });

  const [questionJSON, setQuestionJSON] = useState<Array<IQuestion>>([]);

  const handleHowToShow = (pageToShow:PageName) => {
    setShow({
      showHome: (pageToShow == PageName.Home)?true: false,
      showDoc: (pageToShow == PageName.Doc)?true: false,
      showSimulation: (pageToShow == PageName.Simulator)?true: false,
      showPreSendSimulation: (pageToShow == PageName.PreSendSimulation)?true: false,
      showResumeSimulation: (pageToShow == PageName.ResumeSimulation)?true: false
    });
  };

  const handleQuestionJSON = (questions:Array<IQuestion>) => setQuestionJSON(questions);

  return (
    <Container>
      {show.showHome && (<HomePage startSimulation={handleHowToShow} takeQuestions={handleQuestionJSON}/>)}
      {show.showSimulation && (<Simulation questions={questionJSON!}></Simulation>)}
    </Container>
  );
}
