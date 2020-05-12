import React, { Component } from 'react';
import {
  Button, ButtonToolbar, Col, Container, Dropdown, Form, Image,
} from 'react-bootstrap';
import '../../styles/new-menu-item-dish.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';
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
      portionPrice: 1.00,
      dish: { categoryFood: { id: 0 } },
      image: null,
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

    Resizer.imageFileResizer(
      file, 300, 300, 'JPEG', 100, 0,
      (uri) => {
        this.setState({ image: uri });
      },
      'blob',
    );

    // eslint-disable-next-line func-names
    reader.onload = function (event) {
      imageTag.src = event.target.result;
    };
    reader.readAsDataURL(file);
    this.setState({ image: file });
  }

  onSelectClick() {
    this.fileInputRef.current.click();
  }

  onCancelClick() {
    this.props.selectedTab('menu');
    this.props.history.goBack();
  }

  onAddClick() {
    const {
      dish, dishName, ingredients, selectedCategoryId, errors,
    } = this.state;

    if (!this.validateForm(errors)) {
      this.setAlertState(true);
    } else {
      dish.name = dishName;
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
    const { errors, dishName, ingredients } = this.state;
    errors.err = '';
    switch (name) {
      case 'ingredients':
        errors.ingredients = (value.length > 2 && value.length < 256)
          ? '' : 'Ingredients field must be 3-255 characters long! ';
        errors.err = this.checkIfEmptyFields(dishName, value);
        break;
      case 'dishName':
        errors.name = (value.length > 0 && value.length < 31) ? '' : 'Dish name must be 1-30 characters! ';
        errors.err = this.checkIfEmptyFields(value, ingredients);
        break;
      case 'portionPrice':
        errors.price = value > 0 ? '' : 'The price cannot be negative or zero! ';
        errors.price += value < 10000000 ? '' : 'The Portion price is too high! ';
        errors.price += /^[0-9]{0,6}.?[0-9]{0,2}$/.test(value)
          ? '' : 'The price must be a maximum of two decimal places';
        errors.err = this.checkIfEmptyFields(dishName, ingredients);
        break;
      case 'portionSize':
        errors.size = value > 0 ? '' : 'The portion size cannot be negative or empty! ';
        errors.size += value.length < 17 ? '' : 'The portion size value is to high ';
        break;
      default:
        break;
    }
    this.setState({
      errors,
      [name]: value,
      isShowAlert: false,
    });
  }

  checkIfEmptyFields(name, ingredients) {
    if (name === undefined || name.length === 0 || ingredients === undefined || ingredients.length === 0) {
      return 'Not all fields are filled! ';
    }
    return '';
  }

  sendData(dish) {
    /* eslint-disable no-param-reassign */
    const { match } = this.props;
    const {
      portionPrice, portionSize, selectedPortionSize, image, errors,
    } = this.state;
    Api.post('dish', dish)
      .then((r) => {
        if (r.error === null) {
          const imgFileName = `${r.data.id}.jpg`;
          const menuItemDish = {};
          menuItemDish.dish = { id: r.data.id };
          menuItemDish.restaurant = { id: match.params.id };
          menuItemDish.portionPrice = portionPrice;
          menuItemDish.portionSize = `${portionSize} ${selectedPortionSize}`;
          menuItemDish.currency = 'UAN';
          if (image != null) {
            menuItemDish.imageUrl = imgFileName;
          }
          Api.post('menuitemdish', menuItemDish).then((response) => {
            if (response.error === null && image != null) {
              this.sendImage(imgFileName);
            } else {
              this.props.selectedTab('menu');
              this.props.history.goBack();
            }
          });
        } else {
          errors.err += 'Server Error, please try again later! ';
          this.setState({
            errors,
            isShowAlert: true,
          });
        }
      });
    /* eslint-enable no-param-reassign */
  }

  sendImage(fileName) {
    const { image } = this.state;
    const formData = new FormData();
    formData.append('file', image, fileName);
    Api.post('/image/upload/dishes', formData)
      .then((response) => {
        if (response.error == null) {
          this.props.selectedTab('menu');
          this.props.history.goBack();
        }
      });
  }

  render() {
    const {
      categories, units, selectedCategory, selectedPortionSize, isShowAlert, errors, portionPrice, portionSize,
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
            name="dishName"
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
            <Col className="currency">
              <span className="">UAN</span>
            </Col>
          </Form.Row>
        </Form.Group>

        <Form.Group>
          <Button onClick={() => this.onSelectClick()}>Select dish photo</Button>
          <br />
          <Image roundedCircle className="img mt-3" id="dishImage" src="/img/dish-default.png" />
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
          <Button variant="danger" className="mr-3" onClick={() => this.onCancelClick()}>Cancel</Button>
        </ButtonToolbar>

      </Container>
    );
  }
}

NewMenuItemDish.propTypes = {
  history: PropTypes.any.isRequired,
  match: PropTypes.object.isRequired,
  selectedTab: PropTypes.func.isRequired,
};

export default withRouter(NewMenuItemDish);
