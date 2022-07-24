export const dummyExpense = {
  id: 5,
  description: 'Macbook Pro 244',
  amount: 233.4,
  date: new Date(),
  userId: 1,
  save: jest.fn().mockImplementation(() => editedExpense),
  destroy: jest.fn()
};

export const dummyUser = {
  id: 1,
  email: 'test@test.pl'
};

export const dummyUserInput = {
  email: 'test@test.pl',
  password: 'test1234'
};

export const editedExpense = {
  id: 5,
  description: 'California trip',
  amount: 233.4,
  date: new Date(),
  userId: 1,
  destroy: jest.fn()
};
