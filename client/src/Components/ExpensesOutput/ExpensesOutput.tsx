import { StyleSheet, View } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { FC } from 'react';

import { Expense } from '@/types/Expense';
import { GlobalStyles } from '@/Constants/styles';

const DUMMY_EXPENSES: Expense[] = [
  { id: 'e1', description: 'A pair of shoes', amount: 59.99, date: new Date('2021-12-19') },
  { id: 'e2', description: 'Bananas', amount: 39.29, date: new Date('2022-06-08') },
  { id: 'e3', description: 'Book', amount: 12.42, date: new Date('2022-06-07') },
  { id: 'e4', description: 'Lightsaber', amount: 145.55, date: new Date('2022-05-21') },
  { id: 'e5', description: 'Lego', amount: 421.12, date: new Date('2022-06-10') },
  { id: 'e6', description: 'Coconut', amount: 16.21, date: new Date('2022-06-10') },
  { id: 'e7', description: 'Iphone', amount: 369.12, date: new Date('2022-06-10') },
  { id: 'e8', description: 'TV', amount: 4221.86, date: new Date('2022-06-10') },
  { id: 'e9', description: 'Star Trek Movie', amount: 9.23, date: new Date('2022-06-10') },
  { id: 'e10', description: 'Chewbacca Cosplay Suit', amount: 421.12, date: new Date('2022-06-10') }
];

//  FC<> = ({ expenses: expensesItem, expensesPeriod })
const ExpensesOutput: FC<{ expensesPeriod: string }> = ({ expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
