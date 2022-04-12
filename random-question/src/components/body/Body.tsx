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

function uploadBtn():ReactElement {
  const [t] = useTranslation();
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

function setTimerBtn():ReactElement {
  const [t] = useTranslation();
  return (
    <Button>{t('set.timer')}</Button>
  );
}

function validateInputTimer(value:string):StatusValidation {
  let classToAppend: StatusValidation = StatusValidation.Empty;
  const regExp = new RegExp(/^[1-9]\d{0,1}$/);
  if (value === '') classToAppend = StatusValidation.Empty;
  else {
    if (regExp.test(value)) classToAppend = StatusValidation.Valid;
    else classToAppend = StatusValidation.Invalid;
  }
  return classToAppend;
}

function passingScoreInput():ReactElement {
  const [passingScore, setPassingScore] = useState('');
  const [t] = useTranslation();
  return (
    <Form>
      <Form.Group controlId='passingScoreControl'>
        <InputGroup>
          <input className={`form-control ${validateInputTimer(passingScore)}`} type={'text'} inputMode='decimal'
            placeholder={t('label.passing.score')} min={1} max={999} pattern="^[1-9]\d{0,1}$" onInput={(event)=>{
              event.currentTarget.value = event.currentTarget.value.replace(/\D/, '');
              setPassingScore(event.currentTarget.value);
            } } />
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      </Form.Group>
    </Form>
  );
}

function uploadBtnPassingScoreAndTimer():ReactElement {
  return (
    <Row className="mt-5 text-center">
      <Col> {uploadBtn()} </Col>
      <Col> {passingScoreInput()} </Col>
      <Col> {setTimerBtn()} </Col>
    </Row>
  );
}

export default function Body() {
  const {t} = useTranslation();
  return (
    <Container>
      <Row className="mt-5 text-center">
        <h1>{t('title')}</h1>
      </Row>
      <Row className="mt-3 text-center">
        <h3>{t('explain')}</h3>
      </Row>
      {uploadBtnPassingScoreAndTimer()}
      <div className='mt-5 text-center'>
        <Button className='play-btn' size='lg' disabled>
          <FontAwesomeIcon icon={faPlay as IconProp}/>
        </Button>
      </div>
    </Container>
  );
}
