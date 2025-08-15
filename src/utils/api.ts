import { BE_API_ENDPOINT } from "./constants";
import type {
  CreateEditExpenseInput,
  IExpense,
  IExpenseCategory,
} from "./models";

/**
 * Description: Fetches the expenses for the current month.
 * @returns {Promise<{ data: IExpense }>} - The data from the endpoint.
 */

export const fetchExpensesForCurrentMonth = (): Promise<{
  data: IExpense;
  error?: string;
}> => {
  return fetch(BE_API_ENDPOINT + "/expenses/monthly")?.then((res) =>
    res?.json()
  );
};

/**
 * Description: Fetches the expense categories
 * @returns {Promise<{ data: IExpenseCategory }>} - The data from the endpoint.
 */

export const fetchExpenseCategories = (): Promise<{
  data: IExpenseCategory;
  error?: string;
}> => {
  return fetch(BE_API_ENDPOINT + "/expenses-category/all")?.then((res) =>
    res?.json()
  );
};

/**
 * Description: Create / Edit expenses
 * @returns {Promise<{ data: IExpense[], error?: string }>} - The data from the endpoint.
 */

export const createEditExpense = (
  expense: CreateEditExpenseInput,
  operation: "create" | "edit"
): Promise<{
  data: IExpenseCategory;
  error?: string;
}> => {
  try {
    const expensePayload = {
      ...(operation === "edit" ? { id: expense?.id } : {}),
      description: expense?.description,
      amount: expense?.amount,
      expense_category: expense?.expenseCategory,
      updated_at: new Date(expense?.updatedAt)?.toISOString(),
    };
    return fetch(BE_API_ENDPOINT + "/expenses", {
      method: operation === "create" ? "POST" : "PUT",
      body: JSON.stringify(expensePayload),
    })?.then((res) => res?.json());
  } catch (e) {
    console.error(`Create / Edit expense error`, e);
    return Promise?.reject(e);
  }
};

/**
 * Description: Delete expense
 * @returns {Promise<{ success: boolean, error?: string }>} - The data from the endpoint.
 */

export const deleteExpense = (
  id: number
): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const expensePayload = {
      id,
    };
    return fetch(BE_API_ENDPOINT + "/expenses", {
      method: "DELETE",
      body: JSON.stringify(expensePayload),
    })?.then((res) => res?.json());
  } catch (e) {
    console.error(`Delete expense error`, e);
    return Promise?.reject(e);
  }
};

/**
 * Description: API to check if there is an existing session
 * @returns {Promise<{ user?: any, status?: number, error?: string }>} - The data from the endpoint.
 */
export const checkSession = (): Promise<{
  status?: number;
  error?: string;
  user?: {
    id: string;
    email: string;
  };
}> => {
  try {
    return fetch(BE_API_ENDPOINT + "/auth/me", {
      credentials: "include",
    })?.then((res) => res?.json());
  } catch (e) {
    console.error(`Delete expense error`, e);
    return Promise?.reject(e);
  }
};
