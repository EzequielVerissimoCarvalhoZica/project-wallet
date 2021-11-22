import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Table extends React.Component {
  createTableExpenses() {
    const { expenses } = this.props;

    return expenses
      .map(({ id, value, description, currency, method, tag, exchangeRates }) => {
        const coin = exchangeRates[currency].name.split('/');
        const numberPrecisionAt = 3;
        const exchange = parseFloat(exchangeRates[currency].ask)
          .toPrecision(numberPrecisionAt);
        return (
          <tr key={ id }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{value}</td>
            <td>{coin[0]}</td>
            <td>{exchange}</td>
            <td>{value * exchangeRates[currency].ask}</td>
            <td>Real</td>
            <td>Buttons</td>
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
            <th>Editar/Excluir</th>
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
  expenses: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
