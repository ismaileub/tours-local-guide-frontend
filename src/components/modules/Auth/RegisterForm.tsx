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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { register } from "@/actions/auth";

import { Mail, Lock, User, UserPlus, Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterForm() {
  const form = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isGuide: false,
    },
  });

  const router = useRouter();

  const onSubmit = async (values: FieldValues) => {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.isGuide ? "GUIDE" : "TOURIST",
    };

    try {
      const res = await register(payload);
      if (res?.data?._id) {
        toast.success("User Registered Successfully");
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Registration failed");
    }
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
              New traveler
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
              Create your travel passport.
              <span className="block text-teal-300">GuideHub Travel</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-200/90 sm:text-lg">
              Save wishlists, manage tours, and connect with trusted local
              experts.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-teal-200/80">
                  Starter pack
                </p>
                <p className="mt-2 text-lg font-semibold">3-city route</p>
                <p className="text-sm text-slate-300">
                  Dhaka • Chittagong • Sylhet
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-teal-200/80">
                  Rewards
                </p>
                <p className="mt-2 text-lg font-semibold">Member perks</p>
                <p className="text-sm text-slate-300">Priority support</p>
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
                <h2 className="text-2xl font-bold">Create account</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Start booking unique experiences in minutes.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">
                          Full name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <Input
                              placeholder="Jane Traveler"
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
                    name="email"
                    rules={{ required: "Email is required" }}
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
                    rules={{ required: "Password is required" }}
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

                  <FormField
                    control={form.control}
                    name="isGuide"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1 border-teal-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                          />
                        </FormControl>
                        <div className="leading-tight">
                          <div className="flex items-center gap-2">
                            <Compass className="h-4 w-4 text-teal-600" />
                            <FormLabel className="font-semibold text-slate-800">
                              Become a guide
                            </FormLabel>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">
                            Share your local expertise and lead trips.
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-200/70 hover:bg-teal-700"
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Create account
                  </Button>
                </form>
              </Form>

              <p className="mt-6 text-center text-sm text-slate-600">
                Already a member?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-teal-700 hover:text-teal-800"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
