import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense } from "@/components/modules/expenses/expense";
import type { IExpense } from "@/utils/models";

const mockExpenses: IExpense[] = Array?.from(
  { length: 5 },
  (_, index: number) => {
    return {
      id: index + 1,
      description: "Expense " + (index + 1),
      amount: (index + 1) * 10,
      updatedAt: new Date(),
      expenseCategory: index + 1,
      expenseCategoryTitle: "Expense Category " + (index + 1),
    };
  }
);

const ExpenseList = () => {
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p>Expenses</p>
          <Button variant="outline" size="icon">
            <Plus size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-64 overflow-hidden overflow-y-auto">
        {mockExpenses?.map((expense: IExpense) => {
          return <Expense key={expense?.id} expense={expense} />;
        })}
      </CardContent>
    </Card>
  );
};

export { ExpenseList };
