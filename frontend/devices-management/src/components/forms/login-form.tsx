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

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RedirectText } from "../redirect-text";
import { motion } from "framer-motion";
import { FieldRowWrapper } from "./field-row-wrapper";

import { ApiErrorResponse } from "@/shared/http/errors";

export function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginValidationType>({
    defaultValues: {
      email: "teste332@gmail.com",
      password: "123456789",
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

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = (await response.json()) as ApiErrorResponse;
        throw new Error(error.message);
      }

      toast.success("Logged in successfully!", {
        id: "login",
        description: "You are now logged in, you will be redirected shortly.",
      });

      // router.push(AppPath.Dashboard);
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
                <FieldRowWrapper>
                  <FormLabel required>Email Address</FormLabel>

                  <RedirectText
                    className="text-xs underline"
                    href={AppPath.ForgotPassword}
                  >
                    Forgot password?
                  </RedirectText>
                </FieldRowWrapper>
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
                <FormLabel required>Password</FormLabel>
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

        <Button
          type="button"
          onClick={async () => {
            try {
              const response = await fetch("/api/token/create-life-token", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              });

              if (!response.ok) {
                const error = (await response.json()) as ApiErrorResponse;
                throw new Error(error.message);
              }

              toast.success("Token refreshed successfully!", {
                id: "refresh",
                description: "Token refreshed successfully!",
              });
            } catch (error) {
              if (error instanceof Error) {
                toast.error("Failed to refresh token. Please try again.", {
                  id: "refresh",
                  description: error.message,
                });
              }
            }
          }}
        >
          Criar long life token
        </Button>
      </motion.form>
    </Form>
  );
}
