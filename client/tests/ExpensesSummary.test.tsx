import { render, RenderAPI } from '@testing-library/react-native';
import ExpensesSummary from '../src/Components/ExpensesOutput/ExpensesSummary';

describe('Calculate and display info from expenses list', () => {
  const expenses = [
    { id: 'e1', description: 'A pair of shoes', amount: 59.99, date: '2021-12-19' },
    { id: 'e2', description: 'Bananas', amount: 39.29, date: '2022-06-08' }
  ];

  let wrapper: RenderAPI;

  beforeEach(() => {
    wrapper = render(<ExpensesSummary expenses={expenses} periodName="7 Days" />);
  });

  test('Display period of items included in list', async () => {
    const period = await wrapper.findByText('7 Days');
    expect(period).toBeTruthy();
  });

  test('Calculate amount of expenses', async () => {
    const summary = await wrapper.findByTestId('expenses-summary');
    expect(summary.children.join('')).toBe('$ 99.28');
  });
});
