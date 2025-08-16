import { ExpenseProvider } from "@/utils/contexts/ExpenseProvider";

import { ExpensesContent } from "@/components/modules/expenses/expenses-content";

const Expenses = () => {
  return (
    <ExpenseProvider>
      <ExpensesContent />
    </ExpenseProvider>
  );
};

export default Expenses;
