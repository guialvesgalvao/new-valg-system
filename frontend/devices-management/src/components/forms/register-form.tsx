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

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  registerValidation,
  RegisterValidationType,
} from "@/shared/validations/register-validation";
import { UserRoundPlus } from "lucide-react";
import { FieldSpacer } from "./field-spacer";

export function RegisterForm() {
  const form = useForm<RegisterValidationType>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerValidation),
  });

  const { isLoading, isSubmitting } = form.formState;

  async function onSubmit(data: RegisterValidationType) {
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
            name="fullName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full h-12"
                    type="email"
                    placeholder="Enter your full name"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>
                  Must be at least 2 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full h-12"
                    type="email"
                    placeholder="Enter your email"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>
                  We'll never share your email with anyone else.
                </FormDescription>
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
                    className="w-full h-12"
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

          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full h-12"
                    type="password"
                    placeholder="Confirm your password"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>
                  Must be at least 8 characters long and match the password.
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
          disabled={isSubmitting || isLoading}
        >
          <UserRoundPlus size={20} />
          Sign up
        </Button>
      </form>
    </Form>
  );
}
