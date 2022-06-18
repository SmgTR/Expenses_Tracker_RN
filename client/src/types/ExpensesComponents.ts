import { Expense } from './Expense';

export interface ExpensesOutputComponent {
  expensesPeriod: string;
  expensesList: Expense[];
  fallbackText: string;
}

export interface ExpensesListComponent {
  expenses: Expense[];
}

export interface ExpensesSummaryComponent {
  periodName: String;
  expenses: Expense[];
}

export interface ExpensesFormType {
  onCancel: Function;
  onSubmit: Function;
  submitButtonLabel: string;
}
