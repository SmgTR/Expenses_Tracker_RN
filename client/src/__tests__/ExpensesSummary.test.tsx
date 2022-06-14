import { render, RenderAPI } from '@testing-library/react-native';
import ExpensesSummary from '../Components/ExpensesOutput/ExpensesSummary';

describe('Calculate and display info from expenses list', () => {
  const expenses = [
    { id: 'e1', description: 'A pair of shoes', amount: 59.99, date: new Date('2021-12-19') },
    { id: 'e2', description: 'Bananas', amount: 39.29, date: new Date('2022-06-08') }
  ];

  let wrapper: RenderAPI;

  beforeEach(() => {
    wrapper = render(<ExpensesSummary expenses={expenses} periodName="7 Days" />);
  });

  test('Display period of items included in list', () => {
    expect(wrapper.getByText('7 Days')).toBeTruthy();
  });

  test('Calculate amount of expenses', () => {
    const summary = wrapper.getByTestId('expenses-summary');
    expect(summary.children.join('')).toBe('$ 99.28');
  });
});
