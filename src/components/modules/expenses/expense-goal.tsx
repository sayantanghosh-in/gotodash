import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useExpense } from "@/utils/contexts/ExpenseProvider";
import { CircleCheck, Goal, Loader, PartyPopper, Siren } from "lucide-react";

const ExpenseGoal = () => {
  const { expenseCategoryGoals, isLoadingExpenseCategoryGoals } = useExpense();

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>
          <p className="flex items-center gap-1.25 text-sm md:text-md">
            <Goal size={18} color="var(--primary)" />
            <span>Goal</span>
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-64 md:min-h-auto md:h-64 overflow-hidden overflow-y-auto flex flex-col justify-between">
        {isLoadingExpenseCategoryGoals ? (
          Array?.from({ length: 6 }, (_, index: number) => {
            return (
              <div
                key={`expense-loader-${index}`}
                className="flex flex-col gap-2 mb-2"
              >
                <div className="flex flex-col gap-0.5">
                  <Skeleton className="h-[16px] w-[200px]" />
                  <Skeleton className="h-[16px] w-[100px]" />
                </div>
                <Skeleton className="h-[16px] w-[100px]" />
              </div>
            );
          })
        ) : Array?.isArray(expenseCategoryGoals) &&
          expenseCategoryGoals?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {expenseCategoryGoals?.map((goal, goalIndex) => {
              return (
                <div className="flex flex-col">
                  {goalIndex > 0 &&
                  ((goal?.amountPending > 0 &&
                    expenseCategoryGoals[goalIndex - 1]?.amountPending < 0) ||
                    (goal?.amountPending === 0 &&
                      (expenseCategoryGoals[goalIndex - 1]?.amountPending > 0 ||
                        expenseCategoryGoals[goalIndex - 1]?.amountPending <
                          0))) ? (
                    <div className="mb-2 w-full h-px bg-border" />
                  ) : (
                    <></>
                  )}
                  <div
                    className="flex gap-2 justify-between items-start"
                    key={`expense-category-goal-${goalIndex}`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <p
                        className={
                          goal?.amountPending === 0
                            ? "text-sm md:text-md font-bold text-green-500"
                            : goal?.amountPending > 0
                            ? "text-sm md:text-md font-bold text-primary"
                            : "text-sm md:text-md font-bold text-destructive"
                        }
                      >
                        {goal.expenseCategoryTitle}
                      </p>
                      <p className="text-xs flex items-center gap-0.5">
                        <span
                          className={
                            goal?.amountPending < 0
                              ? "text-destructive"
                              : goal?.amountPending === 0
                              ? "text-green-500"
                              : ""
                          }
                        >
                          {goal?.amountPending === 0
                            ? "Goal Complete"
                            : goal?.amountPending > 0
                            ? "In progress"
                            : "Excess spent"}
                        </span>
                        {goal?.amountPending === 0 ? (
                          <PartyPopper size={12} className="text-green-500" />
                        ) : goal?.amountPending > 0 ? (
                          <Loader size={12} color="var(--primary)" />
                        ) : (
                          <Siren size={12} color="var(--destructive)" />
                        )}
                      </p>
                    </div>
                    {goal?.amountPending === 0 ? (
                      <CircleCheck size={16} className="text-green-500" />
                    ) : (
                      <p
                        className={
                          goal?.amountPending < 0
                            ? "text-destructive font-medium text-sm md:text-md"
                            : "font-medium text-sm md:text-md"
                        }
                      >
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "INR",
                        }).format(goal?.amountPending)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

export { ExpenseGoal };
