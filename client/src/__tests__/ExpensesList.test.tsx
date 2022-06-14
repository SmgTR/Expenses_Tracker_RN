import { render, RenderAPI } from '@testing-library/react-native';
import ExpensesList from '../Components/ExpensesOutput/ExpensesList';

const expenses = [
  { id: 'e1', description: 'A pair of shoes', amount: 59.992121, date: new Date('2021-12-19') },
  { id: 'e2', description: 'Bananas', amount: 39.29, date: new Date('2022-06-08') }
];

describe('Get and display list of expenses', () => {
  let wrapper: RenderAPI;
  beforeEach(() => {
    wrapper = render(<ExpensesList expenses={expenses} />);
  });

  test('Check if item is displayed', () => {
    expect(wrapper.getByText(expenses[0].description)).toBeTruthy();
  });

  test('Amount displays with only two units after dot', () => {
    expect(wrapper.getByText(expenses[0].amount.toFixed(2).toString())).toBeTruthy();
  });
});
