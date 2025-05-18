export interface IExpense {
  id: number;
  description?: string;
  amount: number;
  updatedAt: Date;
  expenseCategory: IExpenseCategory["id"];
  expenseCategoryTitle: IExpenseCategory["title"];
}

export interface IExpenseCategory {
  id: number;
  title: string;
  description: string;
  maxAmountPerMonth: number;
  updatedAt: Date;
}
