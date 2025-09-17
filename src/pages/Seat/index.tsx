import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Card,
  Button,
  Spinner,
  Navbar,
  Nav,
  Badge,
  OverlayTrigger,
  Tooltip,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import {
  FaSyncAlt,
  FaChair,
  FaExclamationCircle,
  FaInfoCircle,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaCheck,
  FaUser,
  FaFileExport,
} from "react-icons/fa";
import { AuthInfo, getAuthInfo, saveAuthInfo } from "../Auth/utils/auth";


// 定义座位数据的接口
interface Seat {
  id: string;
  seat_number: string;
  seat_id: number;
  owner: string;
}

// 错误响应接口
interface ErrorResponse {
  detail: string;
}

// 座位表单数据接口
interface SeatFormData {
  seat_number: string;
  seat_id: number | "";
  owner: string;
}

// 管理员用户接口
interface AdminUser {
  id: number;
  email: string;
}

const SeatManagement: React.FC = () => {
  // 状态管理
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [currentSeat, setCurrentSeat] = useState<Seat | null>(null);
  const [formData, setFormData] = useState<SeatFormData>({
    seat_number: "",
    seat_id: "",
    owner: "",
  });
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null);
  const [hasAdminPermission, setHasAdminPermission] = useState<boolean>(false);

  // 添加导出状态
  const [exporting, setExporting] = useState<boolean>(false);
  const [, setExportError] = useState<string | null>(null);

  // API基础URL
  const API_BASE_URL = "https://api.zhongzhi.site";
  // 添加导出函数
  const handleExport = () => {
    setExporting(true);
    setExportError(null);

    try {
      // 创建CSV内容
      const headers = ["ID", "座位编号", "座位ID", "使用者"];
      const rows = seats.map((seat) => [
        seat.id,
        seat.seat_number,
        seat.seat_id,
        seat.owner,
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      // 创建Blob并下载
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `座位数据_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("导出数据时出错:", err);
      setExportError(
        err instanceof Error ? err.message : "导出数据时发生未知错误"
      );
    } finally {
      setExporting(false);
    }
  };

  // 登录函数
  const handleLogin = (email: string) => {
    const authInfo: AuthInfo = {
      message: "登录成功",
      token: "simulated_token_for_" + email, // 模拟token
      email: email,
    };
    saveAuthInfo(authInfo);
    setAuthInfo(authInfo);
    checkAdminPermission(authInfo.email);
  };

  // 检查管理员权限
  const checkAdminPermission = React.useCallback(
    (email: string) => {
      const isAdmin = adminUsers.some((admin) => admin.email === email);
      setHasAdminPermission(isAdmin);
    },
    [adminUsers]
  );

  const fetchAdminUsers = React.useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/information/team/member/admin`,
        { headers: { Accept: "application/json; charset=utf-8" } }
      );
      const data = await response.json();
      setAdminUsers(data);
    } catch (err) {
      console.error("获取管理员列表失败:", err);
    }
  }, [API_BASE_URL]);

  // 获取座位数据
  const fetchSeats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/seat/get`);

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      const sortedData = (data as Seat[]).sort((a, b) => {
        // 处理座位ID为字符串的情况，尝试转换为数字
        const aSeatId =
          typeof a.seat_id === "string" ? parseInt(a.seat_id, 10) : a.seat_id;
        const bSeatId =
          typeof b.seat_id === "string" ? parseInt(b.seat_id, 10) : b.seat_id;

        // 判断座位ID是否有效（非空、非NaN、非负数）
        const isAIdValid =
          aSeatId !== undefined &&
          aSeatId !== null &&
          !isNaN(aSeatId) &&
          aSeatId >= 0;
        const isBIdValid =
          bSeatId !== undefined &&
          bSeatId !== null &&
          !isNaN(bSeatId) &&
          bSeatId >= 0;

        // 有效ID在前，无效ID在后
        if (isAIdValid && !isBIdValid) return -1;
        if (!isAIdValid && isBIdValid) return 1;

        // 都有效或都无效时，按座位ID升序排列
        if (isAIdValid && isBIdValid) {
          return aSeatId - bSeatId;
        } else {
          // 都无效时，按座位编号（seat_number）升序排列
          return a.seat_number.localeCompare(b.seat_number);
        }
      });

      setSeats(sortedData);
    } catch (err) {
      console.error("获取座位数据时出错:", err);
      setError(
        err instanceof Error ? err.message : "获取座位数据时发生未知错误"
      );
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取数据
  useEffect(() => {
    const savedAuth = getAuthInfo();
    if (savedAuth) {
      setAuthInfo(savedAuth);
    }
    fetchSeats();
    fetchAdminUsers();
  }, [fetchAdminUsers]);

  // 当认证信息或管理员列表变化时检查权限
  useEffect(() => {
    if (authInfo && adminUsers.length > 0) {
      const isAdmin = adminUsers.some(
        (admin) => admin.email === authInfo.email
      );
      setHasAdminPermission(isAdmin);
    }
  }, [authInfo, adminUsers]);
  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "seat_id" ? (value === "" ? "" : parseInt(value, 10)) : value,
    }));
    setSubmitError(null);
  };

  // 打开添加模态框（检查权限）
  const handleAddClick = () => {
    if (!hasAdminPermission) {
      alert("您没有添加座位的权限");
      return;
    }
    setFormData({
      seat_number: "",
      seat_id: "",
      owner: "",
    });
    setSubmitError(null);
    setShowAddModal(true);
  };

  // 打开编辑模态框（检查权限）
  const handleEditClick = (seat: Seat) => {
    if (!hasAdminPermission) {
      alert("您没有编辑座位的权限");
      return;
    }
    setCurrentSeat(seat);
    setFormData({
      seat_number: seat.seat_number,
      seat_id: seat.seat_id,
      owner: seat.owner,
    });
    setSubmitError(null);
    setShowEditModal(true);
  };

  // 打开删除确认模态框（检查权限）
  const handleDeleteClick = (seat: Seat) => {
    if (!hasAdminPermission) {
      alert("您没有删除座位的权限");
      return;
    }
    setCurrentSeat(seat);
    setShowDeleteModal(true);
  };

  // 提交添加座位
  const handleAddSubmit = async () => {
    try {
      if (!formData.seat_number || !formData.seat_id || !formData.owner) {
        setSubmitError("请填写所有必填字段");
        return;
      }

      setSubmitLoading(true);
      setSubmitError(null);

      const response = await fetch(`${API_BASE_URL}/seat/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new Error(errorData.detail || "添加座位失败");
      }

      // 添加成功，刷新数据并关闭模态框
      await fetchSeats();
      setShowAddModal(false);
    } catch (err) {
      console.error("添加座位时出错:", err);
      setSubmitError(
        err instanceof Error ? err.message : "添加座位时发生未知错误"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  // 提交更新座位
  const handleEditSubmit = async () => {
    if (!currentSeat) return;

    try {
      if (!formData.seat_number || formData.seat_id === "" || !formData.owner) {
        setSubmitError("请填写所有必填字段");
        return;
      }

      setSubmitLoading(true);
      setSubmitError(null);

      const response = await fetch(
        `${API_BASE_URL}/seat/update/${currentSeat.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new Error(errorData.detail || "更新座位失败");
      }

      // 更新成功，刷新数据并关闭模态框
      await fetchSeats();
      setShowEditModal(false);
    } catch (err) {
      console.error("更新座位时出错:", err);
      setSubmitError(
        err instanceof Error ? err.message : "更新座位时发生未知错误"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  // 确认删除座位
  const handleDeleteConfirm = async () => {
    if (!currentSeat) return;

    try {
      setSubmitLoading(true);
      setSubmitError(null);

      const response = await fetch(
        `${API_BASE_URL}/seat/delete/${currentSeat.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new Error(errorData.detail || "删除座位失败");
      }

      // 删除成功，刷新数据并关闭模态框
      await fetchSeats();
      setShowDeleteModal(false);
    } catch (err) {
      console.error("删除座位时出错:", err);
      setSubmitError(
        err instanceof Error ? err.message : "删除座位时发生未知错误"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  // 重新加载数据
  const handleRefresh = () => {
    fetchSeats();
  };

  // 简单登录模态框状态
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");

  // 处理登录提交
  const handleLoginSubmit = () => {
    if (loginEmail.trim()) {
      handleLogin(loginEmail.trim());
      setShowLoginModal(false);
      setLoginEmail("");
    }
  };

  // 加载状态
  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand>
              <FaChair className="me-2" />
              座位管理系统
            </Navbar.Brand>
            {!authInfo && (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowLoginModal(true)}
                className="ms-auto"
              >
                <FaUser className="me-1" /> 登录
              </Button>
            )}
          </Container>
        </Navbar>

        <Container className="flex-grow-1 d-flex flex-column align-items-center justify-content-center p-4">
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            className="mb-4"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h4 className="text-muted">正在加载座位数据...</h4>
        </Container>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand>
              <FaChair className="me-2" />
              座位管理系统
            </Navbar.Brand>
            {!authInfo && (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowLoginModal(true)}
                className="ms-auto"
              >
                <FaUser className="me-1" /> 登录
              </Button>
            )}
          </Container>
        </Navbar>

        <Container className="flex-grow-1 d-flex flex-column align-items-center justify-content-center p-4">
          <Card className="w-100 max-w-md shadow">
            <Card.Body className="text-center">
              <FaExclamationCircle className="text-danger fs-3 mb-3" />
              <Card.Title>加载失败</Card.Title>
              <Card.Text className="text-danger mb-4">{error}</Card.Text>
              <Button
                variant="primary"
                onClick={handleRefresh}
                className="d-flex align-items-center justify-content-center gap-2"
              >
                <FaSyncAlt /> 重试
              </Button>
            </Card.Body>
          </Card>
        </Container>

        <footer className="bg-light py-3 mt-auto">
          <Container className="text-center text-muted">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} 座位管理系统
            </p>
          </Container>
        </footer>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* 登录模态框 */}
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>管理员登录</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>邮箱地址</Form.Label>
              <Form.Control
                type="email"
                placeholder="请输入管理员邮箱"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                请输入授权管理员邮箱地址
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            取消
          </Button>
          <Button variant="primary" onClick={handleLoginSubmit}>
            登录
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand className="d-flex align-items-center gap-2">
            <FaChair />
            座位管理系统
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Item>
                <Badge bg="primary" className="mt-1 me-3">
                  已分配: {seats.length}
                </Badge>
              </Nav.Item>
              {authInfo ? (
                <Nav.Item className="d-flex align-items-center">
                  <span className="me-2 text-muted">{authInfo.email}</span>
                  {hasAdminPermission && (
                    <Badge bg="success" className="me-2">
                      管理员
                    </Badge>
                  )}
                </Nav.Item>
              ) : (
                <Nav.Item>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setShowLoginModal(true)}
                  >
                    <FaUser className="me-1" /> 登录
                  </Button>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="flex-grow-1 py-4">
        <Card className="shadow-sm">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <Card.Title className="mb-0">座位分配表</Card.Title>
            <div className="d-flex gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleRefresh}
                className="d-flex align-items-center gap-1"
              >
                <FaSyncAlt size={14} /> 刷新
              </Button>
              {/* 添加导出按钮 */}
              <Button
                variant="outline-success"
                size="sm"
                onClick={handleExport}
                disabled={exporting || seats.length === 0}
                className="d-flex align-items-center gap-1"
              >
                {exporting ? (
                  <Spinner animation="border" size="sm" className="me-1" />
                ) : (
                  <FaFileExport size={14} />
                )}
                导出
              </Button>
              {hasAdminPermission && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddClick}
                  className="d-flex align-items-center gap-1"
                >
                  <FaPlus size={14} /> 添加座位
                </Button>
              )}
            </div>
          </Card.Header>

          <Card.Body className="p-0">
            {seats.length === 0 ? (
              <div className="text-center py-8">
                <FaChair className="text-secondary fs-1 mb-4" />
                <h5 className="text-muted">暂无座位数据</h5>
                <p className="text-muted mb-4">
                  {hasAdminPermission
                    ? '点击"添加座位"按钮创建新的座位分配'
                    : "请联系管理员添加座位数据"}
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover responsive>
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>座椅编号</th>
                      <th>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>座位在系统中的唯一标识</Tooltip>}
                        >
                          <div className="d-flex align-items-center gap-1">
                            座位ID{" "}
                            <FaInfoCircle size={14} className="text-muted" />
                          </div>
                        </OverlayTrigger>
                      </th>
                      <th>使用者</th>
                      {hasAdminPermission && <th>操作</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {seats.map((seat) => (
                      <tr
                        key={seat.id}
                        className="transition-all hover:bg-primary-50"
                      >
                        <td>{seat.id}</td>
                        <td>
                          <span className="fw-medium">{seat.seat_number}</span>
                        </td>
                        <td>{seat.seat_id}</td>
                        <td>{seat.owner}</td>
                        {hasAdminPermission && (
                          <td className="d-flex gap-2">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleEditClick(seat)}
                              className="d-flex align-items-center justify-content-center p-1"
                            >
                              <FaEdit size={14} />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteClick(seat)}
                              className="d-flex align-items-center justify-content-center p-1"
                            >
                              <FaTrash size={14} />
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>

          {seats.length > 0 && (
            <Card.Footer className="bg-light text-muted">
              共 {seats.length} 个已分配座位
            </Card.Footer>
          )}
        </Card>
      </Container>

      {/* 添加座位模态框 */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>添加新座位</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitError && (
            <Alert variant="danger" className="mb-3">
              {submitError}
            </Alert>
          )}
          <Form>
            <Form.Group className="mb-3" controlId="seatNumber">
              <Form.Label>座位编号</Form.Label>
              <Form.Control
                type="text"
                name="seat_number"
                value={formData.seat_number}
                onChange={handleInputChange}
                placeholder="例如: 211-001"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="seatId">
              <Form.Label>座位ID</Form.Label>
              <Form.Control
                type="number"
                name="seat_id"
                value={formData.seat_id}
                onChange={handleInputChange}
                placeholder="座位的数字标识"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="owner">
              <Form.Label>使用者</Form.Label>
              <Form.Control
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                placeholder="座位使用者姓名"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            <FaTimes className="me-1" /> 取消
          </Button>
          <Button
            variant="primary"
            onClick={handleAddSubmit}
            disabled={submitLoading}
          >
            {submitLoading ? (
              <Spinner animation="border" size="sm" className="me-1" />
            ) : (
              <FaCheck className="me-1" />
            )}
            保存
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 编辑座位模态框 */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>编辑座位</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitError && (
            <Alert variant="danger" className="mb-3">
              {submitError}
            </Alert>
          )}
          <Form>
            <Form.Group className="mb-3" controlId="editSeatNumber">
              <Form.Label>座位编号</Form.Label>
              <Form.Control
                type="text"
                name="seat_number"
                value={formData.seat_number}
                onChange={handleInputChange}
                placeholder="例如: 211-001"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editSeatId">
              <Form.Label>座位ID</Form.Label>
              <Form.Control
                type="number"
                name="seat_id"
                value={formData.seat_id}
                onChange={handleInputChange}
                placeholder="座位的数字标识"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editOwner">
              <Form.Label>使用者</Form.Label>
              <Form.Control
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                placeholder="座位使用者姓名"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            <FaTimes className="me-1" /> 取消
          </Button>
          <Button
            variant="primary"
            onClick={handleEditSubmit}
            disabled={submitLoading}
          >
            {submitLoading ? (
              <Spinner animation="border" size="sm" className="me-1" />
            ) : (
              <FaSave className="me-1" />
            )}
            更新
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 删除确认模态框 */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>确认删除</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitError && (
            <Alert variant="danger" className="mb-3">
              {submitError}
            </Alert>
          )}
          <p>
            您确定要删除座位 <strong>{currentSeat?.seat_number}</strong> 吗？
          </p>
          <p className="text-danger">此操作不可撤销，相关数据将被永久删除。</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            <FaTimes className="me-1" /> 取消
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteConfirm}
            disabled={submitLoading}
          >
            {submitLoading ? (
              <Spinner animation="border" size="sm" className="me-1" />
            ) : (
              <FaTrash className="me-1" />
            )}
            确认删除
          </Button>
        </Modal.Footer>
      </Modal>

      <footer className="bg-light py-3 mt-auto border-top">
        <Container className="text-center text-muted">
          <p className="mb-0">&copy; {new Date().getFullYear()} 座位管理系统</p>
        </Container>
      </footer>
    </div>
  );
};

export default SeatManagement;
