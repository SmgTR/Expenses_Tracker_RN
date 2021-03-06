import { NavigationContainer } from '@react-navigation/native';
import { render, RenderAPI, cleanup } from '@testing-library/react-native';

import ExpensesList from '../src/Components/ExpensesOutput/ExpensesList';

const expenses = [
  { id: 'e1', description: 'A pair of shoes', amount: 59.992121, date: '2021-12-19' },
  { id: 'e2', description: 'Bananas', amount: 39.29, date: '2022-06-08' }
];

describe('Get and display list of expenses', () => {
  let wrapper: RenderAPI;

  beforeEach(() => {
    wrapper = render(
      <NavigationContainer>
        <ExpensesList expenses={expenses} />
      </NavigationContainer>
    );
  });
  afterEach(cleanup);

  test('Check if item is displayed', () => {
    expect(wrapper.findByText(expenses[0].description)).toBeTruthy();
  });

  test('Amount displays with only two units after dot', async () => {
    const amount = await wrapper.findByText(expenses[0].amount.toFixed(2));
    expect(amount).toBeTruthy();
  });
});
