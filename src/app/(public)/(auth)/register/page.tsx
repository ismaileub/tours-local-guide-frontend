import { redirect } from "next/navigation";
import RegisterForm from "@/components/modules/Auth/RegisterForm";
import { getUserSession } from "@/helpers/getUserSession";

const RegisterPage = async () => {
  const session = await getUserSession();
  const token = session?.user?.accessToken as string;

  // 🚫 Guard: logged-in users can't access register
  if (token) {
    redirect("/");
  }

  return <RegisterForm />;
};

export default RegisterPage;
