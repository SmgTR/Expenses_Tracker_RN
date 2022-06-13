import { View } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { FC } from 'react';

import { expensesItem } from '@/src/types';

const DUMMY_EXPENSES: expensesItem[] = [
  { id: 'e1', description: 'A pair of shoes', amount: 59.99, date: new Date('2021-12-19') },
  { id: 'e2', description: 'Bananas', amount: 39.29, date: new Date('2022-06-08') },
  { id: 'e3', description: 'Book', amount: 12.42, date: new Date('2022-06-07') },
  { id: 'e4', description: 'Lightsaber', amount: 145.55, date: new Date('2022-05-21') },
  { id: 'e5', description: 'Lego', amount: 421.12, date: new Date('2022-06-10') }
];

//  FC<> = ({ expenses: expensesItem, expensesPeriod })
const ExpensesOutput: FC<{ expensesPeriod: string }> = ({ expensesPeriod }) => {
  return (
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;
