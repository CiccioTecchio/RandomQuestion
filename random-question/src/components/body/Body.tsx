import React, { ReactElement } from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import './Body.scss';
import { IInputText } from './home-page/Interfaces';
import GenericInputText from './home-page/components/generic-input/GenericInput';
import UploadBtn from './home-page/upload-btn/UploadBtn';

interface ICanStart {
  isValidUpload: boolean;
  isValidPassingScore?: boolean;
  isValidTimer?: boolean;
}

function UploadBtnPassingScoreAndTimer():ReactElement {
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
      <Col className='mt-2'> <UploadBtn /> </Col>
      <Col> <GenericInputText config={passingScore} /> </Col>
      <Col> <GenericInputText config={timer}/> </Col>
    </Row>
  );
}

function ButtonStart(props:{iCanStart: ICanStart}):ReactElement {
  return (
    <Button className='play-btn' size='lg' disabled={(props.iCanStart.isValidUpload)? false: true}>
      <FontAwesomeIcon icon={faPlay as IconProp}/>
    </Button>
  );
}

export default function Body():ReactElement {
  const {t} = useTranslation();
  return (
    <Container>
      <Row className="mt-5 text-center">
        <h1>{t('title')}</h1>
      </Row>
      <Row className="mt-3 text-center">
        <h3 dangerouslySetInnerHTML={{__html: t('explain')}}></h3>
      </Row>
      <UploadBtnPassingScoreAndTimer />
      <div className='mt-5 text-center'>
        <ButtonStart iCanStart={{isValidUpload: false}}/>
      </div>
    </Container>
  );
}
