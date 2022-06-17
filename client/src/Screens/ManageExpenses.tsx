import { AppRootParamList } from 'navigation';
import { FC, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AppRootParamList, 'ManageExpense'>;

const ManageExpenses: FC<Props> = ({ route, navigation }) => {
  const editedExpenseId = route?.params;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  console.log(navigation);

  return (
    <View>
      <Text>ManageExpenses</Text>
    </View>
  );
};

export default ManageExpenses;
