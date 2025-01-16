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
import { toast } from "sonner";
import { authService } from "@/shared/http/factories/auth-factory";
import { redirect } from "next/navigation";
import { AppPath } from "@/path";
import { motion } from "framer-motion";
import { PhoneInput } from "../ui/phone-input";
import { useRouter } from "next/router";

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterValidationType>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerValidation),
    mode: "all",
  });

  const { isLoading, isSubmitting, isValid } = form.formState;

  async function onSubmit(data: RegisterValidationType) {
    try {
      const { name, phone, email, password, confirmPassword } =
        registerValidation.parse(data);

      toast.loading("Registering...", {
        id: "register",
        description: "Please wait while we register you.",
      });

      await authService.register({
        name,
        phone,
        email,
        password,
        confirmPassword,
      });

      toast.success("Registered successfully!", {
        id: "register",
        description: "You are now registered, you will be redirected shortly.",
      });

      router.push(AppPath.Dashboard);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to register. Please try again.", {
          id: "register",
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
                    placeholder="Enter your name"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    className="w-full h-10 md:h-12"
                    placeholder="Enter your phone number"
                    value={field.value ?? ""}
                    maxLength={15}
                    defaultCountry="BR"
                    onChange={(phone) => {
                      console.log({ phone });
                      field.onChange(phone);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <FormDescription>
                  We&#39;ll never share your email with anyone else.
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

          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full h-10 md:h-12"
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
          disabled={isSubmitting || isLoading || !isValid}
        >
          <UserRoundPlus size={20} />
          Sign up
        </Button>
      </motion.form>
    </Form>
  );
}
