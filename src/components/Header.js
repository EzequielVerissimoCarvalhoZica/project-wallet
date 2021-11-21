import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;

    let totalValue = 0;

    expenses.forEach((expense) => {
      const coin = expense.currency;
      totalValue += expense.value * expense.exchangeRates[coin].ask;
    });

    return (
      <div>
        <h3 data-testid="email-field">{email}</h3>
        <p data-testid="total-field">{totalValue}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    forEach: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
