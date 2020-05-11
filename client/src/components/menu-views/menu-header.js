import React, { Component } from 'react';
import {
  Container, Row,
  Dropdown, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Api from '../../services/api';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      dropdownName: 'All categories',
    };
  }

  componentDidMount() {
    this.getCategories('category');
  }

  onHandleClick(path, categoryName) {
    this.props.onChange(path);
    this.setState({
      dropdownName: categoryName,
    });
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
    const { categories, dropdownName } = this.state;
    return (
      <Container>
        <br />
        <Row>
          <Col className="header-item" xs={2}>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                className="drop-down"
              >
                {dropdownName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="0"
                  onClick={() => this.onHandleClick('menuitemdish/restaurantId?', 'All categories')}
                >
                  All categories
                </Dropdown.Item>
                {categories.map((category) => {
                  return (
                    <Dropdown.Item
                      key={category.id}
                      onClick={() => this.onHandleClick(`menuitemdish/category?name=${category.name}&`, category.name)}
                    >
                      {category.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className="header-item" xs={3}>
            Dish
            <br />
            (Ingredients)
          </Col>
          <Col className="header-item" xs={2}>
            Image
          </Col>
          <Col className="header-item">
            Portion size
          </Col>
          <Col className="header-item">
            Portion price
          </Col>
          <Col className="header-item">
            Add to Order
          </Col>
        </Row>
        <hr className="menu-item" />
      </Container>
    );
  }
}

Header.propTypes = {
  onChange: PropTypes.any.isRequired,
};
export default Header;
