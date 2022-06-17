import { View, Text, StyleSheet } from 'react-native';
import { FC } from 'react';

import { Expense } from '@/types/Expense';

import { GlobalStyles } from '@/Constants/styles';

const ExpensesSummary: FC<{ periodName: String; expenses: Expense[] }> = ({
  periodName,
  expenses
}) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text testID="expenses-summary" style={styles.sum}>
        $ {expensesSum.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500
  }
});

export default ExpensesSummary;
