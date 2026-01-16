import { getUserSession } from "./getUserSession";

export const getDashboardData = async () => {
  const session = await getUserSession();
  const token = session?.user?.accessToken as string;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/dashboard/summary`,
    {
      headers: {
        authorization: token,
      },
    }
  );

  console.log(res);

  if (!res.ok) throw new Error("Failed to load dashboard");

  return res.json();
};
