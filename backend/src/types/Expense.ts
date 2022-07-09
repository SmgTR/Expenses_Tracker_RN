export interface ExpenseType {
  amount: number;
  description: string;
  date: Date;
}

export interface ExpenseOutput {
  id: number;
  amount: number;
  description: string;
  date: Date;
}
