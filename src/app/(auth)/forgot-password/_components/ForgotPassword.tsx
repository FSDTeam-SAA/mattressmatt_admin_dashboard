"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

// ✅ Zod validation schema
const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const router = useRouter();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // ✅ Mutation for forgot password
  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/forget`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send reset email");
      }

      return res.json();
    },
    onSuccess: (data, variables) => {
      toast.success(data.message || "Reset email sent successfully");

      // ✅ Pass email directly without using state
      router.push(`/verify-email?email=${encodeURIComponent(variables)}`);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send reset email");
    },
  });

  // ✅ Handle form submit
  const onSubmit = (values: ForgotPasswordFormValues) => {
    forgotPasswordMutation.mutate(values.email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-transparent backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
          {/* Header */}
          <div className="mb-8 text-start">
            <h1 className="text-[40px] text-[#F47A20] font-bold mb-2">
              Forgot Password
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enter your email to recover your password
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Write your email"
                        {...field}
                        disabled={forgotPasswordMutation.isPending}
                        className="bg-gray-800/70 backdrop-blur-sm text-white placeholder-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={forgotPasswordMutation.isPending}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-400 disabled:to-orange-500 disabled:cursor-not-allowed text-white font-medium py-3 px-4 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none !rounded-full"
              >
                {forgotPasswordMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
