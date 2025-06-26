import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense } from "@/components/modules/expenses/expense";
import type { IExpense } from "@/utils/models";
import { fetchExpensesForCurrentMonth } from "@/utils/api";

const ExpenseList = () => {
  const [isLoadingExpenses, setIsLoadingExpenses] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    if (!(Array?.isArray(expenses) && expenses?.length)) {
      setIsLoadingExpenses(true);
      fetchExpensesForCurrentMonth()
        .then((res) => {
          setIsLoadingExpenses(false);
          if (Array?.isArray(res?.data)) {
            setExpenses(
              res?.data?.map((expense) => {
                return {
                  id: expense?.id,
                  amount: expense?.amount,
                  expenseCategory: expense?.expense_category,
                  expenseCategoryTitle: expense?.expense_category_title,
                  updatedAt: expense?.updated_at,
                  description: expense?.description,
                };
              })
            );
          } else if (res?.error) {
            setIsLoadingExpenses(true);
            console.error(res?.error);
            setExpenses([]);
          }
        })
        ?.catch((err) => {
          setIsLoadingExpenses(false);
          console.error(err);
          setExpenses([]);
        });
    }
  }, []);

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
        {isLoadingExpenses ? (
          Array?.from({ length: 4 }, (_, index: number) => {
            return (
              <div
                key={`expense-loader-${index}`}
                className="flex flex-col gap-2 mb-2"
              >
                <div className="flex justify-between gap-4">
                  <Skeleton className="h-[16px] w-[200px]" />
                  <Skeleton className="h-[16px] w-[100px]" />
                </div>
                <div className="flex justify-between gap-4">
                  <Skeleton className="h-[16px] w-[100px]" />
                </div>
              </div>
            );
          })
        ) : Array?.isArray(expenses) && expenses?.length ? (
          expenses?.map((expense: IExpense) => {
            return <Expense key={expense?.id} expense={expense} />;
          })
        ) : !isLoadingExpenses ? (
          <p>No records found.</p>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

export { ExpenseList };
