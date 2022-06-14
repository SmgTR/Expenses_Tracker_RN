import { expensesItem } from '@/types';
import { FC } from 'react';

import { FlatList } from 'react-native';
import ExpensesItem from './ExpensesItem';

function renderExpenseItem({ item }: { item: expensesItem }) {
  return <ExpensesItem {...item} />;
}

const ExpensesList: FC<{ expenses: expensesItem[] }> = ({ expenses }) => {
  return (
    <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
  );
};

export default ExpensesList;
