/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Fill up all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Message sent successfully", {
        description: "We’ll get back to you shortly.",
      });

      setForm({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast.error("Failed to send message", {
        description: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen  pb-10 px-4 md:px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Contact <span className="text-orange-500">Us</span>
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Have questions, feedback or need support? <br /> We’d love to hear
            from you. Fill out the form or reach us directly.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-xl font-semibold mb-6">Get in touch</h2>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Mail className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">support@guidehub.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">+880 1234-567890</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-xl font-semibold mb-6">Send a message</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
              />
              <Input
                name="email"
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
              />
              <Textarea
                name="message"
                placeholder="Write your message..."
                className="min-h-[120px]"
                value={form.message}
                onChange={handleChange}
              />
              <Button
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
