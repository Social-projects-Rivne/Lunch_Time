import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Button, Form } from 'react-bootstrap';
import Api from '../../services/api';

class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.timeInterval = 15;
    this.milliseconds = 60000;
    this.currentDate = new Date();
    this.state = {
      startDate: this.timeFormatter(this.currentDate),
      finishDate: this.timeFormatter((new Date(this.currentDate.getTime() + this.timeInterval * this.milliseconds))),
      availableTables: [],
      table: null,
      visitors: 1,
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
      startTime: this.state.startDate.toUTCString(),
      finishTime: this.state.finishDate.toUTCString(),
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
  match: PropTypes.any.isRequired,
};

export default NewOrder;
