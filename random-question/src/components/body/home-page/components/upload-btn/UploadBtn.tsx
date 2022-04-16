import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useRef, useState } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IUploadedFile, IValidFormQuestion } from '../../Interfaces';
import './UploadBtn';
import validatorQuestionJSON from './validatorQuestion';

function ModalWrongFile(props:{showModal:boolean, msgAlert:string, onChangeShow:Function}):ReactElement {
  const {t} = useTranslation();
  const [show, setShow] = useState(props.showModal);

  const handleClose = () => {
    setShow(false);
    props.onChangeShow(show);
  };

  const handleShow = () => {
    setShow(true);
    props.onChangeShow(show);
  };

  return (
    <Modal show={props.showModal} onHide={handleShow}>
      <Modal.Header>
        <Modal.Title>{t('error.wrong.format.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant='danger'>
          <span dangerouslySetInnerHTML={{__html: props.msgAlert}}></span>
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function UploadBtn(props:{onValidationUpload:Function}):ReactElement {
  const {t} = useTranslation();
  const [uploadedFile, setUploadFile] = useState<IUploadedFile>({
    name: '',
    contentFile: {},
    showAlert: false,
    msgAlert: ''
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => inputRef.current?.click();

  const handleChangeShow = (change:boolean) => setUploadFile({name: uploadedFile.name, contentFile: uploadedFile.contentFile, showAlert: change, msgAlert: uploadedFile.msgAlert});

  function invalidUploadFile(msgAlert: string):void {
    setUploadFile({name: '', contentFile: {}, showAlert: true, msgAlert: msgAlert});
    props.onValidationUpload(false);
  }

  const handleShowFile = () =>{
    if (inputRef.current?.files && inputRef.current?.files[0].name.endsWith('.json')) {
      const file:File = inputRef.current.files[0];
      const nameFile = file.name;
      const reader:FileReader = new FileReader();
      reader.onload = (event) =>{
        const res:any = event && event.target && event.target.result;
        try {
          const content = JSON.parse(res);
          const validator:IValidFormQuestion = validatorQuestionJSON(content);
          if (validator.isValid) {
            setUploadFile({name: nameFile, contentFile: content, showAlert: false, msgAlert: ''});
            props.onValidationUpload(true);
          } else {
            const msgErrorForAlet:string = (validator.idxWrongElement)?t('error.syntax.of.json.question', {i: validator.idxWrongElement}): t('error.json.is.not.array');
            invalidUploadFile(msgErrorForAlet);
          }
        } catch (error) {
          console.error(error);
          invalidUploadFile('error.wrong.syntax.json');
        }
      };
      reader.readAsText(file);
    } else invalidUploadFile('error.wrong.type.format.desciption');
  };

  return (
    <div>
      <label className='mx-3'>{t('upload.json')}</label>
      <input ref={inputRef} onChange={handleShowFile} className='d-none' type='file' />
      <Button variant={`outline-${uploadedFile.name?'success':'primary'}`} onClick={handleUpload}>
        <FontAwesomeIcon className='mr-5' icon={faFileArrowUp as IconProp} />
        <span>{uploadedFile.name ? uploadedFile.name : 'Upload'}</span>
      </Button>
      <ModalWrongFile showModal={uploadedFile.showAlert} msgAlert={t(uploadedFile.msgAlert)} onChangeShow = {handleChangeShow}/>
    </div>
  );
}
