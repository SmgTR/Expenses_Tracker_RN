import { View, Text } from 'react-native';
import { FC } from 'react';

import { expensesItem } from '@/src/types';

const ExpensesSummary: FC<{ periodName: String; expenses: expensesItem[] }> = ({
  periodName,
  expenses
}) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text testID="expenses-summary">{expensesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;
