import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  sumTotalValue(expenses) {
    let totalValue = 0;
    expenses.forEach(({ currency, value, exchangeRates }) => {
      totalValue += value * exchangeRates[currency].ask;
    });
    return totalValue;
  }

  render() {
    const { email, expenses } = this.props;
    const totalValue = this.sumTotalValue(expenses);

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
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
