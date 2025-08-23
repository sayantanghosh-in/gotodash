export interface IExpense {
  id: number;
  description?: string;
  amount: number;
  updatedAt: string;
  expenseCategory: IExpenseCategory["id"];
  expenseCategoryTitle: IExpenseCategory["title"];
}

export type CreateEditExpenseInput = {
  id?: number;
} & Pick<IExpense, "description" | "amount" | "updatedAt" | "expenseCategory">;

export interface IExpenseCategory {
  id: number;
  title: string;
  description: string;
  maxAmountPerMonth: number;
  updatedAt: Date;
}

export interface IExpenseCategoryGoalData {
  expense_category_title: string;
  amount_pending: number;
  amount_spent: number;
}

export interface IExpenseCategoryGoal {
  expenseCategoryTitle: string;
  amountSpent: number;
  amountPending: number;
}

export interface IGithubContribution {
  date: string;
  count: number;
  level: number;
  isPadding?: boolean; // flag to denote the start and end padding for contribution chart
}
