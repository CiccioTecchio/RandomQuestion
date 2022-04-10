import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from "react-bootstrap";
import "./Footer.scss";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin, faStackOverflow } from '@fortawesome/free-brands-svg-icons';

interface IFooterLink{
  id:string;
  link:string;
  icon:IconProp;
}

export default function Footer(){
  const listOfLink:Array<IFooterLink> = [
    {id:"github", link: 'https://github.com/CiccioTecchio', icon: faGithub as IconProp},
    {id:"linkedin", link: 'https://www.linkedin.com/in/francesco-vicidomini/', icon: faLinkedin as IconProp},
    {id:"stackoverflow", link: 'https://stackoverflow.com/users/4374986/francesco-vicidomini', icon: faStackOverflow as IconProp}
  ];
  
  let liList = listOfLink.map((link: IFooterLink) => {
  return <li key={link.id} className="list-inline-item">
    <a href={link.link} className="btn btn-social" target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={link.icon} size="lg"/>
    </a>
  </li>
  });

  return (
      <Row className="text-center footer">
        <Col>
          <ul className="list-inline mb-0">{liList}</ul>
          <p>© Francesco Vicidomini</p>
        </Col>
      </Row>
  )
}