import * as React from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

class AlertBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  render() {
    const { type, title } = this.props;
    const { show } = this.state;
    return (
      <div>
        {show && (
        <Alert variant={type} onClose={() => this.setState({ show: false })} dismissible>
          <Alert.Heading>{title}</Alert.Heading>
        </Alert>
        )}
      </div>
    );
  }
}

AlertBase.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AlertBase;
