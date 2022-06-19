import { Alert, StyleSheet, Text, View } from 'react-native';
import Input from '@/Components/UI/Input';
import { FC, useState } from 'react';
import { Button } from '@/Components';
import { ExpensesFormType } from '@/types';
import { GlobalStyles } from '@/Constants/styles';

const ExpenseForm: FC<ExpensesFormType> = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues
}) => {
  const [inputValues, setInputsValues] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true
    },
    date: { value: defaultValues ? defaultValues.date : '', isValid: true }
  });

  const inputChangeHandler = (value: string, key: string) => {
    setInputsValues((state) => ({ ...state, ...{ [key]: { value, isValid: true } } }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: inputValues.date.value,
      description: inputValues.description.value
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = new Date(expenseData.date).toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputsValues((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: { value: curInputs.description.value, isValid: descriptionIsValid }
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputValues.amount.isValid || !inputValues.description.isValid || !inputValues.date.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: (value) => inputChangeHandler(value, 'amount'),
            value: inputValues.amount.value
          }}
          testID="formAmount"
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (value) => inputChangeHandler(value, 'date'),
            value: inputValues.date.value
          }}
          testID="formDate"
        />
      </View>
      <Input
        label="Description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (value) => inputChangeHandler(value, 'description'),
          value: inputValues.description.value
        }}
        testID="formDescription"
      />
      <Text style={styles.errorText}>
        {formIsInvalid && <Text>Invalid input values- please check your inputs</Text>}
      </Text>
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
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  }
});
