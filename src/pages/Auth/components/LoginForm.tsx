import { Form, Button, Alert } from "react-bootstrap";

interface LoginFormProps {
  loginData: {
    username: string;
    password: string;
    remember: boolean;
  };
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setTab: (tab: string) => void;
  loading: boolean;
  error: string;
  success: string;
}

export default function LoginForm({
  loginData,
  handleInput,
  handleSubmit,
  setTab,
  loading,
  error,
  success,
}: LoginFormProps) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="loginUsername">
        <Form.Label>账号</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleInput}
          required
          autoComplete="username"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="loginPassword">
        <Form.Label>密码</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInput}
          required
          autoComplete="current-password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="loginRemember">
        <Form.Check
          type="checkbox"
          label="记住密码"
          name="remember"
          checked={loginData.remember}
          onChange={handleInput}
        />
      </Form.Group>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="link" size="sm" onClick={() => setTab("retrieve")}>
          忘记密码？
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "登录中..." : "登录"}
        </Button>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
    </Form>
  );
}
