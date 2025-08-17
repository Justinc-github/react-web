import { Alert, Button, Form } from "react-bootstrap";

// RetrieveForm.tsx
interface RetrieveFormProps {
  retrieveData: {
    email: string;
    code: string;
    newPassword: string;
  };
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSendCode: () => void;
  setTab: (tab: string) => void;
  loading: boolean;
  codeLoading: boolean;
  codeMsg: string;
  error: string;
  success: string;
}

export default function RetrieveForm({
  retrieveData,
  handleInput,
  handleSubmit,
  handleSendCode,
  setTab,
  loading,
  codeLoading,
  codeMsg,
  error,
  success,
}: RetrieveFormProps) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="retrieveEmail">
        <Form.Label>邮箱</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={retrieveData.email}
          onChange={handleInput}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="retrieveCode">
        <Form.Label>验证码</Form.Label>
        <div className="d-flex">
          <Form.Control
            type="text"
            name="code"
            value={retrieveData.code}
            onChange={handleInput}
            required
            className="me-2 flex-grow-1" // 输入框占据剩余空间
          />
          <Button
            variant="outline-secondary"
            onClick={handleSendCode}
            disabled={codeLoading}
            className="w-50" // 按钮宽度占父容器的50%
          >
            {codeLoading ? "发送中..." : "获取验证码"}
          </Button>
        </div>
        {codeMsg && <div className="text-muted small mt-1">{codeMsg}</div>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="retrieveNewPassword">
        <Form.Label>新密码</Form.Label>
        <Form.Control
          type="password"
          name="newPassword"
          value={retrieveData.newPassword}
          onChange={handleInput}
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-between mb-3">
        <Button variant="link" size="sm" onClick={() => setTab("login")}>
          返回登录
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "提交中..." : "提交"}
        </Button>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
    </Form>
  );
}
