import React, { ReactElement, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { IInputText } from '../../Interfaces';
import './GenericInput.scss';

// eslint-disable-next-line no-unused-vars
enum StatusValidation {
  // eslint-disable-next-line no-unused-vars
  Valid = 'is-valid',
  // eslint-disable-next-line no-unused-vars
  Invalid = 'is-invalid',
  // eslint-disable-next-line no-unused-vars
  Empty = ''
}


function validateInputNumber(value:string, regExp:RegExp, max:number):StatusValidation {
  let classToAppend: StatusValidation = StatusValidation.Empty;

  if (value === '') classToAppend = StatusValidation.Empty;
  else classToAppend = (regExp.test(value) && parseInt(value) <= max)?StatusValidation.Valid:StatusValidation.Invalid;

  return classToAppend;
}

export default function GenericInputText(props:{config:IInputText, isInputValid:Function, takeValue:Function}):ReactElement {
  const [value, setValue] = useState<string>('');
  const status:StatusValidation = validateInputNumber(value, props.config.regExp, props.config.max);
  return (
    <InputGroup className='mb-3'>
      <Form.Floating className='form-floating-group flex-grow-1'>
        <Form.Control id={props.config.id} className={status}
          placeholder={props.config.lang.label} type='text' min={props.config.min} max={props.config.max} pattern={props.config.patter}
          onInput = {(event) => {
            event.currentTarget.value = event.currentTarget.value.replace(/\D/, '');
            setValue(event.currentTarget.value);
            props.takeValue(parseInt(event.currentTarget.value));
          }} onKeyUp={() => {
            if (status === StatusValidation.Valid) props.isInputValid(true); else props.isInputValid(false);
          }}
        />
        <label htmlFor={props.config.id}>{props.config.lang.label}</label>
      </Form.Floating>
      <InputGroup.Text>{props.config.lang.span}</InputGroup.Text>
    </InputGroup>
  );
}
