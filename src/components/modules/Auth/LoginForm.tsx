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
import { Mail, Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion";
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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-teal-500/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-400/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Side - Destination Poster */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
              Explore. Book. Go.
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
              Your next escape starts here.
              <span className="block text-teal-300">GuideHub Travel</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-200/90 sm:text-lg">
              Discover curated guides, build smart itineraries, and book trusted
              experiences in minutes.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-teal-200/80">
                  This week
                </p>
                <p className="mt-2 text-lg font-semibold">Sundarban Sunrise</p>
                <p className="text-sm text-slate-300">4 days • River trails</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-teal-200/80">
                  Trending
                </p>
                <p className="mt-2 text-lg font-semibold">Cox’s Bazar Coast</p>
                <p className="text-sm text-slate-300">3 days • Beach walk</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-full"
          >
            <div className="rounded-3xl bg-white/95 p-8 text-slate-900 shadow-2xl ring-1 ring-white/40 backdrop-blur sm:p-10">
              <div>
                <h2 className="text-2xl font-bold">Welcome back</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Log in to manage bookings, itineraries, and guide services.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              className="h-11 rounded-2xl border-slate-200 pl-10 focus:border-teal-500 focus:ring-teal-500"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="h-11 rounded-2xl border-slate-200 pl-10 focus:border-teal-500 focus:ring-teal-500"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-200/70 hover:bg-teal-700"
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </Button>
                </form>
              </Form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px w-full bg-slate-200" />
                <span className="text-xs uppercase tracking-widest text-slate-400">
                  or
                </span>
                <div className="h-px w-full bg-slate-200" />
              </div>

              <Button
                variant="outline"
                className="w-full rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50"
                onClick={handleGoogleLogin}
              >
                <Image
                  src="https://img.icons8.com/color/24/google-logo.png"
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span className="ml-2">Continue with Google</span>
              </Button>

              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Demo shortcuts
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleInstantDemoLogin("admin")}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:border-teal-400 hover:text-teal-700"
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInstantDemoLogin("guide")}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:border-teal-400 hover:text-teal-700"
                  >
                    Guide
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInstantDemoLogin("tourist")}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:border-teal-400 hover:text-teal-700"
                  >
                    Tourist
                  </button>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-slate-600">
                New here?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-teal-700 hover:text-teal-800"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
