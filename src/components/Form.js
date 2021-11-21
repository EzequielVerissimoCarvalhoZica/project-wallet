import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addExpenses, addCurrencies } from '../actions';
import fetchApi from '../services/fetchApi';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      allCurrencies: [],
      methodsArr: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagsArr: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],

    };

    this.handleChange = this.handleChange.bind(this);
    this.saveExpenses = this.saveExpenses.bind(this);
    this.returnForm = this.returnForm.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const { sendCurrencies } = this.props;

    try {
      const currenciesObj = await fetchApi();
      const currenciesArr = Object.keys(currenciesObj);
      this.setState({ allCurrencies: currenciesArr });
      sendCurrencies(currenciesArr);
    } catch (error) {
      console.log(error.message);
    }
  }

  generateOptionEl(options) {
    if (!options) return [];
    return options.map((option, index) => (
      <option key={ index } value={ option }>{ option }</option>
    ));
  }

  generateOptionCurrencies(currencies) {
    return currencies.map((currencie, index) => {
      if (currencie !== 'USDT') {
        return (
          <option
            data-testid={ currencie }
            key={ index }
            value={ currencie }
          >
            { currencie }
          </option>
        );
      } return false;
    });
  }

  async saveExpenses(event) {
    event.preventDefault();
    const { sendExpenses, storeExpense } = this.props;
    try {
      const exchangeRates = await fetchApi();
      const {
        value,
        description,
        currency,
        method,
        tag,
        tagsArr,
        methodsArr,
      } = this.state;
      const expenses = {
        id: storeExpense.length,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      };
      sendExpenses(expenses);

      this.setState({
        value: 0,
        description: '',
        currency: 'USD',
        method: methodsArr[0],
        tag: tagsArr[0],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  returnForm() {
    const { value, description } = this.state;

    return (
      <>
        <input
          data-testid="value-input"
          type="number"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          data-testid="description-input"
          type="text"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />

      </>
    );
  }

  render() {
    const { currency, method, tag, methodsArr, tagsArr, allCurrencies } = this.state;

    return (
      <form onSubmit={ this.saveExpenses }>
        {
          this.returnForm()
        }
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {this.generateOptionCurrencies(allCurrencies)}
          </select>
        </label>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          {this.generateOptionEl(methodsArr)}
        </select>
        Tag
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          {this.generateOptionEl(tagsArr)}
        </select>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

Form.propTypes = {
  sendCurrencies: PropTypes.func.isRequired,
  sendExpenses: PropTypes.func.isRequired,
  storeExpense: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  storeExpense: state.wallet.expenses,
});

const mapToDispatchToProps = (dispatch) => ({
  sendExpenses: (expense) => dispatch(addExpenses(expense)),
  sendCurrencies: (currencies) => dispatch(addCurrencies(currencies)),
});

export default connect(mapStateToProps, mapToDispatchToProps)(Form);
