import React, { Component } from 'react';
import {
  Button, ButtonToolbar, Col, Container, Dropdown, Form, Image,
} from 'react-bootstrap';
import '../../styles/new-menu-item-dish.css';
import PropTypes from 'prop-types';
import Api from '../../services/api';

class NewMenuItemDish extends Component {
  constructor(props) {
    super(props);
    this.path = '/new-dish';
    this.state = {
      categories: [],
      selectedCategory: 'All categories',
    };
  }

  componentDidMount() {
    this.getCategories('category');
  }

  getCategories(path) {
    Api.get(path)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.setState({
          categories: response.data.content,
        });
      });
  }

  render() {
    const { categories, selectedCategory } = this.state;
    return (
      <Container fluid className="new-menu-item-container">
        <h5>
          Add a new dish
        </h5>

        <Form.Group>
          <Form.Label>Select category: </Form.Label>
          <br />
          <Dropdown onSelect={(e) => { this.setState({ selectedCategory: e }); }}>
            <Dropdown.Toggle>{selectedCategory}</Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((category) => (
                <Dropdown.Item
                  eventKey={category.name}
                  key={category.id}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
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
