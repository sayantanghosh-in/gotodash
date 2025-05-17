import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import ExpenseList from "@/components/modules/expenses/expense-list";

const ExpensesContent = () => {
  const [showTwoColumns, setShowTwoColumns] = useState<boolean>(
    window?.innerWidth > 1024
  );

  useEffect(() => {
    const callback = () => {
      setShowTwoColumns(window?.innerWidth > 1024);
    };
    window?.addEventListener("resize", callback);

    return () => {
      window?.removeEventListener("resize", callback);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction={showTwoColumns ? "horizontal" : "vertical"}
      className={`bg-secondary`}
    >
      <ResizablePanel defaultSize={showTwoColumns ? 50 : 100} minSize={30}>
        <ExpenseList />
      </ResizablePanel>
      {showTwoColumns ? <ResizableHandle withHandle /> : <></>}
      <ResizablePanel defaultSize={showTwoColumns ? 50 : 100} minSize={30}>
        <Card className="m-4">
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
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ExpensesContent;
