import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useRef, useState } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IUploadedFile } from '../Interfaces';

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

export default function UploadBtn():ReactElement {
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
