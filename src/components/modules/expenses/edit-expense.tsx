import { type ReactNode, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { IExpense } from "@/utils/models";

interface EditExpenseProps {
  isCreate?: boolean;
  onCreateOrEdit: (expense: IExpense) => void;
  expense: IExpense | null;
  trigger: ReactNode;
}

const EditExpense = (props: EditExpenseProps) => {
  const handleSubmit = useCallback(() => {
    if (props?.expense?.id && typeof props?.onCreateOrEdit === "function") {
      props?.onCreateOrEdit(props?.expense);
    }
  }, [props?.expense, props?.onCreateOrEdit]);
  return (
    <Dialog>
      <DialogTrigger className="flex flex-start">
        {props?.trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {props?.isCreate ? "Create" : "Edit"} Expense
          </DialogTitle>
          <DialogDescription>
            {props?.isCreate
              ? "Create a new expense record"
              : "Edit your expense record"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { EditExpense };
