import React, { Component } from 'react';
import {
  ProgressBar, Container, Button, FormLabel,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Api from '../../services/api';
import './restaurant-image-uploader.css';
import {
  MAX_SELECTED_FILE,
  MAX_SELECTED_FILE_ERROR,
  // eslint-disable-next-line import/named
  WRONG_MIME_TYPE_ERROR,
  MAX_FILE_SIZE,
  // eslint-disable-next-line import/named
  MAX_FILE_SIZE_ERROR,
} from '../../constants';

class RestaurantImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploadDisabled: true,
      selectedFile: null,
      uploaded: 0,
    };
    this.mimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    this.onFileUploadHandler = this.onFileUploadHandler.bind(this);
    this.onFileSelectedHandler = this.onFileSelectedHandler.bind(this);
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
          console.error(response);
          return;
        }
        console.log(response);
      });
  }

  maxSelectFile(files) {
    if (files.length > MAX_SELECTED_FILE) {
      console.error(MAX_SELECTED_FILE_ERROR);
      return true;
    }
    return false;
  }

  checkMimeType(files) {
    const validFiles = [];
    for (let x = 0; x < files.length; x += 1) {
      if (this.mimeTypes.every((type) => files[x].type !== type)) {
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
        console.error(`${files[x].type} ${MAX_FILE_SIZE_ERROR}\n`);
      } else {
        validFiles.push(files[x]);
      }
    }
    return validFiles;
  }

  render() {
    const { isUploadDisabled, uploaded } = this.state;
    return (
      <Container className="container">
        <Container className="form-group files">
          <FormLabel>Upload Your File </FormLabel>
          <input type="file" className="form-control" multiple onChange={this.onFileSelectedHandler} />
        </Container>

        <Container className="form-group">
          <ProgressBar now={uploaded} variant="success" label={uploaded} />
        </Container>

        <Button
          type="button"
          disabled={isUploadDisabled}
          className="btn btn-success btn-block"
          onClick={this.onFileUploadHandler}
        >
          Upload Photos
        </Button>
      </Container>
    );
  }
}

RestaurantImageUploader.propTypes = {
  location: PropTypes.any.isRequired,
};

export default RestaurantImageUploader;
