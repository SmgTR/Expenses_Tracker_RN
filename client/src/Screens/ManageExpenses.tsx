import { AppRootParamList } from 'types/navigation';
import { FC, useLayoutEffect } from 'react';
import { View, StyleSheet, Pressable, Keyboard } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import IconButton from '@/Components/UI/IconButton';
import { GlobalStyles } from '@/Constants/styles';
import ExpenseForm from '@/Components/ManageExpense/ExpenseForm';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addExpense, deleteExpense, updateExpense } from '@/redux/slices/expenses-slice';
import { createExpense } from '@/redux/services/expense';

import { ExpenseInputsType } from '@/types';

type Props = NativeStackScreenProps<AppRootParamList, 'ManageExpense'>;

const ManageExpenses: FC<Props> = ({ route, navigation }) => {
  const editedExpenseId = route?.params;
  const isEditing = !!editedExpenseId;

  const dispatch = useAppDispatch();

  const [selectedExpense] = useAppSelector((state) => state.expenses).filter(
    (expense) => expense.id === route?.params?.expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    dispatch(deleteExpense(editedExpenseId));
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData: ExpenseInputsType) => {
    if (isEditing) {
      dispatch(
        updateExpense({
          id: editedExpenseId.expenseId,
          expenseChanges: { ...expenseData }
        })
      );
    } else {
      dispatch(
        createExpense({
          ...expenseData
        })
      );
    }
    navigation.goBack();
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View>
        <ExpenseForm
          onCancel={cancelHandler}
          submitButtonLabel={isEditing ? 'Update' : 'Add'}
          onSubmit={confirmHandler}
          defaultValues={selectedExpense}
        />

        {isEditing && (
          <View style={styles.deleteContainer} testID="manageDelete">
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={deleteExpenseHandler}
              testID="deleteButton"
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});
