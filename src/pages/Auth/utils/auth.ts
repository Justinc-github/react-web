// /src/utils/auth.ts

// 定义认证信息的类型（可选，增强类型安全）
export interface AuthInfo {
  message: string;
  token: string;
  email: string;
}

/**
 * 保存完整的认证信息到localStorage
 * @param authInfo 后端返回的登录成功信息（包含token、email等）
 */
export const saveAuthInfo = (authInfo: AuthInfo) => {
  localStorage.setItem("authInfo", JSON.stringify(authInfo));
};

/**
 * 获取本地存储的完整认证信息
 * @returns 解析后的AuthInfo对象（未登录时返回null）
 */
export const getAuthInfo = (): AuthInfo | null => {
  const info = localStorage.getItem("authInfo");
  return info ? JSON.parse(info) : null;
};

/**
 * 判断是否已登录（基于是否存在有效认证信息）
 */
export const isAuthenticated = () => {
  return !!getAuthInfo();
};

/**
 * 获取存储的token（便捷方法）
 */
export const getToken = (): string | null => {
  const authInfo = getAuthInfo();
  return authInfo?.token || null;
};

/**
 * 清除本地存储的认证信息（退出登录时使用）
 */
export const clearAuthInfo = () => {
  localStorage.removeItem("authInfo");
  localStorage.removeItem("token"); // 如果仍有单独保存
  localStorage.removeItem("rememberedUsername");
  localStorage.removeItem("rememberedPassword");
};
