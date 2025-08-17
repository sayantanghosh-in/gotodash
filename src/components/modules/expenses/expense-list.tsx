import { useState } from "react";
import { CircleDollarSign, Plus, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Expense } from "@/components/modules/expenses/expense";
import { type CreateEditExpenseInput, type IExpense } from "@/utils/models";
import { EditExpense } from "./edit-expense";
import { useExpense } from "@/utils/contexts/ExpenseProvider";
import { createEditExpense } from "@/utils/api";

const ExpenseList = () => {
  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] =
    useState<boolean>(false);

  const {
    currentMonth,
    expenses,
    loadExpenses,
    loadExpenseCategoryGoals,
    newExpense,
    isLoadingExpenses,
  } = useExpense();

  const handleCreateExpense = (expense: CreateEditExpenseInput) => {
    createEditExpense(expense, "create")
      ?.then((res) => {
        if (!res?.error) {
          toast("Your expense was recorded successfully", {
            position: "top-center",
          });
          setIsEditExpenseModalOpen(false);
          loadExpenses();
          loadExpenseCategoryGoals();
        } else {
          toast?.error(
            res?.error ||
              "Something went wrong while creating the expense record",
            {
              position: "top-center",
              style: {
                background: "red",
                color: "var(--error-toast-foreground)",
              },
            }
          );
        }
      })
      ?.catch((error) => {
        toast?.error(
          error?.message ||
            "Something went wrong while creating the expense record",
          {
            position: "top-center",
            style: {
              background: "red",
              color: "var(--error-toast-foreground)",
            },
          }
        );
      });
  };

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-2">
          <p className="flex items-center gap-1.25 text-sm md:text-md">
            <CircleDollarSign size={18} color="var(--primary)" />
            <span>
              Payments {currentMonth}, {new Date().getFullYear()}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="icon"
              onClick={() => {
                loadExpenses();
                loadExpenseCategoryGoals();
              }}
            >
              <div className="w-[16px] h-[16px] p-4">
                <RefreshCcw size={16} />
              </div>
            </Button>
            <EditExpense
              isCreate
              isEditExpenseModalOpen={isEditExpenseModalOpen}
              setIsEditExpenseModalOpen={setIsEditExpenseModalOpen}
              expense={newExpense}
              onCreateOrEdit={handleCreateExpense}
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
          <div className="flex flex-col gap-3 md:gap-2">
            {expenses?.map((expense: IExpense) => {
              return <Expense key={expense?.id} expense={expense} />;
            })}
          </div>
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
