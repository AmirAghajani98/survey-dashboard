import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient(url, key, {
    cookies: {
      async getAll() {
        return (await cookies()).getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(async ({ name, value, options }) => {
          (await cookies()).set(name, value, options);
        });
      },
    },
  });
}
