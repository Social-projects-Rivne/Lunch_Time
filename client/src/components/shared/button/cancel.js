import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from '../timer';

class Cancel extends Component {
  cancel() {
    this.props.cancel();
  }

  render() {
    const { timerCount, showTimer } = this.props;
    return (
      <Button
        className="btnFormSendDanger"
        variant="danger"
        style={{ marginLeft: 20 }}
        onClick={() => {
          this.cancel();
        }}
      >
        <span>
          <Timer showTimer={showTimer} timerCount={timerCount} />
          {' '}
          Cancel
        </span>
      </Button>
    );
  }
}

Cancel.propTypes = {
  showTimer: PropTypes.any.isRequired,
  timerCount: PropTypes.any.isRequired,
  cancel: PropTypes.any.isRequired,
};

export default Cancel;
