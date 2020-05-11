import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
  }

  onFindClick() {
    this.props.filter(this.state.filter);
  }

  onEnterPress(event) {
    if (event.key === 'Enter') {
      this.onFindClick();
    }
  }

  render() {
    const {
      containerClassName,
      inputGroupClassName,
      placeHolder,
    } = this.props;
    const { filter } = this.state;
    return (
      <Container className={containerClassName}>
        <InputGroup className={inputGroupClassName}>
          <FormControl
            placeholder={placeHolder}
            value={filter}
            onChange={(e) => this.setState({ filter: e.target.value })}
            onKeyDown={(e) => this.onEnterPress(e)}
          />
          <InputGroup.Append>
            <Button onClick={() => this.onFindClick()}>Find</Button>
          </InputGroup.Append>
        </InputGroup>
      </Container>
    );
  }
}

Input.defaultProps = {
  containerClassName: 'search-container pt-4',
  inputGroupClassName: 'mb-3',
  placeHolder: 'Search',
};

Input.propTypes = {
  containerClassName: PropTypes.string,
  inputGroupClassName: PropTypes.string,
  placeHolder: PropTypes.string,
  filter: PropTypes.func.isRequired,
};

export default Input;
