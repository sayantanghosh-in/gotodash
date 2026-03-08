export type ExpenseCategoryType = "SPEND" | "SAVINGS";

export interface IExpense {
  id: number;
  description?: string;
  amount: number;
  updatedAt: string;
  expenseCategory: IExpenseCategory["id"];
  expenseCategoryTitle: IExpenseCategory["title"];
  expenseCategoryType: ExpenseCategoryType;
}

export type CreateEditExpenseInput = {
  id?: number;
} & Pick<
  IExpense,
  | "description"
  | "amount"
  | "updatedAt"
  | "expenseCategory"
  | "expenseCategoryType"
>;

export interface IExpenseCategory {
  id: number;
  title: string;
  type: ExpenseCategoryType;
  description: string;
  maxAmountPerMonth: number;
  updatedAt: Date;
}

export interface IExpenseCategoryGoalData {
  expense_category_title: string;
  expense_category_type: ExpenseCategoryType;
  amount_pending: number;
  amount_spent: number;
}

export interface IExpenseCategoryGoal {
  expenseCategoryTitle: string;
  expenseCategoryType: ExpenseCategoryType;
  amountSpent: number;
  amountPending: number;
}

export interface IGithubContribution {
  date: string;
  count: number;
  level: number;
  isPadding?: boolean; // flag to denote the start and end padding for contribution chart
}
