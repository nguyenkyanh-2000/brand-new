import { getCurrentUser } from "@/utils/supabase-auth-utils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Auth",
  description: "Authetication sites for Brand website",
};

export default async function Layout({ children }) {
  const user = await getCurrentUser();

  if (user) redirect("/");

  return <section>{children}</section>;
}
