import * as React from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

class AlertBase extends React.Component {
  render() {
    const { type, title } = this.props;
    return (
      <Alert variant={type}>
        <Alert.Heading>{title}</Alert.Heading>
      </Alert>
    );
  }
}

AlertBase.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AlertBase;
