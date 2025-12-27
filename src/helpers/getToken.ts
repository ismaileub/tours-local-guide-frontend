"use client";

import { getSession } from "next-auth/react";

export const getTokenClient = async (): Promise<string | undefined> => {
  const session = await getSession();
  return session?.user?.accessToken as string;
};
