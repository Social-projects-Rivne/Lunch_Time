import React from 'react';
import {
  Button, ButtonToolbar, Container, Dropdown, Form, Image,
} from 'react-bootstrap';
import '../../styles/new-event.css';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Api from '../../services/api';


class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: 'Party',
      selectedCategoryId: '1',
      dateAndTime: new Date(),
      image: '',
      event: { name: '', description: '', deleted: false },
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
    this.sendData();
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
    const { event, selectedCategoryId, dateAndTime } = this.state;
    event.restaurant = { id: match.params.id };
    event.eventCategory = { id: selectedCategoryId };
    event.date = moment(dateAndTime).format('YYYY-MM-DD HH:mm');

    Api.post('events', event)
      .then((r) => {
        if (r.error === null) {
          console.log(`img${this.state.image}`);
        }
      });
  }


  handleChange(e) {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      event: {
        ...prevState.event,
        [name]: value,
      },
    }));
  }

  convertCategoryName(categoryName) {
    const removeUnderscores = categoryName.split('_').join(' ');
    return removeUnderscores.charAt(0).toUpperCase() + removeUnderscores.slice(1);
  }

  render() {
    const { categories, selectedCategory } = this.state;
    return (
      <Container fluid className="new-event-container">
        <h5>Add a new event</h5>

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
};

export default NewEvent;
