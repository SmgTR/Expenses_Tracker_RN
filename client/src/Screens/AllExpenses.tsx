import { ExpensesOutput } from '../Components';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { getAllExpenses } from '@/redux/services/expense';

const AllExpenses = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllExpenses());
  }, []);

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
