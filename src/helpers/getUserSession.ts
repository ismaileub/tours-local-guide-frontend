import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
export const getUserSession = async () => await getServerSession(authOptions);

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export async function getUserSession() {
//   const session = await getServerSession(authOptions);
//   return session;
// }
