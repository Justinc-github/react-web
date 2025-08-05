import { Form, Button, Alert } from "react-bootstrap";

interface RetrieveFormProps {
  retrieveData: {
    username: string;
    newPassword: string;
  };
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setTab: (tab: string) => void;
  loading: boolean;
  error: string;
  success: string;
}

export default function RetrieveForm({
  retrieveData,
  handleInput,
  handleSubmit,
  setTab,
  loading,
  error,
  success,
}: RetrieveFormProps) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="retrieveUsername">
        <Form.Label>账号</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={retrieveData.username}
          onChange={handleInput}
          required
        />
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
