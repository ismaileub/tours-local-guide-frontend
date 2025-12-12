"use client";

import { signOut } from "next-auth/react";

const handleLogout = () => {
  localStorage.removeItem("admin_token");
  signOut();
};

export default handleLogout;
