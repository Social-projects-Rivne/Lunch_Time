import * as React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import PasswordStrengthBar from 'react-password-strength-bar';
import Input from '../shared/input';

class PassChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      newPass: '',
      errors: {
        oldPass: 'Please enter old password! ',
        newPass: 'Please set a new password! ',
        password: 'Please repeat a new password! ',
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  toggle() {
    this.setState((currentState) => ({ showForm: !currentState.showForm }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.props;
    const { errors, newPass } = this.state;

    switch (name) {
      case 'oldPass':
        errors.oldPass = user.password === value ? '' : 'Old password is wrong! ';
        break;
      case 'newPass':
        errors.newPass = value.length > 7 ? '' : 'Password must be at least 8 characters! ';
        break;
      case 'password':
        errors.password = newPass === value ? '' : 'Passwords do not match! ';
        break;
      default:
        break;
    }

    this.setState({
      [name]: value,
      errors,
      [name]: value,
    });

    const e = { password: `${[Object.values(errors).join('')]}` };
    this.props.onChange(e, 'password', newPass);
  }

  render() {
    const { newPass } = this.state;
    return (
      <div>
        {!this.state.showForm
        && (
        <Button className="m-button" onClick={() => this.toggle()}>
          Change password
        </Button>
        )}
        {this.state.showForm
        && (
        <div className="pt-2">
          <Input
            name="oldPass"
            type="password"
            label="Old password"
            placeholder="Enter old password"
            onChange={this.handleChange}
          />
          <Input
            name="newPass"
            type="password"
            label="New password"
            placeholder="Enter new password"
            onChange={this.handleChange}
          />
          {newPass.length > 0
          && (
          <PasswordStrengthBar
            minLength="8"
            password={newPass}
          />
          )}
          <Input
            name="password"
            type="password"
            label="Repeat new password"
            placeholder="Repeat new password"
            onChange={this.handleChange}
          />
        </div>
        )}
      </div>
    );
  }
}

PassChange.propTypes = {
  user: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
};

export default PassChange;
