import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ComplaintSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import EmblaCarousel from "@/components/shared/Carousel";
import { createComplaint } from "@/actions/add-complaint";
import { toast } from "sonner";

const CreateComplaint = () => {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();
  const [previewImages, setPreviewImages] = React.useState<string[]>([]);

  const form = useForm<z.infer<typeof ComplaintSchema>>({
    resolver: zodResolver(ComplaintSchema),
    defaultValues: {
      title: "",
      description: "",
      attachments: [],
    },
  });

  function onSubmit(values: z.infer<typeof ComplaintSchema>) {
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);

    if (values.attachments && values.attachments.length > 0) {
      values.attachments.forEach((file: File) => {
        formData.append("attachments", file);
      });
    }

    startTransition(() => {
      createComplaint(formData).then((data: any) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const previewArray = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previewArray);
      form.setValue("attachments", fileArray);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>+ Create</DialogTrigger>
      <DialogContent className="max-h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add a Complaint</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Please fill out the form to submit your complaint. All submissions are
          anonymous, and you can upload supporting files like documents or
          images. Once submitted, the complaint cannot be edited or deleted.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-md">Title</Label>
                    <FormControl>
                      <Input
                        placeholder="Title of the complaint"
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-md">Description</Label>
                    <FormControl>
                      <Textarea
                        placeholder="Description of the complaint"
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
              <FormField
                control={form.control}
                name="attachments"
                render={() => (
                  <FormItem>
                    <Label className="text-md">
                      Attachments (Photos or Documents)
                    </Label>
                    <FormControl>
                      <Input
                        type="file"
                        className="w-full"
                        disabled={isPending}
                        onChange={handleFileChange}
                        multiple
                        accept="image/*"
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="mt-3">
                      {previewImages.length > 0 && (
                        <EmblaCarousel slides={previewImages} />
                      )}
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Upload Complaint</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateComplaint;
