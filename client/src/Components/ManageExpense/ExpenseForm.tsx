import { Alert, StyleSheet, Text, View } from 'react-native';
import Input from '@/Components/UI/Input';
import { FC, useState } from 'react';
import { Button } from '@/Components';
import { ExpensesFormType } from '@/types';

const ExpenseForm: FC<ExpensesFormType> = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues
}) => {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : '',
    description: defaultValues ? defaultValues.description : '',
    date: defaultValues ? defaultValues.date : ''
  });

  const inputChangeHandler = (value: string, key: string) => {
    setInputValues((state) => ({ ...state, ...{ [key]: value } }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: inputValues.date,
      description: inputValues.description
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = new Date(expenseData.date).toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert('Invalid input', 'Please check your input values');
      return;
    }

    onSubmit(expenseData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: (value) => inputChangeHandler(value, 'amount'),
            value: inputValues.amount
          }}
          testID="formAmount"
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (value) => inputChangeHandler(value, 'date'),
            value: inputValues.date
          }}
          testID="formDate"
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: (value) => inputChangeHandler(value, 'description'),
          value: inputValues.description
        }}
        testID="formDescription"
      />

      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
});
