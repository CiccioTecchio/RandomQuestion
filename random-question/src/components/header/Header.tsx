import "./Header.scss";
import { useTranslation } from 'react-i18next';
import { Row } from "react-bootstrap";

export default function Header(){
  const { t } = useTranslation();
  return (
    <Row className="header">
      <h1 className="text-center">{t('title')}</h1>
    </Row>
  )
}