import { type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteExpenseProps {
  isDeleteExpenseModalOpen: boolean;
  setIsDeleteExpenseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: ReactNode;
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const DeleteExpense = (props: DeleteExpenseProps) => {
  return (
    <Dialog>
      <DialogTrigger>{props?.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            expense record.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={
              typeof props?.onDelete === "function"
                ? props?.onDelete
                : console.error
            }
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DeleteExpense };
