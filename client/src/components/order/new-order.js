import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Button, Form } from 'react-bootstrap';
import Api from '../../services/api';

class NewOrder extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      startDate: date,
      finishDate: date,
      availableTables: [],
      table: null,
      visitors: 1,
    };
  }

  componentDidMount() {
    this.getAvailableTables();
  }

  getAvailableTables() {
    const { location } = this.props;
    if (location.restaurantId) {
      const start = this.formatDateTime(this.state.startDate);
      const finish = this.formatDateTime(this.state.finishDate);
      Api.get(`tables/available?id=${location.restaurantId}&start=${start}&finish=${finish}`)
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
  }

  saveOrder() {
    let tableId;
    if (this.state.table) {
      tableId = this.state.table;
    } else if (this.state.availableTables.length) {
      tableId = this.state.availableTables[0].id;
    } else {
      return;
    }
    const order = {
      person: { id: 1 },
      startTime: this.state.startDate,
      finishTime: this.state.finishDate,
      visitors: this.state.visitors,
      table: { id: tableId },
    };

    Api.post('orders', order)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
        }
      });
  }

  selectDateTime(label) {
    return (
      <DatePicker
        selected={this.state[label]}
        onChange={(date) => this.handleDateTimePicker(label, date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="yyyy-MM-dd HH:mm"
      />
    );
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

  render() {
    return (
      <div>
        Restaurant №
        {this.state.restaurantId}
        Start time:
        {this.selectDateTime('startDate')}
        Finish time:
        {this.selectDateTime('finishDate')}

        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Example select</Form.Label>
            <Form.Control
              as="select"
              defaultValue={this.state.availableTables.length ? this.state.availableTables[0] : null}
              name="table"
              onChange={(event) => this.handleFormControl(event)}
            >
              {this.state.availableTables.map((table) => {
                return (
                  <option key={table.id} value={table.id}>
                    Table №
                    {table.id}
                    {' '}
                    Capacity:
                    {' '}
                    {table.capacity}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Number of visitors</Form.Label>
            <Form.Control
              type="number"
              name="visitors"
              defaultValue={this.state.visitors}
              onChange={(event) => this.handleFormControl(event)}
              placeholder="Number of visitors"
              min="1"
            />
          </Form.Group>
        </Form>
        <Button onClick={() => this.saveOrder()}>Save order</Button>
      </div>
    );
  }
}

NewOrder.propTypes = {
  location: PropTypes.any.isRequired,
};

export default NewOrder;
