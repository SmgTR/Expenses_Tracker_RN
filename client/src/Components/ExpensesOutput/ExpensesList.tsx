import { Expense, ExpensesListComponent } from '@/types';
import { FC } from 'react';

import { FlatList } from 'react-native';
import ExpensesItem from './ExpensesItem';

function renderExpenseItem({ item }: { item: Expense }) {
  return <ExpensesItem {...item} />;
}

const ExpensesList: FC<ExpensesListComponent> = ({ expenses }) => {
  return (
    <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
  );
};

export default ExpensesList;
