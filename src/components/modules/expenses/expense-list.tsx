import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExpenseList = () => {
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p>Expenses</p>
          <Button variant="outline" size="icon">
            <Plus size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
          explicabo iusto commodi, deleniti asperiores accusamus aliquid,
          obcaecati sint perspiciatis ipsum tempora facere libero cupiditate
          sequi hic perferendis corrupti laborum ducimus!
        </p>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
