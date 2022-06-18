import { AppRootParamList } from 'types/navigation';
import { FC, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import IconButton from '@/Components/UI/IconButton';
import { GlobalStyles } from '@/Constants/styles';
import Button from '@/Components/UI/Button';
import { useAppDispatch } from '@/redux/hooks';
import { addExpense, deleteExpense, updateExpense } from '@/redux/slices/expenses-slice';

type Props = NativeStackScreenProps<AppRootParamList, 'ManageExpense'>;

const ManageExpenses: FC<Props> = ({ route, navigation }) => {
  const editedExpenseId = route?.params;
  const isEditing = !!editedExpenseId;

  const dispatch = useAppDispatch();

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

  const confirmHandler = () => {
    if (isEditing) {
      dispatch(
        updateExpense({
          id: editedExpenseId.expenseId,
          expenseChanges: {
            description: 'Appetite for Destruction',
            amount: 24.99,
            date: '2022-06-12'
          }
        })
      );
    } else {
      dispatch(
        addExpense({
          id: Math.random(),
          description: 'Motorhead',
          amount: 19.99,
          date: new Date().toString()
        })
      );
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
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
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
