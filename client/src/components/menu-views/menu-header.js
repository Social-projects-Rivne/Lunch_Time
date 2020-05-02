import React, { Component } from 'react';
import {
  Container, Row,
  Dropdown, Col, ButtonToolbar, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Api from '../../services/api';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isEdit: false,
    };
  }

  componentDidMount() {
    this.getCategories('category');
  }

  onEditClick() {
    this.setState((currentState) => ({ isEdit: !currentState.isEdit }));
    this.props.isEdit(this.state.isEdit);
  }

  onHandleClick(path) {
    this.props.onChange(path);
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
    const { categories } = this.state;
    const { id } = this.props;
    return (
      <Container>
        <br />
        <ButtonToolbar className="justify-content-center">
          <Button
            className="ml-3 mb-1"
            onClick={() => this.onEditClick()}
          >
            {!this.state.isEdit ? 'Edit Menu' : 'Close'}
          </Button>
          {this.state.isEdit && (
            <Link to={{ pathname: `/restaurants/${id}/new-dish` }}>
              <span className="d-inline-block ml-2">
                <Button>Add a new dish</Button>
              </span>
            </Link>
          )}
        </ButtonToolbar>
        <Row>
          <Col className="header-item">
            <Dropdown>
              <Dropdown.Toggle
                variant="info"
                id="dropdown-basic"
                className="drop-down"
              >
                All categories
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="0"
                  onClick={() => this.onHandleClick('menuitemdish/restaurantId?')}
                >
                  All categories
                </Dropdown.Item>
                {categories.map((category) => {
                  return (
                    <Dropdown.Item
                      key={category.id}
                      onClick={() => this.onHandleClick(`menuitemdish/category?name=${category.name}&`)}
                    >
                      {category.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className="header-item">
            Dish
            <br />
            (Ingredients)
          </Col>
          <Col className="header-item">
            Image
          </Col>
          <Col className="header-item">
            Portion size
          </Col>
          <Col className="header-item">
            Portion price
          </Col>
          {!this.state.isEdit ? (
            <Col className="header-item">
              Add to Order
            </Col>
          ) : (
            <Col className="header-item">
              Delete item
            </Col>
          )}
        </Row>
        <hr className="menu-item" />
      </Container>
    );
  }
}

Header.propTypes = {
  onChange: PropTypes.any.isRequired,
  isEdit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
export default Header;
