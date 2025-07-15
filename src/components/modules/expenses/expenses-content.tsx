import { ExpenseList } from "@/components/modules/expenses/expense-list";
import { ExpenseTrends } from "./expense-trends";

const ExpensesContent = () => {
  return (
    <div className="bg-chart-5 shadow grid grid-cols-1 xl:grid-cols-[3fr_5fr] p-2 md:p-4 gap-4">
      <ExpenseTrends />
      <ExpenseList />
    </div>
  );
};

export { ExpensesContent };
