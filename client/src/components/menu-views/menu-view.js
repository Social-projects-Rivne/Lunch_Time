import React, { Component } from 'react';
import {
  Container, Row, Spinner, ButtonToolbar,
} from 'react-bootstrap';
import Header from './menu-header';
import Dish from './dish';
import Api from '../../services/api';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuitemdishes: [],
      isFetching: false,
    };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    Api.getAll('menuitemdish')
      .then((response) => {
        if (response.error) {
          console.error(response);
          return;
        }
        this.setState({
          menuitemdishes: response.data,
          isFetching: true,
        });
      });
  }

  render() {
    const { menuitemdishes, isFetching } = this.state;
    return (

      <Container fluid className="menu">
        <Header />
        <Container>
          {isFetching ? (
            <Row className="rows">
              {menuitemdishes.map((menuitemdish) => (
                <Dish key={menuitemdish.id} menuitemdish={menuitemdish} isFetching={isFetching} />
              ))}
            </Row>
          ) : (
            <Container className="spinner-container">
              <ButtonToolbar className="justify-content-center">
                <Spinner animation="border" variant="warning" />
              </ButtonToolbar>
            </Container>
          )}
        </Container>
      </Container>

    );
  }
}

export default Menu;
