import PropTypes from 'prop-types';
import React from 'react';
import './Table.css';
import { connect } from 'react-redux';
import { updateExpenses } from '../actions';

class Table extends React.Component {
  constructor() {
    super();

    this.removeExpenseButton = this.removeExpenseButton.bind(this);
    this.createTableExpenses = this.createTableExpenses.bind(this);
  }

  removeExpenseButton({ target }) {
    const { expenses, reloadExpenses } = this.props;

    const newExpenses = expenses
      .filter((expense) => Number(target.id) !== Number(expense.id));

    reloadExpenses(newExpenses);
  }

  createTableExpenses() {
    const { expenses } = this.props;

    return expenses
      .map(({ id, value, description, currency, method, tag, exchangeRates }) => {
        const coin = exchangeRates[currency].name.split('/');
        const numberPrecisionAt = 2;
        const exchange = parseFloat(exchangeRates[currency].ask)
          .toPrecision(numberPrecisionAt);
        const price = (value * exchangeRates[currency].ask).toFixed(2);
        return (
          <tr key={ id }>
            <td className="desc">{description}</td>
            <td className="tag">{tag}</td>
            <td className="meth">{method}</td>
            <td className="value">{`R$${value}`}</td>
            <td className="coin">{coin[0]}</td>
            <td className="exchange">{`R$${exchange}`}</td>
            <td className="converge">{`R$${price}`}</td>
            <td className="real">Real</td>
            <td className="button">
              <button
                className="button-delete"
                data-testid="delete-btn"
                type="button"
                id={ id }
                onClick={ this.removeExpenseButton }
              >
                Remover

              </button>
            </td>
          </tr>
        );
      });
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            this.createTableExpenses()
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf({
    filter: PropTypes.func,
    map: PropTypes.func.isRequired,
  }).isRequired,
  reloadExpenses: PropTypes.func.isRequired,
};

const mapToDispatchToProps = (dispatch) => ({
  reloadExpenses: (expense) => dispatch(updateExpenses(expense)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapToDispatchToProps)(Table);
