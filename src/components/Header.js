import PropTypes from 'prop-types';
import React from 'react';
import './Header.css';
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
      <header className="container-header">
        <div className="container-img">
          <img className="img-header" src="/assets/header_wallet.svg" alt="wallet" />
        </div>
        <div className="container-user">
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{`R$${totalValue.toFixed(2)}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
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
