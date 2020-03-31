import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Button, ButtonToolbar, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

class PhotoEditor extends React.Component {
  render() {
    const { image } = this.props;
    return (
      <Container>
        <AvatarEditor
          image={image}
          width={300}
          height={300}
          border={100}
          color={[255, 255, 255, 0.6]}
          scale={2.0}
          rotate={0}
        />
        <ButtonToolbar>
          <Button className="mr-3 m-button">Select</Button>
          <Button className="mr-3 m-button">Cancel</Button>
        </ButtonToolbar>
      </Container>
    );
  }
}

PhotoEditor.propTypes = {
  image: PropTypes.string.isRequired,
};

export default PhotoEditor;
