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
import { RedirectText } from "./../../app/(auth)/_components/redirect-text";
import { AppPath } from "@/path";

export function LoginForm() {
  const form = useForm<LoginValidationType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginValidation),
  });

  const { isLoading, isSubmitting, isValid } = form.formState;

  async function onSubmit(data: LoginValidationType) {
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
          disabled={isSubmitting || isLoading || !isValid}
        >
          <LogIn size={20} />
          Log in
        </Button>
      </form>
    </Form>
  );
}
