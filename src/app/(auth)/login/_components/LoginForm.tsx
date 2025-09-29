"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
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

// 🔹 Validation Schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      }); 

      console.log("Login response:", res);

      if (res?.error) {
        toast.error(res.error || "Invalid credentials");
      } else {
        toast.success("Login successful 🎉");
        router.push("/");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-transparent backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
          {/* Header */}
          <div className="mb-8 text-start">
            <h1 className="text-[40px] text-[#F47A20] font-bold">Welcome,</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Please sign in to continue managing
              <br />
              Snooze mattress livestreams
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Username or Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Write your username or email"
                        type="email"
                        {...field}
                        className="bg-gray-800/70 backdrop-blur-sm text-white placeholder-gray-500"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Write your password"
                          {...field}
                          className="bg-gray-800/70 backdrop-blur-sm text-white placeholder-gray-500 pr-12"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Forgot Password */}
              <div className="text-right">
                <Link href="/forgot-password">
                  <button
                    type="button"
                    className="text-orange-400 text-sm hover:text-orange-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:from-orange-400 disabled:to-orange-500 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
