import React, { type ReactNode, useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateEditExpenseInput, IExpense } from "@/utils/models";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useExpense } from "@/utils/contexts/ExpenseProvider";

interface EditExpenseProps {
  isEditExpenseModalOpen: boolean;
  setIsEditExpenseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate?: boolean;
  onCreateOrEdit: (expense: CreateEditExpenseInput) => void;
  expense: IExpense | null;
  trigger: ReactNode;
}

const formSchema = z.object({
  expenseCategory: z.number({
    required_error: "Please select a valid expense category",
  }), // number because value will the id
  description: z.string().min(2, {
    message: "Description must be at least 2 characters",
  }),
  amount: z
    .number({
      coerce: true,
      message: "Please enter a valid number",
    })
    .min(0, {
      message: "Amount should be atleast 0",
    }),
  updatedAt: z.date({
    message: "Please select a valid date",
  }),
});

const EditExpense = (props: EditExpenseProps) => {
  const { expenseCategories } = useExpense();

  const [isCategoryPopoverOpen, setIsCategoryPopoverOpen] =
    useState<boolean>(false);
  const [isDatepickerOpen, setIsDatepickerOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenseCategory: props?.expense?.expenseCategory,
      description: props?.expense?.description || "",
      amount: props?.expense?.amount,
      updatedAt: props?.expense?.updatedAt
        ? new Date(props?.expense?.updatedAt)
        : new Date(),
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      if (typeof props?.onCreateOrEdit === "function") {
        const expensePayload: CreateEditExpenseInput = {
          ...(props?.isCreate ? {} : { id: props?.expense?.id }),
          description: values?.description,
          amount: values?.amount || 0,
          expenseCategory: values?.expenseCategory as number,
          updatedAt: values?.updatedAt?.toISOString(),
        };
        props?.onCreateOrEdit(expensePayload);
      } else {
        console.error(`ERR: Create/Edit expense form values`, values);
      }
    },
    [props?.isCreate, props?.expense?.id, props?.onCreateOrEdit]
  );

  useEffect(() => {
    if (props.isEditExpenseModalOpen) {
      form.reset({
        expenseCategory: props?.expense?.expenseCategory ?? undefined,
        description: props?.expense?.description ?? "",
        amount: props?.expense?.amount ?? undefined,
        updatedAt: props?.expense?.updatedAt
          ? new Date(props?.expense?.updatedAt)
          : new Date(),
      });
    } else {
      form.reset({
        expenseCategory: undefined,
        description: "",
        amount: undefined,
        updatedAt: new Date(),
      });
    }
  }, [form, props.isEditExpenseModalOpen, props.expense, props.isCreate]);

  return (
    <Dialog
      open={props?.isEditExpenseModalOpen}
      onOpenChange={props?.setIsEditExpenseModalOpen}
    >
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="expenseCategory"
              render={({ field }) => (
                <FormItem className="mb-4 flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <Popover
                    open={isCategoryPopoverOpen}
                    onOpenChange={setIsCategoryPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? expenseCategories.find(
                                (expenseCategory) =>
                                  expenseCategory.id === field.value
                              )?.title
                            : "Select a category"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="PopoverContent p-0"
                    >
                      <Command>
                        <CommandInput
                          placeholder="Search framework..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No expense category found</CommandEmpty>
                          <CommandGroup>
                            {expenseCategories.map((expenseCategory) => (
                              <CommandItem
                                value={expenseCategory.title}
                                key={expenseCategory.id}
                                onSelect={() => {
                                  form.setValue(
                                    "expenseCategory",
                                    expenseCategory.id
                                  );
                                  setIsCategoryPopoverOpen(false);
                                }}
                              >
                                {expenseCategory.title}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    expenseCategory.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-primary" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write something more about what the expense was for..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-primary" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Amount spent" {...field} />
                  </FormControl>
                  <FormMessage className="text-primary" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="updatedAt"
              render={({ field }) => (
                <FormItem className="mb-4 flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover
                    open={isDatepickerOpen}
                    onOpenChange={setIsDatepickerOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field?.value ? (
                            format(field?.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        required
                        mode="single"
                        selected={field.value}
                        onSelect={(e: Date) => {
                          field.onChange(e);
                          setIsDatepickerOpen(false);
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { EditExpense };
