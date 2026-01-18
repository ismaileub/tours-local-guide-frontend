/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const ContactMessagesPage = () => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = session?.user.accessToken as string;

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact`, {
        headers: {
          authorization: token,
        },
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessages(data.data);
    } catch (error: any) {
      toast.error("Failed to load messages", {
        description: error.message || "Something went wrong",
      });

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.accessToken) {
      fetchMessages();
    }
  }, [status, session]);

  return (
    <section className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <p className="text-sm text-muted-foreground">
          Messages submitted from the contact page
        </p>
      </div>

      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Loading messages...
                </TableCell>
              </TableRow>
            ) : messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No messages found
                </TableCell>
              </TableRow>
            ) : (
              messages?.map((msg) => (
                <TableRow key={msg._id}>
                  <TableCell className="font-medium">{msg.name}</TableCell>
                  <TableCell>{msg.email}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {msg.message}
                  </TableCell>
                  <TableCell>
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ContactMessagesPage;
