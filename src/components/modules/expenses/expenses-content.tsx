import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ExpenseList } from "@/components/modules/expenses/expense-list";

const ExpensesContent = () => {
  return (
    <div className="bg-chart-5 grid grid-cols-1 xl:grid-cols-2 p-4 gap-4">
      <ExpenseList />
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <p>Categories</p>
            <Button variant="outline" size="icon">
              <Plus size={16} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Expense categories</p>
        </CardContent>
      </Card>
    </div>
  );
};

export { ExpensesContent };
