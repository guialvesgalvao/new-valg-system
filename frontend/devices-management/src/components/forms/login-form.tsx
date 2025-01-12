"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  loginValidation,
  LoginValidationType,
} from "@/shared/validations/login-validation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import { FieldSpacer } from "./field-spacer";

import { AppPath } from "@/path";
import { authService } from "@/shared/http/factories/auth-factory";

import { toast } from "sonner";
import { redirect } from "next/navigation";
import { RedirectText } from "../redirect-text";
import { motion } from "framer-motion";

export function LoginForm() {
  const form = useForm<LoginValidationType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginValidation),
    mode: "all",
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(data: LoginValidationType) {
    try {
      const { email, password } = loginValidation.parse(data);

      toast.loading("Logging in...", {
        id: "login",
        description: "Please wait while we log you in.",
      });

      await authService.login(email, password);

      toast.success("Logged in successfully!", {
        id: "login",
        description: "You are now logged in, you will be redirected shortly.",
      });

      redirect(AppPath.Dashboard);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to log in. Please try again.", {
          id: "login",
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <FieldSpacer>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Email Address</FormLabel>

                  <RedirectText
                    className="text-xs underline"
                    href={AppPath.ForgotPassword}
                  >
                    Forgot password?
                  </RedirectText>
                </div>
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

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full h-10 md:h-12"
                    type="password"
                    placeholder="Enter your password"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>
                  Must be at least 8 characters long.
                </FormDescription>
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
          <LogIn size={20} />
          Log in
        </Button>
      </motion.form>
    </Form>
  );
}
