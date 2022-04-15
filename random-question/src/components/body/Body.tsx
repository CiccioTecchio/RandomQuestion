import React, { ReactElement, useRef, useState } from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faFileArrowUp, faPlay} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Container, Row, Col, Button, Alert, Modal} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import './Body.scss';
import { IInputText } from './home-page/Interfaces';
import GenericInputText from './home-page/components/generic-input/GenericInput';

interface ICanStart {
  isValidUpload: boolean;
  isValidPassingScore?: boolean;
  isValidTimer?: boolean;
}

interface IUploadedFile{
  name: string;
  contentFile: any;
  showAlert: boolean;
}

function ModalWrongFile(props:{showModal:boolean, onChangeShow:Function}):ReactElement {
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
        <Modal.Title>{t('error.wrong.format')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant='danger'>
          <span dangerouslySetInnerHTML={{__html: t('error.wrong.format.desciption')}}></span>
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function UploadBtn():ReactElement {
  const {t} = useTranslation();
  const [uploadedFile, setUploadFile] = useState<IUploadedFile>({
    name: '',
    contentFile: {},
    showAlert: false,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => inputRef.current?.click();

  const handleChangeShow = (change:boolean) => setUploadFile({name: uploadedFile.name, contentFile: uploadedFile.contentFile, showAlert: change});

  const handleShowFile = () =>{
    if (inputRef.current?.files && inputRef.current?.files[0].name.endsWith('.json')) {
      const file:File = inputRef.current.files[0];
      const nameFile = file.name;
      const reader:FileReader = new FileReader();
      reader.onload = (event) =>{
        const res:any = event && event.target && event.target.result;
        setUploadFile({name: nameFile, contentFile: JSON.parse(res), showAlert: false});
      };
      reader.readAsText(file);
    } else {
      setUploadFile({name: '', contentFile: {}, showAlert: true});
    }
  };

  return (
    <div>
      <label className='mx-3'>{t('upload.json')}</label>
      <input ref={inputRef} onChange={handleShowFile} className='d-none' type='file' />
      <Button variant={`outline-${uploadedFile.name?'success':'primary'}`} onClick={handleUpload}>
        <FontAwesomeIcon className='mr-5' icon={faFileArrowUp as IconProp} />
        <span>{uploadedFile.name ? uploadedFile.name : 'Upload'}</span>
      </Button>
      <ModalWrongFile showModal={uploadedFile.showAlert} onChangeShow = {handleChangeShow}/>

    </div>
  );
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
