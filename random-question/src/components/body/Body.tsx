import React, { ReactElement, useState } from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faFileUpload, faPlay} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Container, Row, Col, Button, InputGroup, Form} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import './Body.scss';

// eslint-disable-next-line no-unused-vars
enum StatusValidation {
  // eslint-disable-next-line no-unused-vars
  Valid = 'is-valid',
  // eslint-disable-next-line no-unused-vars
  Invalid = 'is-invalid',
  // eslint-disable-next-line no-unused-vars
  Empty = ''
}

interface ICanStart {
  isValidUpload: boolean;
  isValidPassingScore?: boolean;
  isValidTimer?: boolean;
}

function UploadBtn():ReactElement {
  const {t} = useTranslation();
  return (
    <Button>
      <Row>
        <Col md={2}>
          <FontAwesomeIcon icon={faFileUpload as IconProp} size="lg"/>
        </Col>
        <Col md={10}>
          <label>{t('upload.json')}</label>
        </Col>
      </Row>
    </Button>
  );
}

function SetTimerBtn():ReactElement {
  const {t} = useTranslation();
  return (
    <Button>{t('set.timer')}</Button>
  );
}

function validateInputTimer(value:string):StatusValidation {
  let classToAppend: StatusValidation = StatusValidation.Empty;
  const regExp = new RegExp(/^[1-9]\d{0,2}$/);

  if (value === '') classToAppend = StatusValidation.Empty;
  else classToAppend = (regExp.test(value) && parseInt(value) <= 100)?StatusValidation.Valid:StatusValidation.Invalid;

  return classToAppend;
}

function PassingScoreInput():ReactElement {
  const [passingScore, setPassingScore] = useState('');
  const {t} = useTranslation();

  return (
    <Form>
      <Form.Group controlId='passingScoreControl'>
        <InputGroup>
          <input className={`form-control ${validateInputTimer(passingScore)}`} type={'text'} inputMode='decimal'
            placeholder={t('label.passing.score')} min={1} max={100} pattern="^[1-9]\d{0,2}$" onInput={(event)=>{
              event.currentTarget.value = event.currentTarget.value.replace(/\D/, '');
              setPassingScore(event.currentTarget.value);
            } }/>
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      </Form.Group>
    </Form>
  );
}

function UploadBtnPassingScoreAndTimer():ReactElement {
  return (
    <Row className="mt-5 text-center">
      <Col> <UploadBtn /> </Col>
      <Col> <PassingScoreInput /> </Col>
      <Col> <SetTimerBtn /> </Col>
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
        <h3>{t('explain')}</h3>
      </Row>
      <UploadBtnPassingScoreAndTimer />
      <div className='mt-5 text-center'>
        <ButtonStart iCanStart={{isValidUpload: false}}/>
      </div>
    </Container>
  );
}
