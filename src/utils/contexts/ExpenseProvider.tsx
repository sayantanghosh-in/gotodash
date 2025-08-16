import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
  useMemo,
} from "react";
import {
  addDays,
  format,
  isAfter,
  isSameDay,
  parseISO,
  startOfWeek,
} from "date-fns";
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
  totalMonthlySpends: number;
  dailyTotalExpensesForCurrentWeek: number[];
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
  const [isExpensesEverFetched, setIsExpensesEverFetched] =
    useState<boolean>(false);
  const [isExpenseCategoriesEverFetched, setIsExpenseCategoriesEverFetched] =
    useState<boolean>(false);

  const currentMonth = useRef(format(new Date(), "MMMM"));

  const totalMonthlySpends = useMemo(() => {
    if (Array?.isArray(expenses) && expenses?.length) {
      let total = 0;
      expenses?.forEach((e) => {
        total += e?.amount;
      });
      return total;
    }
    return 0;
  }, [expenses]);

  const dailyTotalExpensesForCurrentWeek = useMemo(() => {
    // Start from Sunday of the current week
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // Sunday

    // Initialize array for Sunday-Saturday
    const totals = new Array(7).fill(0);

    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(weekStart, i);

      // Future day: set to 0
      if (isAfter(currentDate, today)) {
        totals[i] = 0;
        continue;
      }

      // Aggregate expenses for this day
      const sumForDay = expenses.reduce((sum, expense) => {
        const expenseDate = parseISO(expense.updatedAt);
        return isSameDay(expenseDate, currentDate) ? sum + expense.amount : sum;
      }, 0);

      totals[i] = sumForDay;
    }

    return totals; // Array of 7 numbers
  }, [expenses]);

  const loadExpenses = useCallback(() => {
    setIsLoadingExpenses(true);
    setIsExpensesEverFetched(true);
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
    setIsExpenseCategoriesEverFetched(true);
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
    if (!isExpensesEverFetched && !expenses?.length) loadExpenses();
  }, [expenses?.length, isExpensesEverFetched, loadExpenses]);

  useEffect(() => {
    if (!isExpenseCategoriesEverFetched && !expenseCategories?.length)
      loadExpenseCategories();
  }, [
    expenseCategories?.length,
    isExpenseCategoriesEverFetched,
    loadExpenseCategories,
  ]);

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
        totalMonthlySpends,
        dailyTotalExpensesForCurrentWeek,
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
