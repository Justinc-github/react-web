// Log.tsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./utils/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  interface LocationState {
    from?: {
      pathname?: string;
    };
  }

  const state = location.state as LocationState;
  const from = state?.from?.pathname || "/home";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate(from, { replace: true });
    } catch (error) {
      if (typeof error === "object" && error !== null) {
        const err = error as { error_description?: string; message?: string };
        alert(err.error_description || err.message || "登录失败");
      } else {
        alert("登录失败");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">用户登录</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            电子邮箱
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入邮箱"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            登录密码
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入密码"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "登录中..." : "立即登录"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          还没有账号？{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            立即注册
          </a>
        </p>
      </div>
    </div>
  );
}
