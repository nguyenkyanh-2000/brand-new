import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

export default () => {
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  return createServerComponentClient({ cookies, headers });
};
