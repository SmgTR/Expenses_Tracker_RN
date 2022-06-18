import { ExpensesOutput } from '../Components';

import { useAppSelector } from '@/redux/hooks';

const AllExpenses = () => {
  const allExpenses = useAppSelector((state) => state.expenses);

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expensesList={allExpenses}
      fallbackText="No expenses found"
    />
  );
};

export default AllExpenses;
