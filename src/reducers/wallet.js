import { ADD_EXPENSES, ADD_CURRENCIES } from '../actions';

const INITIAL_STATE = {

  currencies: [],
  expenses: [],

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };

  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: [...state.currencies, action.currencies],
    };

  default:
    return state;
  }
};

export default wallet;
