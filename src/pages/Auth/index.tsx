import axios from "axios";
import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import LoginForm from "./components/LoginForm";
import RetrieveForm from "./components/RetrieveForm";
import RegisterForm from "./components/RegisterForm";
import { saveAuthInfo } from "./utils/auth";

const LOGIN_URL = "https://api.zhongzhi.site/auth/login";
const REGISTER_URL = "https://api.zhongzhi.site/auth/register";
const CODE_URL = "https://api.zhongzhi.site/auth/code";
const CHANGE_PASSWORD_URL = "https://api.zhongzhi.site/auth/change_password";
const CODE_CHANGE_URL = "https://api.zhongzhi.site/auth/change/code";

export default function LoginRegister() {
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [codeMsg, setCodeMsg] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);

  // 登录表单
  const [loginData, setLoginData] = useState({
    username: localStorage.getItem("rememberedUsername") || "",
    password: localStorage.getItem("rememberedPassword") || "",
    remember: !!localStorage.getItem("rememberedUsername"),
  });

  // 注册表单
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    code: "",
  });

  // 找回密码表单
  const [retrieveData, setRetrieveData] = useState({
    email: "",
    code: "",
    newPassword: "",
  });

  // 输入处理函数
  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegisterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRetrieveInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRetrieveData((prev) => ({ ...prev, [name]: value }));
  };

  // 处理找回密码的验证码发送
  const handleSendRetrieveCode = async () => {
    setCodeMsg("获取验证码");
    if (!retrieveData.email) {
      setCodeMsg("请输入邮箱");
      return;
    }
    setCodeLoading(true);
    try {
      // 发送找回密码的验证码请求
      await axios.post(
        `${CODE_CHANGE_URL}?email=${encodeURIComponent(retrieveData.email)}`,
        { headers: { "Content-Type": "application/json" } }
      );
      setCodeMsg("验证码已发送，请查收邮箱");
    } catch {
      // 错误处理...
    } finally {
      setCodeLoading(false);
    }
  };
  // 修改密码提交函数
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // 使用正确的密码修改接口
      await axios.put(
        CHANGE_PASSWORD_URL,
        {
          email: retrieveData.email,
          code: retrieveData.code,
          new_password: retrieveData.newPassword,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccess("密码重置成功，请登录");
      setTab("login");
    } catch {
      // 错误处理...
    } finally {
      setLoading(false);
    }
  };
  // 获取验证码
  const handleSendCode = async () => {
    setCodeMsg("获取验证码");
    if (!registerData.email) {
      setCodeMsg("请输入邮箱");
      return;
    }
    setCodeLoading(true);
    try {
      console.log(registerData.code);
      await axios.post(
        `${CODE_URL}?email=${encodeURIComponent(registerData.email)}`, // 拼接查询参数
        { headers: { "Content-Type": "application/json" } }
      );
      setCodeMsg("验证码已发送，请查收邮箱");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setCodeMsg(err.response?.data?.message || "验证码发送失败");
        console.log("后端返回:", err.response?.data);
      } else {
        setCodeMsg("验证码发送失败");
        console.log("未知错误:", err);
      }
    } finally {
      setCodeLoading(false);
    }
  };

  // 登录提交
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await axios.post(
        LOGIN_URL,
        {
          identifier: loginData.username,
          password: loginData.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.message === "failure") {
        setError("登录失败，用户名或密码错误");
      } else {
        // 存储后端返回的完整信息（包含message、token、email）
        saveAuthInfo(res.data);

        // 处理"记住我"逻辑（存储用户名密码）
        if (loginData.remember) {
          localStorage.setItem("rememberedUsername", loginData.username);
          localStorage.setItem("rememberedPassword", loginData.password);
        } else {
          localStorage.removeItem("rememberedUsername");
          localStorage.removeItem("rememberedPassword");
        }

        setSuccess("登录成功");
        window.location.href = "/"; // 跳转首页
      }
    } catch (err: unknown) {
      // 错误处理逻辑不变
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message;
        setError(
          errorMessage === "failure"
            ? "登录失败，用户名或密码错误"
            : errorMessage || "登录失败"
        );
        console.log("后端返回:", err.response?.data);
      } else {
        setError("登录失败");
        console.log("未知错误:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // 注册提交
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (registerData.password !== registerData.confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }
    if (!registerData.email) {
      setError("请输入邮箱");
      return;
    }
    if (!registerData.code) {
      setError("请输入验证码");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        REGISTER_URL,
        {
          email: registerData.email,
          username: registerData.username,
          password: registerData.password,
          code: registerData.code,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccess("注册成功，请登录");
      setTab("login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "注册失败");
      } else {
        setError("注册失败");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        background: "#fff",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px #eee",
      }}
    >
      <Tabs
        activeKey={tab}
        onSelect={(k) => {
          setTab(k || "login");
          setError("");
          setSuccess("");
        }}
        className="mb-3"
      >
        <Tab eventKey="login" title="登录">
          <LoginForm
            loginData={loginData}
            handleInput={handleLoginInput}
            handleSubmit={handleLogin}
            setTab={setTab}
            loading={loading}
            error={error}
            success={success}
          />
        </Tab>
        <Tab eventKey="register" title="注册">
          <RegisterForm
            registerData={registerData}
            handleInput={handleRegisterInput}
            handleSubmit={handleRegister}
            handleSendCode={handleSendCode}
            codeLoading={codeLoading}
            codeMsg={codeMsg}
            loading={loading}
            error={error}
            success={success}
          />
        </Tab>
        <Tab eventKey="retrieve" title="找回密码">
          <RetrieveForm
            retrieveData={retrieveData}
            handleInput={handleRetrieveInput}
            handleSubmit={handleChangePassword} // 使用新的提交函数
            handleSendCode={handleSendRetrieveCode} // 添加验证码发送功能
            setTab={setTab}
            loading={loading}
            codeLoading={codeLoading}
            codeMsg={codeMsg}
            error={error}
            success={success}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
