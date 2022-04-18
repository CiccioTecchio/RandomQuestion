import React, { ReactElement } from 'react';
import { Row } from 'react-bootstrap';
import './Timer.scss';

export default function Timer(props:{minutes:number, seconds:number}):ReactElement {
  const additionalZero = (num:number) => (num < 10)?`0${num}`:num;
  return (
    <Row className="text-center mt-3">
      <h3>{`${additionalZero(props.minutes)} : ${additionalZero(props.seconds)}`}</h3>
    </Row>
  );
}
