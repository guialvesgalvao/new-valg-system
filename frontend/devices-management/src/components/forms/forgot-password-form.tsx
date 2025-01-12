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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { FieldSpacer } from "./field-spacer";

import {
  forgotPasswordValidation,
  ForgotPasswordValidationType,
} from "@/shared/validations/forgot-password-validation";

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordValidationType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordValidation),
  });

  const { isLoading, isSubmitting, isValid } = form.formState;

  async function onSubmit(data: ForgotPasswordValidationType) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldSpacer>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    className="w-full h-10 md:h-12"
                    type="email"
                    placeholder="Enter your email"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldSpacer>

        <Button
          className="h-12 gap-x-2"
          variant="default"
          type="submit"
          disabled={isSubmitting || isLoading || !isValid}
        >
          <Send size={20} />
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
