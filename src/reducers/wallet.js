import { ADD_WALLET } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_WALLET:
    return {
      ...state,
      wallet: {
        currencies: [...state.wallet.currencies, action.currencies],
        expenses: [...state.wallet.expenses, action.expenses],
      },
    };
  default:
    return state;
  }
};

export default wallet;
