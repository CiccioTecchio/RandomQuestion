import React, { ReactElement, useEffect, useState } from 'react';
import { Modal, Alert, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { PageName } from '../Constants';
import { IQuestion, IQuestionAnswered } from '../home-page/Interfaces';
import QuestionNavigator from './components/question-list/QuestionNavigator';
import Questions from './components/questions/Questions';
import Timer from './components/timer/Timer';
import './Simulation.scss';

function ModalTimeout(props:{goToResume:Function}):ReactElement {
  const {t} = useTranslation();
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.goToResume(PageName.ResumeSimulation);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header>
        <Modal.Title>{t('modal.timeout.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant='danger'>
          <span dangerouslySetInnerHTML={{__html: t('modal.timeout.msg')}}></span>
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>{t('modal.timeout.continue')}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Simulation(props:{questions:Array<IQuestion>, qaList:Array<IQuestionAnswered>, timer:number, goToResumePage:Function, updateQaList:Function}): ReactElement {
  const convetTimerMinutesInSecond = (minutes:number) => minutes * 60;
  const handleAnsweredQuestion = (value:{qaList:Array<IQuestionAnswered>}) => props.updateQaList(value.qaList);
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
    if (currentTimer === 0) return;
    const interval = setTimeout(() => setTimer(currentTimer-1), 1000);
    return () => clearInterval(interval);
  }, [currentTimer, props]);

  return (
    <>
      {currentTimer === 0 && (<ModalTimeout goToResume={props.goToResumePage}/>)}
      <QuestionNavigator questionAnswered={props.qaList} currentQuestionIdx={currentQuestionIdx} changeQuestion={handleChangeQuestion}/>
      <Questions questions={props.questions} qaList={props.qaList} updateQAInSimulation={handleAnsweredQuestion} currentQuestionIdx={currentQuestionIdx} changeQuestion={handleChangeQuestion} goToResume={props.goToResumePage}/>
      <Timer minutes={Math.floor(currentTimer/60)} seconds={currentTimer%60}/>
    </>
  );
}
