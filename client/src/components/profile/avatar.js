import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import {
  Button, ButtonToolbar, Container, Spinner,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Api from '../../services/api';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.user.avatar,
      isApplyDisabled: true,
      user: this.props.user,
      scale: 1,
      allowZoomOut: false,
    };
    this.fileInputRef = React.createRef();
  }

  onNewFileSelect() {
    this.fileInputRef.current.click();
  }

  onFileSelect() {
    const file = this.fileInputRef.current.files[0];
    if (file !== undefined) {
      this.setState({
        image: file,
        isApplyDisabled: false,
      });
    }
  }

  onApplyClick() {
    const { user } = this.state;
    const formData = new FormData();
    const canvas = this.editor.getImageScaledToCanvas();
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);
    const blob = this.dataURItoBlob(dataURL);

    const fileName = `${user.id}.jpg`;
    formData.append('file', blob, fileName);
    user.photoUrl = fileName;

    Api.post('/image/upload/profile', formData)
      .then((response) => {
        if (response.error == null) {
          Api.put('persons', user).then((r) => {
            if (r.error == null) {
              this.props.history.push('/profile/info');
              this.props.updateAvatar(dataURL);
              this.props.title('Your avatar has been updated successfully');
            }
          });
        }
      });
  }

  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < byteString.length; i++) { ia[i] = byteString.charCodeAt(i); }
    return new Blob([ab], { type: 'image/jpeg' });
  }

  handleScale(e) {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  }

  render() {
    const { image, isApplyDisabled } = this.state;
    const { isFetching } = this.props;
    if (isFetching) {
      return (
        <Container>
          <ButtonToolbar>
            <Button
              onClick={() => this.onNewFileSelect()}
              className="mr-3 mb-2 m-button"
            >
              Select new file
            </Button>
            <input
              ref={this.fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              hidden
              onChange={() => this.onFileSelect()}
            />
            <input
              name="scale"
              type="range"
              onChange={(e) => this.handleScale(e)}
              min={this.state.allowZoomOut ? '0.1' : '1'}
              max="2"
              step="0.01"
              defaultValue="1"
              disabled={isApplyDisabled}
            />
          </ButtonToolbar>
          <AvatarEditor
            ref={(editor) => {
              this.editor = editor;
            }}
            image={image}
            width={280}
            height={280}
            border={100}
            color={[255, 255, 255, 0.6]}
            scale={this.state.scale}
            rotate={0}
            borderRadius={255}
          />
          <ButtonToolbar>
            <Button
              disabled={isApplyDisabled}
              className="mr-3 m-button"
              onClick={() => this.onApplyClick()}
            >
              Apply
            </Button>
            <Button
              variant="danger"
              className="mr-3"
              onClick={this.props.history.goBack}
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </Container>
      );
    }
    return (
      <Spinner animation="border" variant="warning" />
    );
  }
}

Avatar.propTypes = {
  user: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
  isFetching: PropTypes.bool.isRequired,
  updateAvatar: PropTypes.any.isRequired,
};

export default withRouter(Avatar);
