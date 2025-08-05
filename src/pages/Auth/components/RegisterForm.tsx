import { Form, Button, Alert, InputGroup } from "react-bootstrap";

interface RegisterFormProps {
  registerData: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    code: string;
  };
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSendCode: () => void;
  codeLoading: boolean;
  codeMsg: string;
  loading: boolean;
  error: string;
  success: string;
}

export default function RegisterForm({
  registerData,
  handleInput,
  handleSubmit,
  handleSendCode,
  codeLoading,
  codeMsg,
  loading,
  error,
  success,
}: RegisterFormProps) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="registerEmail">
        <Form.Label>邮箱</Form.Label>
        <InputGroup>
          <Form.Control
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleInput}
            required
          />
          <Button
            variant="outline-secondary"
            onClick={handleSendCode}
            disabled={codeLoading || !registerData.email}
          >
            {codeLoading ? "发送中..." : "获取验证码"}
          </Button>
        </InputGroup>
        {codeMsg && (
          <div
            style={{
              color: codeMsg.includes("失败") ? "red" : "green",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            {codeMsg}
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="registerCode">
        <Form.Label>验证码</Form.Label>
        <Form.Control
          type="text"
          name="code"
          value={registerData.code}
          onChange={handleInput}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="registerUsername">
        <Form.Label>账号</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={registerData.username}
          onChange={handleInput}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="registerPassword">
        <Form.Label>密码</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={registerData.password}
          onChange={handleInput}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="registerConfirmPassword">
        <Form.Label>确认密码</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          value={registerData.confirmPassword}
          onChange={handleInput}
          required
        />
      </Form.Group>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "注册中..." : "注册"}
        </Button>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
    </Form>
  );
}
