import { format, parseISO } from "date-fns";
import type { IExpense } from "@/utils/models";
import { FE_DATE_FORMAT_MONIFIED } from "@/utils/constants";
import { Trash2, Edit } from "lucide-react";

interface ExpenseProps {
  expense: IExpense;
}

const Expense = (props: ExpenseProps) => {
  return !props?.expense ? (
    <></>
  ) : (
    <div className="mt-2 grid grid-cols-[7fr_1fr] gap-2">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary text-wrap line-clamp-2 cursor-pointer hover:underline">
          {props?.expense?.expenseCategoryTitle || "--"}
        </p>
        {props?.expense?.updatedAt ? (
          <p className="text-xs">
            {format(
              parseISO(props?.expense?.updatedAt),
              FE_DATE_FORMAT_MONIFIED
            )}
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col gap-2 items-end">
        <p className="text-lg">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "INR",
          }).format(props?.expense?.amount)}
        </p>
        <div className="flex gap-2 items-center">
          <Edit
            size="16"
            className="text-primary bg-secondary cursor-pointer border-primary hover:border-2 hover:bg-primary hover:text-secondary"
            onClick={() => console.log(`${props?.expense?.id} Edit`)}
          />
          <Trash2
            size="16"
            className="text-primary bg-secondary cursor-pointer border-primary hover:border-2 hover:bg-primary hover:text-secondary"
            onClick={() => console.log(`${props?.expense?.id} Delete`)}
          />
        </div>
      </div>
    </div>
  );
};

export { Expense };
