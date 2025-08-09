import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or Key is missing");
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      async getAll() {
        return (await cookies()).getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(async ({ name, value, options }) => {
          await (await cookies()).set(name, value, options);
        });
      },
    },
  });
};
