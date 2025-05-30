import { supabase } from "./supabaseClient";

/**
 * 执行用户退出登录
 * @returns {Promise<{ success: boolean; error?: string }>} 操作结果
 */
export const signOut = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("退出登录失败:", error.message);
      return { success: false, error: error.message };
    }

    // // 清除本地可能存储的额外用户数据（可选）
    // localStorage.removeItem("user_session");
    return { success: true };
  } catch (err) {
    const error = err as Error;
    console.error("退出登录异常:", error.message);
    return { success: false, error: error.message };
  }
};
