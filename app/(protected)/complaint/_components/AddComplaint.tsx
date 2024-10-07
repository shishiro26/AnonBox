"use client";
import { addComment } from "@/actions/add-comment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const AddComplaint = ({ id }: { id: string }) => {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      complaintId: id,
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof CommentSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      addComment(values).then((data: any) => {
        if (data?.success) {
          toast.success("Complaint created successfully!");
          form.reset();
          window.location.reload();
        }
        if (data?.error) {
          toast.error(data?.error);
        }
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Add a comment"
                    autoComplete="off"
                    className="w-full"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddComplaint;
