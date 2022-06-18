import { View, Text, StyleSheet } from 'react-native';
import { FC } from 'react';

import { GlobalStyles } from '@/Constants/styles';
import { ExpensesSummaryComponent } from '@/types';

const ExpensesSummary: FC<ExpensesSummaryComponent> = ({ periodName, expenses }) => {
  const expensesSum = expenses?.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>
        {expensesSum && (
          <Text testID="expenses-summary" style={styles.sum}>
            $ {expensesSum.toFixed(2)}
          </Text>
        )}
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
