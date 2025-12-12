"use server";
import { FieldValues } from "react-hook-form";

export const register = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!res?.ok) {
    console.error("User Registration Failed", await res.text());
  }
  console.log(res);
  return await res.json();
};

// export const login = async (data: FieldValues) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify(data),
//   });
//   if (!res?.ok) {
//     console.error("Login Failed", await res.text());
//   }
//   return await res.json();
// };

export const login = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // <- important!
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Login Failed:", text);
    throw new Error(text);
  }

  return await res.json(); // backend returns user info
};
