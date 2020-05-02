import React, { Component } from 'react';
import {
  Button, ButtonToolbar, Col, Container, Dropdown, Form, Image,
} from 'react-bootstrap';
import '../../styles/new-menu-item-dish.css';
import PropTypes from 'prop-types';
import Api from '../../services/api';
import View from '../shared/dropdown/view';

class NewMenuItemDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: 'Pizza',
      selectedCategoryId: 0,

      units: ['gram', 'pcs', 'L', 'ml'],
      selectedPortionSize: 'gram',

      image: '/img/dish-default.png',

      dish: {
        categoryfood: { id: 0 },
      },
    };
    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    this.getCategories('category');
  }

  onFileSelect(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    const imageTag = document.getElementById('dishImage');

    reader.onload = function (event) {
      imageTag.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  onSelectClick() {
    this.fileInputRef.current.click();
  }

  onAddClick() {
    const { name, ingredients, selectedCategoryId } = this.state;
    const { dish } = this.state;

    dish.name = name;
    dish.ingredients = ingredients;
    dish.categoryfood.id = selectedCategoryId;

    Api.post('dish', dish)
      .then((r) => {
        if (r.error === null) {
          console.log('sended');
        }
      });
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

  handleChange(e) {
    const { name, value } = e.target;
    console.log(`name=${name}val=${value}`);
    switch (name) {
      case 'ingredients':

        break;
      case 'name':

        break;
      case 'password':

        break;
      default:
        break;
    }
    this.setState({
      [name]: value,
    });
  }

  saveState(name, value) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      categories, units, selectedCategory, selectedPortionSize,
      image,
    } = this.state;
    return (
      <Container fluid className="new-menu-item-container">
        <h5>
          Add a new dish
        </h5>
        <Form.Group>
          <Form.Label>Select category: </Form.Label>
          <br />
          <Dropdown>
            <Dropdown.Toggle>{selectedCategory}</Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((category) => (
                <Dropdown.Item
                  onSelect={(e) => { this.setState({ selectedCategory: e, selectedCategoryId: category.id }); }}
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
          <Form.Label>Dish name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Please enter the dish name"
            onChange={(e) => this.handleChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Ingredients: (e.g.: chicken, ham, cheese)</Form.Label>
          <Form.Control
            type="text"
            name="ingredients"
            placeholder="Please enter the ingredient list"
            onChange={(e) => this.handleChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Portion size: </Form.Label>
          <Form.Row>
            <Col>
              <Form.Control
                type="number"
                placeholder="Please enter portion size"
                name="size"
                onChange={(e) => this.handleChange(e)}
              />
            </Col>
            <Col>
              <View
                className="portion-size"
                id="portion-size"
                name={selectedPortionSize}
                values={units}
                onSelect={(e) => { this.setState({ selectedPortionSize: e }); }}
              />
            </Col>
          </Form.Row>
        </Form.Group>

        <Form.Group>
          <Form.Label>Portion price: </Form.Label>
          <Form.Row>
            <Col>
              <Form.Control
                type="number"
                name="price"
                placeholder="Price"
              />
            </Col>
            <Col className="col">
              <span className="">UAN</span>
            </Col>
          </Form.Row>
        </Form.Group>

        <Form.Group>
          <Button onClick={() => this.onSelectClick()}>Select dish photo</Button>
          <br />
          <Image roundedCircle className="img mt-3" id="dishImage" src={image} />
        </Form.Group>

        <input
          ref={this.fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          hidden
          onChange={(e) => this.onFileSelect(e)}
        />

        <ButtonToolbar className="mb-5">
          <Button
            disabled={false}
            className="mr-3 m-button"
            onClick={() => this.onAddClick()}
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
