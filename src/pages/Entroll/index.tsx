// StudentForm.tsx
import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
  InputGroup,
  ProgressBar,
} from "react-bootstrap";
import {
  FaCalculator,
  FaCheck,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentForm: React.FC = () => {
  // 表单状态管理
  const [formData, setFormData] = useState({
    xueHao: "",
    xingMing: "",
    banJi: "",
    shouJiHao: "",
    xingbie: "",
    jiGuan: "",
    Chinese: 0,
    math: 0,
    English: 0,
    xiaoKe: 0,
    grade: 0,
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: 个人信息, 2: 成绩信息

  // 处理输入变化
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // 处理数字字段
    const numericFields = ["Chinese", "math", "English", "xiaoKe", "grade"];
    const newValue = numericFields.includes(name)
      ? parseFloat(value) || 0
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // 计算总分
  const calculateTotal = () => {
    const { Chinese, math, English, xiaoKe } = formData;
    const total = Chinese + math + English + xiaoKe;
    setFormData((prev) => ({ ...prev, grade: total }));
  };

  // 验证个人信息是否完整
  const validatePersonalInfo = () => {
    const requiredFields = [
      "xueHao",
      "xingMing",
      "banJi",
      "shouJiHao",
      "xingbie",
      "jiGuan",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        setError(
          `请填写完整的${
            field === "xingMing"
              ? "姓名"
              : field === "shouJiHao"
              ? "手机号"
              : field === "xingbie"
              ? "性别"
              : field === "jiGuan"
              ? "籍贯"
              : field
          }`
        );
        return false;
      }
    }

    // 验证手机号格式
    if (!/^1\d{10}$/.test(formData.shouJiHao)) {
      setError("手机号格式不正确，应为11位数字");
      return false;
    }

    return true;
  };

  // 验证成绩信息
  const validateScores = () => {
    const scores = [
      { name: "语文", value: formData.Chinese, max: 150 },
      { name: "数学", value: formData.math, max: 150 },
      { name: "英语", value: formData.English, max: 300 },
      { name: "小科", value: formData.xiaoKe, max: 300 },
    ];

    for (const score of scores) {
      if (score.value < 0 || score.value > score.max) {
        setError(`${score.name}成绩必须在0-${score.max}之间`);
        return false;
      }
    }

    // 验证总分
    const calculatedTotal =
      formData.Chinese + formData.math + formData.English + formData.xiaoKe;
    if (Math.abs(calculatedTotal - formData.grade) > 0.01) {
      calculateTotal();
    }

    return true;
  };

  // 下一步
  const handleNext = () => {
    setError("");
    if (validatePersonalInfo()) {
      setStep(2);
    }
  };

  // 上一步
  const handlePrev = () => {
    setError("");
    setStep(1);
  };

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    if (!validateScores()) {
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.zhongzhi.site/students/",
        formData
      );
      console.log(response);
      setSuccess(true);
      setFormData({
        xueHao: "",
        xingMing: "",
        banJi: "",
        shouJiHao: "",
        xingbie: "",
        jiGuan: "",
        Chinese: 0,
        math: 0,
        English: 0,
        xiaoKe: 0,
        grade: 0,
      });

      // 3秒后隐藏成功提示并返回第一步
      setTimeout(() => {
        setSuccess(false);
        setStep(1);
      }, 3000);
    } catch (error: unknown) {
      console.error("提交失败:", error);

      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as import("axios").AxiosError<{
          detail?: string;
        }>;
        setError(
          `提交失败: ${
            axiosError.response?.data?.detail || "请检查数据是否完整正确"
          }`
        );
      } else {
        setError("提交失败: 网络错误或服务器未响应");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 个人信息表单部分
  const renderPersonalInfo = () => (
    <Card className="mb-4 border-0">
      <Card.Body>
        <h4 className="mb-4">学生基本信息</h4>

        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>学号</Form.Label>
                <Form.Control
                  type="text"
                  name="xueHao"
                  value={formData.xueHao}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>姓名</Form.Label>
                <Form.Control
                  type="text"
                  name="xingMing"
                  value={formData.xingMing}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>班级</Form.Label>
                <Form.Control
                  type="text"
                  name="banJi"
                  value={formData.banJi}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>手机号</Form.Label>
                <Form.Control
                  type="tel"
                  name="shouJiHao"
                  value={formData.shouJiHao}
                  onChange={handleChange}
                  pattern="[0-9]{11}"
                  required
                  placeholder="11位手机号码"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>性别</Form.Label>
                <Form.Select
                  name="xingbie"
                  value={formData.xingbie}
                  onChange={handleChange}
                  required
                >
                  <option value="">请选择性别</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>籍贯</Form.Label>
                <Form.Control
                  type="text"
                  name="jiGuan"
                  value={formData.jiGuan}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );

  // 成绩表单部分
  const renderScores = () => (
    <Card className="mb-4 border-0">
      <Card.Body>
        <h4 className="mb-4">学生成绩信息</h4>

        <Form>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>语文成绩</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="Chinese"
                    value={formData.Chinese || ""}
                    onChange={handleChange}
                    min="0"
                    max="150"
                    step="0.01"
                  />
                  <InputGroup.Text>分</InputGroup.Text>
                </InputGroup>
                <Form.Text muted>满分150分</Form.Text>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>数学成绩</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="math"
                    value={formData.math || ""}
                    onChange={handleChange}
                    min="0"
                    max="150"
                    step="0.01"
                  />
                  <InputGroup.Text>分</InputGroup.Text>
                </InputGroup>
                <Form.Text muted>满分150分</Form.Text>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>英语成绩</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="English"
                    value={formData.English || ""}
                    onChange={handleChange}
                    min="0"
                    max="300"
                    step="0.01"
                  />
                  <InputGroup.Text>分</InputGroup.Text>
                </InputGroup>
                <Form.Text muted>满分300分</Form.Text>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>小科成绩</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="xiaoKe"
                    value={formData.xiaoKe || ""}
                    onChange={handleChange}
                    min="0"
                    max="300"
                    step="0.01"
                  />
                  <InputGroup.Text>分</InputGroup.Text>
                </InputGroup>
                <Form.Text muted>满分300分</Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>总分</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="grade"
                    value={formData.grade || ""}
                    onChange={handleChange}
                    readOnly
                  />
                  <InputGroup.Text>分</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6} className="d-flex align-items-end mb-3">
              <Button
                variant="outline-primary"
                onClick={calculateTotal}
                disabled={submitting}
                type="button"
              >
                <FaCalculator className="me-2" />
                计算总分
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h2 className="mb-0">学生信息登记</h2>
              <ProgressBar
                striped
                variant="light"
                now={step === 1 ? 50 : 100}
                label={`第${step}/2步`}
                className="mt-2"
              />
            </Card.Header>

            <Card.Body>
              {success && (
                <Alert variant="success" className="d-flex align-items-center">
                  <FaCheck className="me-2" />
                  数据提交成功！
                </Alert>
              )}

              {error && (
                <Alert
                  variant="danger"
                  onClose={() => setError("")}
                  dismissible
                >
                  {error}
                </Alert>
              )}

              {/* 渲染表单内容 */}
              {step === 1 ? renderPersonalInfo() : renderScores()}

              {/* 导航按钮 */}
              <div className="d-flex justify-content-between">
                {step === 2 && (
                  <Button
                    variant="outline-secondary"
                    onClick={handlePrev}
                    disabled={submitting}
                    type="button"
                  >
                    <FaArrowLeft className="me-2" />
                    上一步
                  </Button>
                )}

                <div className="ms-auto">
                  {step === 1 ? (
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      type="button"
                      disabled={submitting}
                    >
                      下一步 <FaArrowRight className="ms-2" />
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      type="button" // 关键修改：改为 type="button"
                      disabled={submitting}
                      onClick={handleSubmit} // 直接绑定提交处理函数
                    >
                      {submitting ? "提交中..." : "提交信息"}
                    </Button>
                  )}
                </div>
              </div>
            </Card.Body>

            <Card.Footer className="text-muted">
              学生信息登记系统 | 当前时间: {new Date().toLocaleString()}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentForm;
