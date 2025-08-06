"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="bg-[url('/img/supply-chain.jpg')] w-ful bg-slate-600 bg-blend-multiply bg-cover bg-center min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-2/5 flex flex-col justify-between bg-slate-100/20 p-6 h-90 rounded-lg shadow-lg text-slate-50 shadow-sky-900 mx-auto"
      >
        <h1 className="text-3xl font-bold mb-4 text-center">ورود ادمین</h1>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4">
            {errorMsg}
          </div>
        )}

        <label className="block mb-2">
          ایمیل
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full border px-3 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="admin@example.com"
          />
        </label>

        <label className="block mb-4">
          رمز عبور
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full border px-3 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2.5 rounded ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition-colors duration-200`}
        >
          {loading ? "در حال ورود…" : "ورود"}
        </button>
      </form>
      <div className="w-1/2 my-auto">
        <Image
          src={"/img/vector2.png"}
          alt={""}
          width={1200}
          height={1200}
          className="w-full my-auto"
        />
      </div>
    </div>
  );
}
