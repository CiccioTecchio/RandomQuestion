import React from 'react';
import './Header.scss';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-bootstrap';
import { LANG_IT, LANG_EN } from '../../Constant';

export default function Header() {
  const { t, i18n } = useTranslation();
  return (
    <Row className="header">
      <Col className="mt-1" md={10}>
        <h3 className="text-left">{t('title')}</h3>
      </Col>
      <Col className="mt-1" md={1}>
        <h2>
          <span className="flag" onClick={() => i18n.changeLanguage(LANG_IT)}>🇮🇹</span>
        </h2>
      </Col>
      <Col className="mt-1" md={1}>
        <h2>
          <span className="flag" onClick={() => i18n.changeLanguage(LANG_EN)}>🇬🇧</span>
        </h2>
      </Col>
    </Row>
  );
}
