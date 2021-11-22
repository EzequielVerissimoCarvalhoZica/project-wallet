import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false,
      disabled: true,

    };

    this.handleChange = this.handleChange.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  validButton() {
    const { validEmail, validPassword } = this.state;

    if (validEmail === true && validPassword === true) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  checkValidityEmailAndPassword() {
    const { email } = this.state;

    const splitEmail = email.split('@');
    if (splitEmail.length === 2) {
      const splitEmail2 = splitEmail[1].split('.');
      if (splitEmail2.length === 2 && splitEmail2[1].length > 0) {
        this.setState({ validEmail: true }, () => { this.validButton(); });
      } else {
        this.setState({ validEmail: false }, () => { this.validButton(); });
      }
    } else {
      this.setState({ validEmail: false }, () => { this.validButton(); });
    }

    const { password } = this.state;
    const minPasswordSize = 5;

    if (password.length > minPasswordSize) {
      this.setState({
        validPassword: true,
      }, () => { this.validButton(); });
    } else {
      this.setState({
        validPassword: false,
      }, () => { this.validButton(); });
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => { this.checkValidityEmailAndPassword(); });
  }

  submitButton(event) {
    const { dispatchEmail, history } = this.props;
    const { email } = this.state;
    event.preventDefault();
    dispatchEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;

    return (
      <form onSubmit={ this.submitButton }>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button type="submit" disabled={ disabled }>Entrar</button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapToDispatchToProps = (dispatch) => ({
  dispatchEmail: (state) => dispatch(userAction(state)),
});

export default connect(null, mapToDispatchToProps)(Login);
