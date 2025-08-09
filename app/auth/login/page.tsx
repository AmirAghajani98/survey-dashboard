"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (data.session) router.replace("/");
    })();
    return () => {
      mounted = false;
    };
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || "خطا در ورود");
      return;
    }
    router.push("/");
  };

  return (
    <div className="bg-[url('/img/supply-chain.jpg')] bg-slate-600 bg-blend-multiply bg-cover bg-center min-h-screen flex items-center justify-center p-4">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="order-2 md:order-1 w-full bg-white/15 backdrop-blur-sm p-6 rounded-lg shadow-xl text-slate-50"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">ورود ادمین</h1>

          {errorMsg && (
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4 text-sm">
              {errorMsg}
            </div>
          )}

          <label className="block mb-3">
            <span className="block mb-1">ایمیل</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded border border-white/30 bg-white/90 px-3 py-3 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="admin@example.com"
            />
          </label>

          <label className="block mb-6">
            <span className="block mb-1">رمز عبور</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded border border-white/30 bg-white/90 px-3 py-3 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={loading || !email || !password}
            className={`w-full text-white py-3 rounded font-medium transition-colors duration-200 ${
              loading || !email || !password
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "در حال ورود…" : "ورود"}
          </button>
        </form>

        <div className="order-1 md:order-2 flex items-center justify-center">
          <Image
            src="/img/vector2.png"
            alt="احراز هویت"
            width={1200}
            height={1200}
            priority
            className="w-full max-w-[520px] drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
