import React, { Component } from 'react';
import {
  Button, ButtonToolbar, Col, Container, Form, Image,
} from 'react-bootstrap';
import '../../styles/new-menu-item-dish.css';
import PropTypes from 'prop-types';

class NewMenuItemDish extends Component {
  constructor(props) {
    super(props);
    this.path = '/new-dish';
  }

  render() {
    return (
      <Container fluid className="new-menu-item-container">
        <h5>
          Add a new dish
        </h5>

        <Form.Group>
          <Form.Label>Select category: </Form.Label>
          <br />
          <Form.Control as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Ingredients: </Form.Label>
          <Form.Control type="text" placeholder="Normal text" />
          <br />
        </Form.Group>

        <Form.Row>
          <Col>
            <Form.Label>Portion size: </Form.Label>
            <Form.Control placeholder="Size" />
          </Col>
          <Col>
            <Form.Label>Portion price: </Form.Label>
            <Form.Control placeholder="Price" />
          </Col>
        </Form.Row>
        <br />

        <Form.Group>
          <Button>Select dish photo</Button>
          <br />
          <Image className="img mt-3" src="/img/like.png" />
        </Form.Group>

        <ButtonToolbar>
          <Button
            disabled
            className="mr-3 m-button"
            onClick={null}
          >
            Add
          </Button>
          <Button variant="danger" className="mr-3" onClick={this.props.history.goBack}>Cancel</Button>
        </ButtonToolbar>

      </Container>
    );
  }
}

NewMenuItemDish.propTypes = {
  history: PropTypes.any.isRequired,
};

export default NewMenuItemDish;
