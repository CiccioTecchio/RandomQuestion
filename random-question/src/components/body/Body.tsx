import React from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faFileUpload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import './Body.scss';

function uploadBtn(uploadStr:string):any {
  return (
    <Button>
      <Row>
        <Col md={2}>
          <FontAwesomeIcon icon={faFileUpload as IconProp} size="lg"/>
        </Col>
        <Col md={10}>
          <label>{uploadStr}</label>
        </Col>
      </Row>
    </Button>
  );
}

function setTimerBtn(timerStr:string):any {
  return (
    <Button>{timerStr}</Button>
  );
}

function uploadBtnAndTimer(uploadStr:string, timerStr:string):any {
  return (
    <Row className="mt-3 text-center">
      <Col md={6}>
        {uploadBtn(uploadStr)}
      </Col>
      <Col md={6}>
        {setTimerBtn(timerStr)}
      </Col>
    </Row>
  );
}

export default function Body() {
  const {t} = useTranslation();

  return (
    <Container className="body-cmp">
      <Row className="mt-5 text-center">
        <h1>{t('title')}</h1>
      </Row>
      <Row className="mt-3 text-center">
        <h3>{t('explain')}</h3>
      </Row>
      {uploadBtnAndTimer(t('upload.json'), t('set.timer'))}
    </Container>
  );
}


