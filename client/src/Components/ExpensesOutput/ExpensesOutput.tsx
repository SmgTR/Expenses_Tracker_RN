import { StyleSheet, View, Text } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { FC } from 'react';

import { GlobalStyles } from '@/Constants/styles';
import { ExpensesOutputComponent } from '@/types/ExpensesComponents';

const ExpensesOutput: FC<ExpensesOutputComponent> = ({
  expensesPeriod,
  expensesList,
  fallbackText
}) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expensesList.length > 0) {
    content = <ExpensesList expenses={expensesList} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expensesList} periodName={expensesPeriod} />
      {content}
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
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  }
});

export default ExpensesOutput;
