import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Expenses = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <CardDescription>Manage all your montly expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResizablePanelGroup direction="horizontal" className="bg-secondary">
          <ResizablePanel defaultSize={50} minSize={30}>
            <Card className="m-4">
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
                  explicabo iusto commodi, deleniti asperiores accusamus
                  aliquid, obcaecati sint perspiciatis ipsum tempora facere
                  libero cupiditate sequi hic perferendis corrupti laborum
                  ducimus!
                </p>
              </CardContent>
            </Card>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <Card className="m-4">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Expense categories</p>
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
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
