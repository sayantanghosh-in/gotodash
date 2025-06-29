import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { format } from "date-fns";
import { type IExpenseCategory, type IExpense } from "@/utils/models";
import {
  fetchExpenseCategories,
  fetchExpensesForCurrentMonth,
} from "@/utils/api";

type ExpenseContextType = {
  expenses: IExpense[];
  expenseCategories: IExpenseCategory[];
  isLoadingExpenses: boolean;
  isLoadingExpenseCategories: boolean;
  loadExpenses: () => void;
  loadExpenseCategories: () => void;
  currentMonth: string;
  newExpense: IExpense | null;
  setNewExpense: (e: IExpense | null) => void;
};

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(false);
  const [isLoadingExpenseCategories, setIsLoadingExpenseCategories] =
    useState(false);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<
    IExpenseCategory[]
  >([]);
  const [newExpense, setNewExpense] = useState<IExpense | null>(null);
  const currentMonth = useRef(format(new Date(), "MMMM"));

  const loadExpenses = useCallback(() => {
    setIsLoadingExpenses(true);
    fetchExpensesForCurrentMonth()
      .then((res) => {
        setIsLoadingExpenses(false);
        if (Array.isArray(res?.data)) {
          setExpenses(
            res.data.map((expense) => ({
              id: expense.id,
              amount: expense.amount,
              expenseCategory: expense.expense_category,
              expenseCategoryTitle: expense.expense_category_title,
              updatedAt: expense.updated_at,
              description: expense.description,
            }))
          );
        } else {
          console.error(res?.error);
          setExpenses([]);
        }
      })
      .catch((err) => {
        setIsLoadingExpenses(false);
        console.error(err);
        setExpenses([]);
      });
  }, []);

  const loadExpenseCategories = useCallback(() => {
    setIsLoadingExpenseCategories(true);
    fetchExpenseCategories()
      .then((res) => {
        setIsLoadingExpenseCategories(false);
        if (Array.isArray(res?.data)) {
          setExpenseCategories(
            res.data.map((category) => ({
              id: category.id,
              title: category.title,
              description: category.description,
              maxAmountPerMonth: category.max_amount_per_month,
              updatedAt: category.updated_at,
            }))
          );
        } else {
          console.error(res?.error);
          setExpenseCategories([]);
        }
      })
      .catch((err) => {
        setIsLoadingExpenseCategories(false);
        console.error(err);
        setExpenseCategories([]);
      });
  }, []);

  useEffect(() => {
    if (!expenses.length) loadExpenses();
  }, []);

  useEffect(() => {
    if (!expenseCategories.length) loadExpenseCategories();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        expenseCategories,
        isLoadingExpenses,
        isLoadingExpenseCategories,
        loadExpenses,
        loadExpenseCategories,
        currentMonth: currentMonth.current,
        newExpense,
        setNewExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const ctx = useContext(ExpenseContext);
  if (!ctx)
    throw new Error("useExpense must be used within an <ExpenseProvider>");
  return ctx;
};
