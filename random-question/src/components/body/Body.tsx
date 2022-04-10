import React from "react";
import { Row } from "react-bootstrap";
import "./Body.scss";

export default class Body extends React.Component{
  render(): React.ReactNode {
      return(
        <Row className="body-cmp">
          <p>Body</p>
        </Row>
      )
  }
}