import { StyleSheet, View } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { FC } from 'react';

import { Expense } from '@/types/Expense';
import { GlobalStyles } from '@/Constants/styles';

import { useAppSelector } from '@/redux/hooks';

//  FC<> = ({ expenses: expensesItem, expensesPeriod })
const ExpensesOutput: FC<{ expensesPeriod: string }> = ({ expensesPeriod }) => {
  const allExpenses = useAppSelector((state) => state.expenses.expenses);

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={allExpenses} periodName={expensesPeriod} />
      <ExpensesList expenses={allExpenses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1
  }
});

export default ExpensesOutput;
