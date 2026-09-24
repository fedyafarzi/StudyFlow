"use client";

import { useState } from "react";
import { useRouter } from "navigation"; // Agar xato bersa, 'next/navigation' deb o'zgartiring
import { createClient } from "@supabase/supabase-js";

// Supabase ulanishini sozlash (Vercel-dagi kalitlarni localda ham o'qiydi)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Supabase Auth orqali login qilish
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (authError) {
      setError("Login yoki parol noto'g'ri: " + authError.message);
      setLoading(false);
    } else {
      // Muvaffaqiyatli kirganda bosh sahifaga o'tkazish
      router.push("/");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ width: "320px", padding: "30px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Smart Linguistics</h2>
        <p style={{ fontSize: "14px", color: "#666", textAlign: "center" }}>Platformaga kirish uchun ma'lumotlaringizni kiriting.</p>
        
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Login / Email</label>
            <input 
              type="email" 
              placeholder="Emailingizni kiriting" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
            />
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Password</label>
            <input 
              type="password" 
              placeholder="Parolingizni kiriting" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
            />
          </div>

          {error && <p style={{ color: "red", fontSize: "12px", margin: "0" }}>{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: "100%", padding: "12px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
          >
            {loading ? "Kirilmoqda..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
