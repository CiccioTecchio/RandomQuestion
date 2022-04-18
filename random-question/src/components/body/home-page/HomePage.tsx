import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { PageName } from '../Constants';
import GenericInputText from './components/generic-input/GenericInput';
import UploadBtn from './components/upload-btn/UploadBtn';
import './HomePage.scss';
import { ICanStart, IInputText } from './Interfaces';

export default function HomePage(props:{startSimulation:Function, takeQuestions:Function, takeTimer:Function, takePassingScore:Function}):ReactElement {
  const [canStart, setStart] = useState<ICanStart>({isValidUpload: false, isValidPassingScore: false, isValidTimer: false});

  const handleUploadValidation = (value:boolean) => {
    setStart({isValidUpload: value, isValidPassingScore: canStart.isValidPassingScore, isValidTimer: canStart.isValidTimer});
  };
  const handlePassingScoreValidation = (value:boolean) => {
    setStart({isValidUpload: canStart.isValidUpload, isValidPassingScore: value, isValidTimer: canStart.isValidTimer});
  };
  const handleTimerValidation = (value:boolean) => {
    setStart({isValidUpload: canStart.isValidUpload, isValidPassingScore: canStart.isValidPassingScore, isValidTimer: value});
  };

  const handleStartSimulation = () => {
    props.startSimulation(PageName.Simulator);
  };

  const [t] = useTranslation();
  const passingScore:IInputText = {
    id: 'passing-score',
    max: 100,
    min: 1,
    lang: {label: t('label.passing.score'), span: '%'},
    patter: '^[1-9]\d{0,2}$',
    regExp: /^[1-9]\d{0,2}$/
  };

  const timer:IInputText = {
    id: 'timer',
    max: 180,
    min: 1,
    lang: {label: t('set.timer'), span: 'min'},
    patter: '^[1-9]\d{0,2}$',
    regExp: /^[1-9]\d{0,2}$/
  };

  return (
    <>
      <Row className="mt-5 text-center">
        <h1>{t('title')}</h1>
      </Row>
      <Row className="mt-3 text-center">
        <h3 dangerouslySetInnerHTML={{__html: t('explain')}}></h3>
      </Row>
      <Row className="mt-5 text-center">
        <Col className='mt-2'> <UploadBtn onValidationUpload={handleUploadValidation} takeQuestion={props.takeQuestions}/> </Col>
        <Col> <GenericInputText config={passingScore} isInputValid={handlePassingScoreValidation} takeValue={props.takePassingScore}/> </Col>
        <Col> <GenericInputText config={timer} isInputValid={handleTimerValidation} takeValue={props.takeTimer}/> </Col>
      </Row>
      <div className='mt-5 text-center'>
        <Button className='play-btn' size='lg' disabled={!(canStart.isValidUpload && canStart.isValidPassingScore && canStart.isValidTimer)} onClick={handleStartSimulation}>
          <FontAwesomeIcon icon={faPlay as IconProp}/>
        </Button>
      </div>
    </>

  );
}
