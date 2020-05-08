import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import {
  Button, Form, Container, Alert, Row, Col,
} from 'react-bootstrap';
import Api from '../../services/api';
import '../../styles/new-order.css';
import Category from '../menu-views/category';
import Dish from '../menu-views/dish';
import Auth from '../../services/auth';

class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.timeInterval = 15;
    this.milliseconds = 60000;
    this.currentDate = new Date();
    this.path = '/new-order';
    this.personId = Auth.getPersonId();
    this.state = {
      startDate: this.timeFormatter(this.currentDate),
      finishDate: this.timeFormatter((new Date(this.currentDate.getTime() + this.timeInterval * this.milliseconds))),
      availableTables: [],
      table: null,
      visitors: 1,
      description: '',
      isBadRequestError: false,
      isLoginError: false,
    };
  }

  componentDidMount() {
    this.getAvailableTables();
  }

  getAvailableTables() {
    const { match } = this.props;
    const start = this.formatDateTime(this.state.startDate);
    const finish = this.formatDateTime(this.state.finishDate);
    Api.get(`tables/available?id=${match.params.id}&start=${start}&finish=${finish}`)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.setState({
          availableTables: response.data,
        });
      });
  }

  getTableCapacity(id) {
    const table = this.state.availableTables.find((t) => {
      return t.id === +id;
    });
    if (table) {
      return table.capacity;
    }
    return null;
  }

  getMaximumOfVisitors() {
    if (this.state.table) {
      return this.getTableCapacity(this.state.table);
    }
    return this.state.availableTables.length && this.state.availableTables[0].capacity;
  }

  saveOrder() {
    const { match, history } = this.props;
    let tableId;
    if (this.state.table) {
      tableId = this.state.table;
    } else if (this.state.availableTables.length) {
      tableId = this.state.availableTables[0].id;
    } else {
      return;
    }
    let orderedDishes = this.props.location.state.menuItemDishesMap;
    if (orderedDishes !== undefined) {
      const mapToObj = (m) => {
        return Array.from(m).reduce((obj, [key, value]) => {
          // eslint-disable-next-line no-param-reassign
          obj[key] = value;
          return obj;
        }, {});
      };
      orderedDishes = JSON.stringify(mapToObj(orderedDishes));
    } else {
      orderedDishes = null;
    }
    if (!this.personId) {
      this.setState({
        isLoginError: true,
      });
      return;
    }
    const order = {
      personId: this.personId,
      startTime: this.state.startDate.toUTCString(),
      finishTime: this.state.finishDate.toUTCString(),
      visitors: this.state.visitors,
      tableId: tableId,
      description: this.state.description,
      orderedDishes: orderedDishes,
    };

    Api.post('orders', order)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          this.setState({
            isBadRequestError: true,
          });
          return;
        }
        history.push(match.url.replace(this.path, ''));
      });
  }

  selectDateTime(label) {
    return (
      <DatePicker
        selected={this.state[label]}
        onChange={(date) => this.handleDateTimePicker(label, date)}
        showTimeSelect
        timeFormat="HH:mm"
        className="date-time-input"
        minDate={this.currentDate}
        timeIntervals={this.timeInterval}
        timeCaption="time"
        dateFormat="yyyy-MM-dd HH:mm"
      />
    );
  }

  timeFormatter(time) {
    if (time.getMinutes() % this.timeInterval) {
      const intervalCount = time.getMinutes() / this.timeInterval;
      const formattedMinutes = (intervalCount - (intervalCount % 1) + 1) * this.timeInterval;
      time.setMinutes(formattedMinutes);
    }
    return time;
  }

  handleDateTimePicker(label, date) {
    this.setState({
      [label]: date,
    }, () => {
      this.getAvailableTables();
    });
  }

  handleFormControl(data) {
    this.setState({
      [data.target.name]: data.target.value,
    });
  }

  formatDateTime(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  }

  isDateTimesInvalid() {
    return this.state.startDate >= this.state.finishDate;
  }

  showAlert(message, variant = 'danger', dismissible = false) {
    if (dismissible) {
      return (
        <Alert
          variant={variant}
          dismissible={dismissible}
          onClose={() => { this.setState({ isBadRequestError: false }); }}
        >
          {message}
        </Alert>
      );
    }
    return (
      <Alert variant={variant}>
        {message}
      </Alert>
    );
  }

  render() {
    const { history, location } = this.props;
    if (location && !location.state) {
      this.props.history.push('/');
      return null;
    }
    const { totalPrice, menuItemDishesMap, orderedDishes } = this.props.location.state;
    return (
      <Container fluid className="new-order-container">
        <h5>
          Make new order in
          {' '}
          {location.state.restaurantName}
        </h5>
        <Form name="orderForm">
          <Form.Group>
            <Form.Label>Start time:</Form.Label>
            <br />
            {this.selectDateTime('startDate')}
          </Form.Group>
          <Form.Group>
            <Form.Label>Finish time: </Form.Label>
            <br />
            {this.isDateTimesInvalid() ? this.showAlert('Finish time should be more than Start time!') : null}
            {this.selectDateTime('finishDate')}
          </Form.Group>
          <Form.Group>
            <Form.Label>Available tables</Form.Label>
            {!this.state.availableTables.length ? this.showAlert('There are not available tables', 'warning') : null}
            <Form.Control
              as="select"
              defaultValue={this.state.availableTables.length ? this.state.availableTables[0] : null}
              name="table"
              onChange={(event) => this.handleFormControl(event)}
            >
              {this.state.availableTables
                .sort((first, second) => {
                  if (first.number < second.number) {
                    return -1;
                  }
                  return 1;
                })
                .map((table) => {
                  return (
                    <option key={table.id} value={table.id}>
                      Table №
                      {table.number}
                      {' '}
                      Maximum number of visitors:
                      {' '}
                      {table.capacity}
                    </option>
                  );
                })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Number of visitors</Form.Label>
            { this.state.availableTables.length && this.state.visitors > this.getMaximumOfVisitors()
              ? this.showAlert('Number of visitors shouldn\'t be more than maximum number of visitors!') : null}
            <Form.Control
              type="number"
              name="visitors"
              defaultValue={this.state.visitors}
              onChange={(event) => this.handleFormControl(event)}
              placeholder="Number of visitors"
              min="1"
              max={this.getMaximumOfVisitors()}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="description"
              placeholder="Write any comments to order"
              maxLength="999"
              onChange={(event) => this.handleFormControl(event)}
            />
          </Form.Group>
        </Form>
        {orderedDishes && orderedDishes.length > 0 && (
          <h2 style={{ jystify: 'center' }}>Ordered dishes:</h2>
        )}
        {orderedDishes && orderedDishes.length > 0 && (
          <Container>
            <hr className="menu-item" />
            {Array.from(new Set(orderedDishes)).map((menuItemDish) => {
              const quantity = menuItemDishesMap.get(menuItemDish.id);
              const addMessage = quantity ? 'Q:' : 'Add';
              return (
                <Row key={menuItemDish.id}>
                  <Col>
                    <Category category={menuItemDish.dish.categoryFood} />
                  </Col>
                  <Col>
                    <Dish dish={menuItemDish} mainMenu={false} />
                  </Col>
                  <Col className="col-item">
                    <br />
                    {menuItemDish.portionPrice}
                    {' '}
                    {'  '}
                    {menuItemDish.currency}
                  </Col>
                  <Col className="col-item">
                    <br />
                    {quantity > 0 && (
                      <button
                        style={{ marginRight: 2 }}
                        type="button"
                        className="btn btn-danger"
                        id="minus"
                        onClick={() => {
                          this.sendMenuItemDishToOrderList(menuItemDish, '-');
                        }}
                      >
                        -
                      </button>
                    )}
                    <Button
                      variant="primary"
                      onClick={() => {
                        if (quantity === undefined || quantity === 0) {
                          this.sendMenuItemDishToOrderList(menuItemDish);
                        }
                      }}
                    >
                      {addMessage}
                      {' '}
                      {quantity > 0 ? quantity : ''}
                    </Button>
                    {quantity > 0
                    && (
                      <button
                        style={{ marginLeft: 2 }}
                        type="button"
                        className="btn btn-success"
                        id="plus"
                        onClick={() => {
                          this.sendMenuItemDishToOrderList(menuItemDish, '+');
                        }}
                      >
                        +
                      </button>
                    )}
                  </Col>
                </Row>
              );
            })}
            <hr className="menu-item" />
            <h2 style={{ jystify: 'center', fontSize: 25 }}>
              TOTAL
              {' '}
              price:
              {' '}
              {totalPrice}
              {' '}
              UAH
            </h2>
          </Container>
        )}
        {
          this.state.isBadRequestError
            ? this.showAlert('Something went wrong. Try again later', 'danger', true)
            : null
        }
        {
          this.state.isLoginError
            ? this.showAlert('You should login first', 'danger', true)
            : null
        }
        <div className="order-btn-container">
          <Button onClick={() => history.goBack()} variant="danger" className="order-btn-cancel">Cancel</Button>
          <Button
            onClick={() => this.saveOrder()}
            disabled={
              !this.state.availableTables.length
              || this.isDateTimesInvalid()
              || this.state.visitors > this.getMaximumOfVisitors()
            }
          >
            Create new order
          </Button>
        </div>
      </Container>
    );
  }
}

NewOrder.propTypes = {
  match: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

export default NewOrder;
