export const dummyExpense = {
  description: 'Macbook Pro 244',
  amount: 233.4,
  date: new Date(),
  userId: 1,
  save: jest.fn().mockImplementation(() => editedExpense)
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
  description: 'California trip',
  amount: 233.4,
  date: new Date()
};
