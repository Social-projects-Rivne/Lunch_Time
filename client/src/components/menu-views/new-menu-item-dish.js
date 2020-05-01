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
    this.state = {
      categories: [],
      units: [{ id: 0, name: 'gram' }, { id: 1, name: 'pcs' }, { id: 2, name: 'l' }, { id: 3, name: 'ml' }],

      selectedCategory: 'Pizza',
      selectedPortionSize: 'gram',
    };
  }

  componentDidMount() {
    this.getCategories('category');
  }

  getCategories(path) {
    Api.get(path)
      .then((response) => {
        if (response.error == null) {
          this.setState({
            categories: response.data.content,
          });
        }
      });
  }

  render() {
    const {
      categories, units, selectedCategory, selectedPortionSize,
    } = this.state;
    console.log(categories);
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
          <Form.Control type="text" placeholder="Please enter the ingredient list" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Portion size: </Form.Label>
          <Form.Row>
            <Col>
              <Form.Control placeholder="Please enter portion size" />
            </Col>
            <Col>
              <Dropdown onSelect={(e) => { this.setState({ selectedPortionSize: e }); }}>
                <Dropdown.Toggle>{selectedPortionSize}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {units.map((category) => (
                    <Dropdown.Item
                      eventKey={category.name}
                      key={category.id}
                    >
                      {category.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Form.Row>
        </Form.Group>

        <Form.Group>
          <Form.Label>Portion price: </Form.Label>
          <Form.Row>
            <Col>
              <Form.Control placeholder="Price" />
            </Col>
            <Col className="col">
              <span className="">UAN</span>
            </Col>
          </Form.Row>
        </Form.Group>

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
