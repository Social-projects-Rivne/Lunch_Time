import React, { Component } from 'react';
import {
  Container, Button, FormLabel, CardColumns, ButtonToolbar, Spinner, Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../../styles/restaurant-image-uploader.css';
import '../../styles/restaurant-list.css';
import {
  MAX_SELECTED_FILE,
  MAX_SELECTED_FILE_ERROR,
  // eslint-disable-next-line import/named
  WRONG_MIME_TYPE_ERROR,
  MAX_FILE_SIZE,
  // eslint-disable-next-line import/named
  MAX_FILE_SIZE_ERROR,
} from '../../constants';
import Api from '../../services/api';

class RestaurantImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantImages: [],
      isFetching: false,
      isUploadDisabled: true,
      selectedFile: null,
    };
    this.mimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    this.onFileUploadHandler = this.onFileUploadHandler.bind(this);
    this.onFileSelectedHandler = this.onFileSelectedHandler.bind(this);
  }

  componentDidMount() {
    this.getAll(this.props.location.state.restaurantId);
  }

  onFileSelectedHandler(event) {
    this.setState({
      isUploadDisabled: true,
    });
    let { files } = event.target;
    if (this.maxSelectFile(files)) {
      return;
    }
    files = this.checkMimeType(files);
    if (files.length === 0) {
      return;
    }
    files = this.checkFileSize(files);
    if (files.length === 0) {
      return;
    }
    this.setState({
      selectedFile: files,
      isUploadDisabled: false,
    });
  }

  onFileUploadHandler() {
    const { selectedFile } = this.state;
    if (selectedFile.length === 0) {
      return;
    }
    const data = new FormData();
    for (let x = 0; x < selectedFile.length; x += 1) {
      data.append('file', selectedFile[x], `${Date.now()}${x}.jpg`);
    }
    Api.post('image/upload/restaurants', data)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.saveImageByRestaurantId(response.data);
      });
    this.setState({
      selectedFile: null,
      isUploadDisabled: true,
    });
  }

  getAll(id) {
    Api.get(`restaurant-images/gallery/${id}`)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.log(response);
          return;
        }
        this.setState({
          restaurantImages: response.data,
          isFetching: true,
        });
      });
  }

  saveImageByRestaurantId(data) {
    const { restaurantId } = this.props.location.state;
    const photos = [];
    for (let x = 0; x < data.length; x += 1) {
      const restImage = {
        image: data[x],
        restaurantId: restaurantId,
      };
      photos.push(restImage);
    }
    Api.post('restaurant-images', photos)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        // eslint-disable-next-line no-console
        console.log(response);
        this.getAll(this.props.location.state.restaurantId);
      });
  }

  maxSelectFile(files) {
    if (files.length > MAX_SELECTED_FILE) {
      // eslint-disable-next-line no-console
      console.error(MAX_SELECTED_FILE_ERROR);
      return true;
    }
    return false;
  }

  checkMimeType(files) {
    const validFiles = [];
    for (let x = 0; x < files.length; x += 1) {
      if (this.mimeTypes.every((type) => files[x].type !== type)) {
        // eslint-disable-next-line no-console
        console.error(`${files[x].type} ${WRONG_MIME_TYPE_ERROR}\n`);
      } else {
        validFiles.push(files[x]);
      }
    }
    return validFiles;
  }

  checkFileSize(files) {
    const validFiles = [];
    for (let x = 0; x < files.length; x += 1) {
      if (files[x].size > MAX_FILE_SIZE) {
        // eslint-disable-next-line no-console
        console.error(`${files[x].type} ${MAX_FILE_SIZE_ERROR}\n`);
      } else {
        validFiles.push(files[x]);
      }
    }
    return validFiles;
  }

  initButtonToolbar() {
    return (
      <Container className="spinner-container">
        <ButtonToolbar className="justify-content-center">
          <Spinner animation="border" variant="warning" />
        </ButtonToolbar>
      </Container>
    );
  }

  initGallery() {
    const { restaurantImages, isFetching } = this.state;
    if (isFetching) {
      return (
        <Container className="card-body pl-5 pr-5">
          <CardColumns>
            {restaurantImages.map((restaurantImage) => (
              <Card key={restaurantImage.id} className="text-dark m-2" border="dark">
                <Card.Img
                  variant="top"
                  key={restaurantImage.id}
                  src={`${Api.apiUrl}images/restaurants/${restaurantImage.image}`}
                  alt="Image"
                />
              </Card>
            ))}
          </CardColumns>
        </Container>
      );
    }
    return (
      <Container fluid>
        {this.initButtonToolbar()}
      </Container>
    );
  }

  render() {
    const { isUploadDisabled } = this.state;
    return (
      <Container className="container">
        <Container className="form-group files">
          <FormLabel>Upload Your File </FormLabel>
          <input type="file" className="form-control" multiple onChange={this.onFileSelectedHandler} />
        </Container>

        <Button
          type="button"
          disabled={isUploadDisabled}
          className="btn btn-success btn-block"
          onClick={this.onFileUploadHandler}
        >
          Upload Photos
        </Button>
        {this.initGallery()}
      </Container>
    );
  }
}

RestaurantImageUploader.propTypes = {
  location: PropTypes.any.isRequired,
};

export default RestaurantImageUploader;
