import { useCallback, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { Plus, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense } from "@/components/modules/expenses/expense";
import type { IExpense } from "@/utils/models";
import { fetchExpensesForCurrentMonth } from "@/utils/api";
import { EditExpense } from "./edit-expense";

const ExpenseList = () => {
  const [isLoadingExpenses, setIsLoadingExpenses] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [newExpense, setNewExpense] = useState<IExpense | null>(null);
  const currentMonth = useRef<string>(format(new Date(), "MMMM"));

  const loadExpenses = useCallback(() => {
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
  }, [expenses]);

  useEffect(() => {
    if (
      typeof loadExpenses === "function" &&
      !(Array?.isArray(expenses) && expenses?.length)
    )
      loadExpenses();
  }, [expenses, loadExpenses]);

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-2">
          <p className="text-xl">Expenses for {currentMonth?.current}</p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                loadExpenses();
              }}
            >
              <RefreshCcw size={16} />
            </Button>
            <EditExpense
              isCreate
              expense={newExpense}
              onCreateOrEdit={console.log}
              trigger={
                /**
                 * Since button cannot be a child of button (in EditExpense, DialogTrigger is a button),
                 * we were getting a browser warning, hence using the asChild prop here and also wrapping
                 * the icon inside a div to display properly as the Button asChild was causing some issues
                 */
                <Button asChild variant="outline" size="icon">
                  <div className="w-[16px] h-[16px] p-4">
                    <Plus size={16} />
                  </div>
                </Button>
              }
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-64 overflow-hidden overflow-y-auto">
        {isLoadingExpenses ? (
          Array?.from({ length: 6 }, (_, index: number) => {
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
          <div className="w-full h-full flex justify-center items-center">
            No records found.
          </div>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

export { ExpenseList };
