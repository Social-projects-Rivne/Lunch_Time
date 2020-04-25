import * as React from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

class AlertBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: this.props.show,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.isShow) {
      this.setState({ isShow: nextProps.show });
    }
  }

  render() {
    const { type, title } = this.props;
    const { isShow } = this.state;
    return (
      <div>
        {isShow && (
        <Alert variant={type} onClose={() => this.setState({ isShow: false })} dismissible>
          <Alert.Heading>{title}</Alert.Heading>
        </Alert>
        )}
      </div>
    );
  }
}

AlertBase.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  show: PropTypes.bool.isRequired,
};

AlertBase.defaultProps = {
  title: 'Unknown error',
};

export default AlertBase;
