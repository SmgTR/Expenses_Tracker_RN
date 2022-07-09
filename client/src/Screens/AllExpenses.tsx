import { useAppSelector } from '@/redux/hooks';
import { ExpensesOutput } from '../Components';

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
