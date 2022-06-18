import { useAppSelector } from '@/redux/hooks';
import { getDateMinusDays } from '@/utils/date';
import { ExpensesOutput } from '../Components';

const RecentExpenses = () => {
  const allExpenses = useAppSelector((state) => state.expenses);

  const recentExpenses = allExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today.toString(), 7);

    const expenseDate = new Date(expense.date);

    return expenseDate >= date7DaysAgo && expenseDate <= today;
  });
  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expensesList={recentExpenses}
      fallbackText={'No expenses registered for the last 7 days'}
    />
  );
};

export default RecentExpenses;
