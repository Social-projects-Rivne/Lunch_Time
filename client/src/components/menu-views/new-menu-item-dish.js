import React, { Component } from 'react';
import {
  Button, ButtonToolbar, Col, Container, Dropdown, Form, Image,
} from 'react-bootstrap';
import '../../styles/new-menu-item-dish.css';
import PropTypes from 'prop-types';
import Api from '../../services/api';
import View from '../shared/dropdown/view';
import AlertBase from '../shared/alert-base';

class NewMenuItemDish extends Component {
  // eslint-disable no-param-reassign
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: 'Pizza',
      selectedCategoryId: 1,

      units: ['pcs', 'gram', 'L', 'ml'],
      selectedPortionSize: 'pcs',
      portionSize: 1,

      portionPrice: 1,

      image: '/img/dish-default.png',
      dish: { categoryFood: { id: 0 } },
      isShowAlert: false,
      errors: { err: 'Please fill all fields! ' },
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
    this.setState({ image: file });
  }

  onSelectClick() {
    this.fileInputRef.current.click();
  }

  onAddClick() {
    const {
      dish, name, ingredients, selectedCategoryId, errors,
    } = this.state;

    if (!this.validateForm(errors)) {
      this.setAlertState(true);
    } else {
      dish.name = name;
      dish.ingredients = ingredients;
      dish.categoryFood.id = selectedCategoryId;

      this.sendData(dish);
    }
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

  setAlertState(showAlert) {
    this.setState({
      isShowAlert: showAlert,
    });
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach(
      (val) => { if (val.length > 0) valid = false; },
    );
    return valid;
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { errors } = this.state;
    switch (name) {
      case 'ingredients':
        errors.ingredients = value.length > 2 ? '' : 'Ingredients field must be at least 3 characters! ';
        break;
      case 'name':
        errors.name = value.length > 1 ? '' : 'Dish name must be at least 2 characters! ';
        break;
      case 'portionPrice':
        errors.price = value >= 0 ? '' : 'The price cannot be negative! ';
        errors.price += value.length > 0 ? '' : 'The Portion price field cannot be empty! ';
        break;
      case 'portionSize':
        errors.size = value > 0 ? '' : 'The size cannot be negative or empty! ';
        break;
      default:
        break;
    }
    errors.err = this.checkIfEmptyFields();
    this.setState({
      errors,
      [name]: value,
      isShowAlert: false,
    });
  }

  checkIfEmptyFields() {
    const { name, ingredients } = this.state;
    if (name === undefined || name.length === 0 || ingredients === undefined || ingredients.length === 0) {
      return 'Not all fields are filled! ';
    }
    return '';
  }

  sendData(dish) {
    /* eslint-disable no-param-reassign */
    const { match } = this.props;
    const { portionPrice, portionSize, selectedPortionSize } = this.state;
    Api.post('dish', dish)
      .then((r) => {
        if (r.error === null) {
          const menuItemDish = {};
          menuItemDish.dish = { id: r.data.id };
          menuItemDish.restaurant = { id: match.params.id };
          menuItemDish.portionPrice = portionPrice;
          menuItemDish.portionSize = `${portionSize} ${selectedPortionSize}`;
          menuItemDish.currency = 'UAN';
          Api.post('menuitemdish', menuItemDish).then((response) => {
            if (response.error === null) {
              this.props.history.goBack();
            }
          });
        }
      });
    /* eslint-enable no-param-reassign */
  }

  render() {
    const {
      categories, units, selectedCategory, selectedPortionSize,
      image, isShowAlert, errors, portionPrice, portionSize,
    } = this.state;
    return (
      <Container fluid className="new-menu-item-container">
        <h5>
          Add a new dish
        </h5>
        <AlertBase
          show={isShowAlert}
          type="danger"
          title={Object.values(errors).join('')}
        />
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
                name="portionSize"
                value={portionSize}
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
                name="portionPrice"
                value={portionPrice}
                onChange={(e) => this.handleChange(e)}
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
  match: PropTypes.object.isRequired,
};

export default NewMenuItemDish;
