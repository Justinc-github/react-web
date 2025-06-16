import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./utils/supabaseClient";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginMode, setLoginMode] = useState<"email" | "username" | "unknown">(
    "unknown"
  );
  const navigate = useNavigate();
  const location = useLocation();

  interface LocationState {
    from?: {
      pathname?: string;
    };
  }

  const state = location.state as LocationState;
  const from = state?.from?.pathname || "/home";

  // 邮箱格式验证正则表达式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 自动检测登录模式
  const detectLoginMode = (input: string) => {
    if (emailRegex.test(input.trim())) {
      return "email";
    } else if (input.trim().length > 0) {
      return "username";
    }
    return "unknown";
  };

  // 输入变化时自动检测登录模式
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoginInput(value);
    setLoginMode(detectLoginMode(value));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let loginEmail = loginInput.trim();
      let errorMessage = "";

      // 根据检测到的模式进行相应处理
      if (loginMode === "email") {
        // 直接使用邮箱登录
      } else if (loginMode === "username") {
        // 查询用户名对应的邮箱
        const { data, error: queryError } = await supabase
          .from("users")
          .select("email")
          .eq("username", loginEmail)
          .single();

        if (queryError) {
          errorMessage = "用户名不存在";
          throw new Error(errorMessage);
        }

        loginEmail = data.email as string;
      } else {
        errorMessage = "请输入有效的邮箱或用户名";
        throw new Error(errorMessage);
      }

      // 使用邮箱进行登录
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });

      if (authError) {
        errorMessage = authError.message;
        throw new Error(errorMessage);
      }

      navigate(from, { replace: true });
    } catch (error) {
      if (typeof error === "object" && error !== null) {
        const err = error as { message?: string };
        setError(err.message || "登录失败，请重试");
      } else {
        setError("登录失败，请重试");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <Row className="w-100">
        <Col md={6} lg={4} xl={3} className="mx-auto">
          <Card className="shadow-lg rounded-lg border-0">
            <Card.Header className="bg-white border-bottom-0">
              <Card.Title
                as="h3"
                className="text-center font-weight-bold text-primary"
              >
                账户登录
              </Card.Title>
              <p className="text-center text-muted">
                系统会自动识别邮箱或用户名
              </p>
            </Card.Header>
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="loginInput" className="mb-4">
                  <Form.Label>邮箱或用户名</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="输入邮箱或用户名"
                    value={loginInput}
                    onChange={handleInputChange}
                    required
                    className="shadow-sm"
                    isInvalid={!!error}
                  />
                  {loginMode === "email" && (
                    <Form.Text className="text-success">
                      <i className="bi bi-envelope-fill mr-1"></i>已识别为邮箱
                    </Form.Text>
                  )}
                  {loginMode === "username" && (
                    <Form.Text className="text-primary">
                      <i className="bi bi-person-fill mr-1"></i>已识别为用户名
                    </Form.Text>
                  )}
                  <Form.Control.Feedback type="invalid">
                    {error || "请输入有效的邮箱或用户名"}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-4">
                  <Form.Label>登录密码</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="shadow-sm"
                    isInvalid={!!error && !password}
                  />
                  <Form.Control.Feedback type="invalid">
                    请输入密码
                  </Form.Control.Feedback>
                </Form.Group>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-exclamation-circle-fill mr-2"></i>
                      <span>{error}</span>
                    </div>
                  </Alert>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="w-100 py-2 font-weight-bold shadow-sm"
                  style={{ backgroundColor: "#165DFF", borderColor: "#165DFF" }}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="mr-2"
                    />
                  ) : null}
                  {loading ? "登录中..." : "登录账户"}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="bg-white border-top-0 text-center py-4">
              <p className="text-muted">
                还没有账户?{" "}
                <a href="/register" className="text-primary font-weight-bold">
                  立即注册
                </a>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
