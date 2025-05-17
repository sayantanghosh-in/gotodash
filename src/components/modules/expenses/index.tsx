import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ExpensesContent from "@/components/modules/expenses/expenses-content";

const Expenses = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <CardDescription>Manage all your montly expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <ExpensesContent />
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-1 justify-end">
          Data stored in{" "}
          <a
            href="https://supabase.com"
            target="_blank"
            className="text-primary hover:underline decoration-wavy"
          >
            supabase
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Expenses;
