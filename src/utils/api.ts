import { BE_API_ENDPOINT } from "./constants";
import type { IExpense } from "./models";

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
