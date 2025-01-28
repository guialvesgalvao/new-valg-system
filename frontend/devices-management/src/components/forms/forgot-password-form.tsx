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
import { toast } from "sonner";

import { motion } from "framer-motion";

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordValidationType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordValidation),
    mode: "all",
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(data: ForgotPasswordValidationType) {
    try {
      const { email } = forgotPasswordValidation.parse(data);

      toast.loading("Sending email...", {
        id: "forgot-password",
        description: "Please wait while we send you an email.",
      });

      toast.success("Email sent successfully!", {
        id: "forgot-password",
        description: "We have sent you an email, please check your inbox.",
      });

      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to send email", {
          id: "forgot-password",
          description: error.message,
        });
      }
    }
  }

  return (
    <Form {...form}>
      <motion.form
        className="w-full flex flex-col gap-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldSpacer>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email Address</FormLabel>

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
          disabled={isSubmitting || !isValid}
        >
          <Send size={20} />
          Reset Password
        </Button>
      </motion.form>
    </Form>
  );
}
