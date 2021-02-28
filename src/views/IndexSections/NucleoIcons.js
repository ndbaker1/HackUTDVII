/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Container, Row, Col, NavLink } from "reactstrap";

export default function NucleoIcons() {
  return (
    <div className="section section-nucleo-icons">
      <img
        alt="..."
        className="path"
        src={require("assets/img/path3.png").default}
      />
      <Container>
        <Row className="justify-content-center">
          <Col lg="8" md="12">
            <h2 className="title">Purpose</h2>
            <h4 className="description">
              Connect with those in your community by supporting those around you.
              You can lend a hand, seek support, or be a point of contact to help those in your community overcome any challenges they may be facing by
              providing any resources you have.
            </h4>
            <div className="btn-wrapper">
              <NavLink to="/register-page" tag={Link}>
                <Button
                  className="btn-round"
                  color="primary"
                  rel="noopener noreferrer"
                >
                  Start Now
              </Button>
              </NavLink>
            </div>
          </Col>
        </Row>
        <div className="blur-hover" style={{ paddingBottom: '50px' }}>
          <div className="icons-container blur-item on-screen mt-5" style={{ display: 'flex' }}>
            <img alt="outage roadmap" src={require('assets/img/outage_roadmap.png').default} style={{ margin: 'auto' }} />
          </div>
          <span className="blur-hidden" style={{ color: 'black', maxWidth: '400px', fontSize: '1.2rem', textAlign: 'center' }}>
            Over 5 million Texas citizens struggled without power during the February 2021 Winter Snowstorm
            </span>
        </div>
      </Container>
    </div>
  );
}
