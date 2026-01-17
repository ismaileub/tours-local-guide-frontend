import { redirect } from "next/navigation";
import LoginClient from "@/components/modules/Auth/LoginClient";
import { getUserSession } from "@/helpers/getUserSession";

const LoginPage = async () => {
  const session = await getUserSession();
  const token = session?.user?.accessToken as string;

  // 🚫 Guard: logged-in users can't access login
  if (token) {
    redirect("/");
  }

  return <LoginClient />;
};

export default LoginPage;
