import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useExpense } from "@/utils/contexts/ExpenseProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartColumn, Receipt } from "lucide-react";

const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig;

const ExpenseTrends = () => {
  const {
    isLoadingExpenses,
    totalMonthlySpends,
    dailyTotalExpensesForCurrentWeek,
  } = useExpense();
  const chartData = useMemo(
    () => [
      {
        day: "Sunday",
        amount: dailyTotalExpensesForCurrentWeek[0],
      },
      {
        day: "Monday",
        amount: dailyTotalExpensesForCurrentWeek[1],
      },
      {
        day: "Tuesday",
        amount: dailyTotalExpensesForCurrentWeek[2],
      },
      {
        day: "Wednesday",
        amount: dailyTotalExpensesForCurrentWeek[3],
      },
      {
        day: "Thursday",
        amount: dailyTotalExpensesForCurrentWeek[4],
      },
      {
        day: "Friday",
        amount: dailyTotalExpensesForCurrentWeek[5],
      },
      {
        day: "Saturday",
        amount: dailyTotalExpensesForCurrentWeek[6],
      },
    ],
    [dailyTotalExpensesForCurrentWeek]
  );

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>
          <p className="flex items-center gap-1.25 text-sm md:text-md">
            <ChartColumn size={18} color="var(--primary)" />
            <span>
              Spends: <span className="font-thin underline">This week</span>
            </span>
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-32 h-auto md:min-h-auto md:h-64 overflow-hidden overflow-y-auto flex flex-col justify-between">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer height={200}>
            <BarChart accessibilityLayer data={chartData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => value?.substring(0, 2)}
              />
              <Tooltip
                labelStyle={{
                  color: "var(--primary)",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
                formatter={(value) => [`₹${value}`, "Amount"]}
              />
              <Bar dataKey="amount" fill="var(--chart-1)" radius={4}></Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex items-center gap-1.25">
          <p className="text-sm md:text-md flex gap-0.75 items-center">
            <Receipt size={18} color="var(--primary)" />
            <span>Monthly Spends:</span>
          </p>
          {isLoadingExpenses ? (
            <Skeleton className="h-[28px] w-[120px]" />
          ) : (
            <p className="text-reg md:text-xl px-2 border-2 border-dashed animate-[blinkingBorder_2s_ease-in-out_infinite]">
              {totalMonthlySpends}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { ExpenseTrends };
