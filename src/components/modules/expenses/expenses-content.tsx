import { ExpenseList } from "@/components/modules/expenses/expense-list";
import { ExpenseTrends } from "@/components/modules/expenses/expense-trends";
import { ExpenseGoal } from "@/components/modules/expenses/expense-goal";

const ExpensesContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ExpenseGoal />
      <ExpenseTrends />
      <ExpenseList />
    </div>
  );
};

export { ExpensesContent };
