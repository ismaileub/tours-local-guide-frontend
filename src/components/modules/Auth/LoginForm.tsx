/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { getSession, signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 🔹 DEMO USERS
  const demoUsers = {
    admin: {
      email: "admin@gmail.com",
      password: "123456",
    },
    guide: {
      email: "guide@gmail.com",
      password: "123456",
    },
    tourist: {
      email: "tourist@gmail.com",
      password: "123456",
    },
  };

  // 🔹 ROLE BASED REDIRECT
  const redirectByRole = (role?: string) => {
    if (role === "ADMIN") return "/dashboard/admin/admin-dashboard";

    if (role === "GUIDE") return "/dashboard/guide/guide-dashboard";

    if (role === "TOURIST") return "/dashboard/tourist/tourist-dashboard";

    return "/login";
  };

  // 🔹 NORMAL LOGIN
  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...values,
      });

      if (!res?.ok) {
        toast.error("Email or password wrong");
        return;
      }

      const session = await getSession();
      const role = session?.user?.role as string;

      toast.success("Login successful");
      router.push(redirectByRole(role));
    } catch {
      toast.error("Something went wrong");
    }
  };

  // 🔥 INSTANT DEMO LOGIN
  const handleInstantDemoLogin = async (
    role: "admin" | "guide" | "tourist",
  ) => {
    try {
      toast.loading("Logging with demo account...");

      const res = await signIn("credentials", {
        redirect: false,
        email: demoUsers[role].email,
        password: demoUsers[role].password,
      });

      if (!res?.ok) {
        toast.dismiss();
        toast.error("Demo login failed");
        return;
      }

      const session = await getSession();
      const userRole = session?.user?.role as string;

      toast.dismiss();
      toast.success(`${role.toUpperCase()} demo logged in`);

      router.push(redirectByRole(userRole));
    } catch {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  // 🔹 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="space-y-6 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Login</h2>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>

        {/* OR */}
        <div className="flex items-center justify-center space-x-2">
          <div className="h-px w-16 bg-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px w-16 bg-gray-300" />
        </div>

        {/* GOOGLE */}
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={handleGoogleLogin}
        >
          <Image
            src="https://img.icons8.com/color/24/google-logo.png"
            alt="Google"
            width={20}
            height={20}
          />
          Login with Google
        </Button>

        {/*  DEMO LOGIN */}
        <div className="mt-4 space-y-3">
          <p className="text-center text-sm text-gray-500">Demo Login</p>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              onClick={() => handleInstantDemoLogin("admin")}
            >
              Admin
            </Button>

            <Button
              variant="outline"
              onClick={() => handleInstantDemoLogin("guide")}
            >
              Guide
            </Button>

            <Button
              variant="outline"
              onClick={() => handleInstantDemoLogin("tourist")}
            >
              Tourist
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
