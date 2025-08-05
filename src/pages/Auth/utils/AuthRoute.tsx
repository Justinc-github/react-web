// /Auth/utils/AuthRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./auth";
import { JSX } from "react";

export default function AuthRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    // 未登录：跳转到 login 页面，并携带当前路径
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 已登录：正常渲染页面
  return children;
}
