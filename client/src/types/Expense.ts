export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export interface ExpenseInputsType {
  description: string;
  amount: number;
  date: string;
}
