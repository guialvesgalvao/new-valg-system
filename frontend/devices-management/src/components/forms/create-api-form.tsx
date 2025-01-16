"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createApiValidation,
  CreateApiValidationType,
} from "@/shared/validations/create-api-validation";

import { motion } from "framer-motion";
import { FieldSpacer } from "./field-spacer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { delay } from "@/lib/mock";

interface ICreateApiFormProps {
  onSave?: (data: CreateApiValidationType) => void;
}

export function CreateApiForm(props: Readonly<ICreateApiFormProps>) {
  const { onSave } = props;

  const form = useForm<CreateApiValidationType>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(createApiValidation),
    mode: "all",
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(data: CreateApiValidationType) {
    try {
      const { name, description } = createApiValidation.parse(data);

      toast.loading("Creating API...", {
        id: "create-api",
        description: "Please wait while we create your API.",
      });

      await delay(2000);

      form.reset();
      if (onSave) onSave(data);

      toast.success("API created successfully!", {
        id: "create-api",
        description: "Your API has been created successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to create API", {
          id: "create-api",
          description: error.message,
        });
      }
    }
  }

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <FieldSpacer>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Name</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    className="w-full h-10 md:h-12"
                    type="text"
                    placeholder="Enter your api name"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>

                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full min-h-10 md:min-h-12"
                    placeholder="Enter your api description"
                    value={field.value ?? ""}
                    rows={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="h-12 gap-x-2"
            variant="default"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            <Plus size={20} />
            Create API
          </Button>
        </FieldSpacer>
      </motion.form>
    </Form>
  );
}
