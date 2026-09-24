"use client";
import { useState } from "react";
export default function LoginPage(){
  const [loading,setLoading]=useState(false);
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setLoading(true);
    // V1: connect Supabase Auth here.
    await new Promise(r=>setTimeout(r,500));
    setLoading(false);
    alert("Login backend hali ulanmagan. Keyingi bosqichda Supabase Auth qo‘shiladi.");
  }
  return <main className="login-page">
    <section className="login-brand">
      <div className="brand-title">Smart Linguistics</div>
      <div className="brand-sub">O‘quv markazingiz uchun yagona platforma: darslar, vazifalar, testlar, natijalar va o‘quvchi progressi.</div>
      <div className="feature-grid">
        <div className="feature"><b>🏆 Ranking</b><span>XP va o‘quvchi reytingi</span></div>
        <div className="feature"><b>📝 Tests</b><span>Online test va natijalar</span></div>
        <div className="feature"><b>📚 Materials</b><span>Video, PDF va homework</span></div>
        <div className="feature"><b>📈 Progress</b><span>B1 → B2 → C1 progression</span></div>
      </div>
    </section>
    <section className="login-side">
      <div className="card">
        <div className="logo">SL</div>
        <h1>Welcome back</h1>
        <p className="muted">Platformaga kirish uchun ma’lumotlaringizni kiriting.</p>
        <form onSubmit={submit}>
          <div className="field"><label>Login / Email</label><input required name="email" type="email" placeholder="you@example.com"/></div>
          <div className="field"><label>Password</label><input required name="password" type="password" placeholder="••••••••"/></div>
          <button className="login-btn" disabled={loading}>{loading ? "Kirilmoqda..." : "Login"}</button>
        </form>
        <div className="hint">V1.0 demo: autentifikatsiya keyingi bosqichda Supabase bilan ulanadi.</div>
      </div>
    </section>
  </main>;
}