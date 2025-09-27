"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Zod schema for OTP (6 digits)
const verifyEmailSchema = z.object({
  otp: z.string().length(6, "Please enter a 6-digit code"),
});

type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Get email from URL query param
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  // Mutation to verify OTP
  const VerifyEmailMutation = useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to verify email");
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || "Email verified successfully");
      router.push("/reset-password?email=" + encodeURIComponent(email));
    },
    onError: (error: any) => {
      setError(error.message || "Verification failed. Please try again.");
    },
  });

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpArray = form
    .watch("otp")
    .split("")
    .concat(Array(6).fill(""))
    .slice(0, 6);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // only digits
    const newOtpArray = [...otpArray];
    newOtpArray[index] = value;
    form.setValue("otp", newOtpArray.join(""));
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!otpArray[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtpArray = [...otpArray];
        newOtpArray[index] = "";
        form.setValue("otp", newOtpArray.join(""));
      }
    }

    if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5)
      inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtpArray = [...otpArray];
    for (let i = 0; i < pastedData.length; i++) {
      newOtpArray[i] = pastedData[i];
    }
    form.setValue("otp", newOtpArray.join(""));
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const onSubmit = async (values: VerifyEmailFormValues) => {
    if (values.otp.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      await VerifyEmailMutation.mutateAsync({ email, otp: values.otp });
      console.log("OTP verified successfully");
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/resend-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to resend OTP");
      }

      form.setValue("otp", "");
      setError("");
      inputRefs.current[0]?.focus();
      toast.success("OTP resent successfully");
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-transparent backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
          {/* Header */}
          <div className="mb-8 text-start">
            <h1 className="text-[40px] text-[#F47A20] font-bold mb-2">
              Verify Email
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enter the otp to verify your email
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-white">OTP</FormLabel>
                    <FormControl>
                      <div className="flex justify-center gap-3">
                        {otpArray.map((digit, index) => (
                          <Input
                            key={index}
                            ref={(el) => {
                              inputRefs.current[index] = el!;
                            }}
                            value={digit}
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            maxLength={1}
                            disabled={isLoading}
                            className={`w-12 h-12 text-center text-white text-lg font-medium bg-gray-800/70 backdrop-blur-sm border rounded-lg focus:outline-none transition-all duration-200 ${
                              error
                                ? "border-red-500 focus:border-red-400"
                                : "border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                            }`}
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage>{error}</FormMessage>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-400 disabled:to-orange-500 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none mb-2"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </Button>

              <div className="text-center">
                <span className="text-gray-400 text-sm">
                  Didn&apos;t get a code?{" "}
                </span>
                <Button
                  variant="link"
                  onClick={handleResend}
                  disabled={isLoading}
                  className="text-orange-400 text-sm hover:text-orange-300 disabled:text-orange-500 disabled:cursor-not-allowed"
                >
                  Resend
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
