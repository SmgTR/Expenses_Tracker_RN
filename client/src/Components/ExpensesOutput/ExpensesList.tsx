import { expensesItem } from '@/src/types';
import { FC } from 'react';

import { FlatList, Text } from 'react-native';

function renderExpenseItem(itemData: any) {
  return <Text>{itemData.item.description}</Text>;
}

const ExpensesList: FC<{ expenses: expensesItem[] }> = ({ expenses }) => {
  return (
    <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
  );
};

export default ExpensesList;
