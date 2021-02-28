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
import { useEffect, useState } from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

// import { getLendersWithItems } from "../../db/db_functions"

let ps = null;


export default function ProfilePage() {

  const [availableLenders, setAvailableLenders] = useState([])
  const [lendingItems, setLendingItems] = useState([])
  const [requestedItems, setRequestedItems] = useState([])
  const [tabs, setTabs] = useState(1)

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  }, []);

  function callRoachDB(requestedItems) {
    fetch('//' + window.location.hostname + ':8000/findLenders', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestedItems) // body data type must match "Content-Type" header)
    }).then(res => res.json())
      .then(response => setAvailableLenders(response))
  }


  function ItemList(props) {
    return props.items.map((item) => <tr>
      <td>
        {item}
      </td>
      <td width="30px" height="30px" onClick={() => {
        const newItems = props.items.filter(_item => _item !== item)
        props.itemWatcher ? props.itemWatcher(newItems) : (() => { })()
        props.setItems(newItems)
      }} style={{ cursor: 'pointer' }}>
        <i aria-hidden={true} className="tim-icons icon-simple-remove" />
      </td>
    </tr>
    )
  }

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("assets/img/dots.png").default}
          />
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png").default}
          />
          <Container className="align-items-center">
            <Row>
              <Col className="ml-auto mr-auto">
                <Card className="card-coin card-plain">
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({ active: tabs === 1 })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#pablo"
                        >
                          Requests
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: tabs === 2 })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#pablo"
                        >
                          Lendings
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: tabs === 3 })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#pablo"
                        >
                          Available Lenders
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent className="tab-subcategories" activeTab={"tab" + tabs} >
                      <TabPane tabId="tab1">
                        <Input onKeyDown={(event) => {
                          if (event.key === 'Enter' && event.target.value.length > 0 && requestedItems.indexOf(event.target.value) === -1) {
                            const newRequested = [...requestedItems, event.target.value]
                            callRoachDB(newRequested)
                            setRequestedItems(newRequested)
                            event.target.value = ''
                          }
                        }} ></Input>
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">ITEM</th>
                            </tr>
                          </thead>
                          <tbody>
                            < ItemList items={requestedItems} setItems={setRequestedItems} itemWatcher={callRoachDB} />
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Input onKeyDown={(event) => {
                          if (event.key === 'Enter' && event.target.value.length > 0 && lendingItems.indexOf(event.target.value) === -1) {
                            setLendingItems([...lendingItems, event.target.value])
                            event.target.value = ''
                          }
                        }} ></Input>
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">ITEM</th>
                            </tr>
                          </thead>
                          <tbody>
                            < ItemList items={lendingItems} setItems={setLendingItems} />
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">USERNAME</th>
                              <th className="header">LOCATION</th>
                              <th className="header">ITEM</th>
                            </tr>
                          </thead>
                          <tbody>
                            {availableLenders.map((lendingResponse) => <tr>
                              <td>
                                {lendingResponse.username}
                              </td>
                              <td>
                                {lendingResponse.location}
                              </td>
                              <td>
                                {lendingResponse.item}
                              </td>
                            </tr>)}
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <section className="section">
          <Container>
            <Row>
              <Col md="6" className="ml-auto mr-auto">
                <h1 className="profile-title text-center">Contact</h1>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section">
          <Container>
            <Row>
              <Col md="6" className="ml-auto mr-auto">
                <Card className="card-plain">
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Your Name</label>
                            <Input placeholder="John Smith" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Email address</label>
                            <Input placeholder="mike@email.com" type="email" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Phone</label>
                            <Input placeholder="123-456-7890" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Resource(s) Needed</label>
                            <Input placeholder="e.g. Fresh Vegetables, etc." type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Message</label>
                            <Input placeholder="Hello there! Would you happen to have blankets?" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="button"
                      >
                        Send Message
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="right"
                        target="tooltip341148792"
                      >
                        Can't wait for your message
                      </UncontrolledTooltip>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    </>
  )
}

