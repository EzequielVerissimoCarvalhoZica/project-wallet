export const USER = 'USER';
export const ADD_WALLET = 'ADD_WALLET';

export const userAction = (email) => ({
  type: USER,
  email,
});

export const addWalletAction = (currencies, expenses) => ({
  type: ADD_WALLET,
  currencies,
  expenses,
});
