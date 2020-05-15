import React from 'react';
import {
  Button, ButtonToolbar, Container, Dropdown, Form, Image,
} from 'react-bootstrap';
import '../../styles/new-event.css';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Resizer from 'react-image-file-resizer';
import { withRouter } from 'react-router-dom';
import Api from '../../services/api';
import AlertBase from '../shared/alert-base';


class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.timeInterval = 30;
    this.currentDate = new Date();
    this.state = {
      categories: [],
      selectedCategory: 'Party',
      selectedCategoryId: '1',
      dateAndTime: this.timeFormatter(this.currentDate),
      image: null,
      event: { name: '', description: '', deleted: false },
      errors: { err: 'Please fill all fields! ' },
      isShowAlert: false,
    };
    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    this.getCategories('event-category');
  }

  onFileSelect(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    const imageTag = document.getElementById('eventImage');
    Resizer.imageFileResizer(file, 640, 480, 'JPEG', 100, 0, (uri) => { this.setState({ image: uri }); },
      'blob');
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
    const { errors } = this.state;
    if (!this.validateForm(errors)) {
      this.setState({ isShowAlert: true });
    } else {
      this.sendData();
    }
  }

  onCancelClick() {
    this.props.selectedTab('events');
    this.props.history.goBack();
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
          categories: response.data,
        });
      });
  }

  sendData() {
    const { match } = this.props;
    const {
      event, selectedCategoryId, dateAndTime, image,
    } = this.state;
    const imgFileName = `${btoa(Math.random())}.jpg`;
    event.restaurant = { id: match.params.id };
    event.eventCategory = { id: selectedCategoryId };
    event.date = moment(dateAndTime).format('YYYY-MM-DD HH:mm');

    if (image != null) {
      event.image = imgFileName;
    }

    Api.post('events', event)
      .then((r) => {
        if (r.error === null && image != null) {
          this.sendImage(imgFileName);
        } else {
          this.props.selectedTab('events');
          this.props.history.goBack();
        }
      });
  }

  sendImage(fileName) {
    const { image } = this.state;
    const formData = new FormData();
    formData.append('file', image, fileName);
    Api.post('/image/upload/events', formData)
      .then((response) => {
        if (response.error == null) {
          this.props.selectedTab('events');
          this.props.history.goBack();
        }
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { errors, event } = this.state;

    errors.err = '';
    switch (name) {
      case 'name':
        errors.name = (value.length > 5 && value.length <= 50)
          ? '' : 'Event name must be 6-50 characters long! ';
        errors.err = this.checkIfEmptyFields(value, event.description);
        break;
      case 'description':
        errors.description = (value.length > 5 && value.length <= 500) ? '' : 'Description must be 6-200 characters! ';
        errors.err = this.checkIfEmptyFields(event.name, value);
        break;
      default:
        break;
    }

    this.setState((prevState) => ({
      event: {
        ...prevState.event,
        [name]: value,
      },
      isShowAlert: false,
    }));
  }

  checkIfEmptyFields(val1, val2) {
    if (val1 === undefined || val1.length === 0 || val2 === undefined || val2.length === 0) {
      return 'Not all fields are filled! ';
    }
    return '';
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach(
      (val) => { if (val.length > 0) valid = false; },
    );
    return valid;
  }

  convertCategoryName(categoryName) {
    const removeUnderscores = categoryName.split('_').join(' ');
    return removeUnderscores.charAt(0).toUpperCase() + removeUnderscores.slice(1);
  }

  timeFormatter(time) {
    if (time.getMinutes() % this.timeInterval) {
      const intervalCount = time.getMinutes() / this.timeInterval;
      const formattedMinutes = (intervalCount - (intervalCount % 1) + 1) * this.timeInterval;
      time.setMinutes(formattedMinutes);
    }
    return time;
  }

  render() {
    const {
      categories, selectedCategory, errors, isShowAlert,
    } = this.state;
    return (
      <Container fluid className="new-event-container">
        <h5>Add a new event</h5>
        <AlertBase
          show={isShowAlert}
          type="danger"
          title={Object.values(errors).join('')}
        />
        <Form.Group>
          <Form.Label>Category: </Form.Label>
          <br />
          <Dropdown>
            <Dropdown.Toggle>{selectedCategory}</Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((item) => (
                <Dropdown.Item
                  onSelect={(e) => {
                    this.setState({
                      selectedCategory: this.convertCategoryName(e),
                      selectedCategoryId: item.id,
                    });
                  }}
                  eventKey={item.category}
                  key={item.id}
                >
                  {this.convertCategoryName(item.category)}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group>
          <Form.Label>Start time:</Form.Label>
          <br />
          <DatePicker
            minDate={new Date()}
            selected={this.state.dateAndTime}
            onChange={(date) => this.setState({ dateAndTime: date })}
            showTimeSelect
            timeIntervals={this.timeInterval}
            timeFormat="HH:mm"
            className="date-time-input"
            timeCaption="time"
            dateFormat="yyyy-MM-dd HH:mm"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Event name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Please enter the event name"
            onChange={(e) => this.handleChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Event description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Please enter the events description"
            onChange={(e) => this.handleChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Button onClick={() => this.onSelectClick()}>Select photo</Button>
          <br />
          <Image className="event-img mt-3" id="eventImage" src="/img/default-event.jpg" />
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

NewEvent.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.any.isRequired,
  selectedTab: PropTypes.func.isRequired,
};

export default withRouter(NewEvent);
