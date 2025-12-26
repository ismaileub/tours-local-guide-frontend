"use client";

import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./LoginForm"), { ssr: false });

const LoginClient = () => {
  return <LoginForm />;
};

export default LoginClient;
