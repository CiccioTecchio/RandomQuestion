import React, { ReactElement, useState } from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import './Body.scss';
import { IInputText } from './home-page/Interfaces';
import GenericInputText from './home-page/components/generic-input/GenericInput';
import UploadBtn from './home-page/components/upload-btn/UploadBtn';

interface ICanStart {
  isValidUpload: boolean;
  isValidPassingScore: boolean;
  isValidTimer: boolean;
}

function UploadBtnPassingScoreAndTimer(props:{onDisabilitationStart:Function}):ReactElement {
  const [canStart, setStart] = useState<ICanStart>({isValidUpload: false, isValidPassingScore: false, isValidTimer: false});

  const handleUploadValidation = (value:boolean) => {
    setStart({isValidUpload: value, isValidPassingScore: canStart.isValidPassingScore, isValidTimer: canStart.isValidTimer});
    if (value && canStart.isValidPassingScore && canStart.isValidTimer) props.onDisabilitationStart(false); else props.onDisabilitationStart(true);
  };

  const handlePassingScoreValidation = (value:boolean) => {
    setStart({isValidUpload: canStart.isValidUpload, isValidPassingScore: value, isValidTimer: canStart.isValidTimer});
    if (canStart.isValidUpload && value && canStart.isValidTimer) props.onDisabilitationStart(false); else props.onDisabilitationStart(true);
  };
  const handleTimerValidation = (value:boolean) => {
    setStart({isValidUpload: canStart.isValidUpload, isValidPassingScore: canStart.isValidPassingScore, isValidTimer: value});
    if (canStart.isValidUpload && canStart.isValidPassingScore && value) props.onDisabilitationStart(false); else props.onDisabilitationStart(true);
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
    <Row className="mt-5 text-center">
      <Col className='mt-2'> <UploadBtn onValidationUpload={handleUploadValidation}/> </Col>
      <Col> <GenericInputText config={passingScore} isInputValid={handlePassingScoreValidation}/> </Col>
      <Col> <GenericInputText config={timer} isInputValid={handleTimerValidation}/> </Col>
    </Row>
  );
}

function ButtonStart(props:{isDisabled: boolean}):ReactElement {
  return (
    <Button className='play-btn' size='lg' disabled={props.isDisabled}>
      <FontAwesomeIcon icon={faPlay as IconProp}/>
    </Button>
  );
}

export default function Body():ReactElement {
  const {t} = useTranslation();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleSetDisabled = (value:boolean) => setIsDisabled(value);
  return (
    <Container>
      <Row className="mt-5 text-center">
        <h1>{t('title')}</h1>
      </Row>
      <Row className="mt-3 text-center">
        <h3 dangerouslySetInnerHTML={{__html: t('explain')}}></h3>
      </Row>
      <UploadBtnPassingScoreAndTimer onDisabilitationStart={handleSetDisabled}/>
      <div className='mt-5 text-center'>
        <ButtonStart isDisabled={isDisabled}/>
      </div>
    </Container>
  );
}
