import React, { useState, useRef, type ChangeEvent } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  ProgressBar,
  Modal,
  Image as BootstrapImage,
} from "react-bootstrap";
import axios, { AxiosError, type AxiosProgressEvent } from "axios";

// 类型定义
type OcrResult = {
  realname: string;
  identitycard: string;
  idphoto: string; // 现在是一个URL字符串
};

type OcrErrorResponse = {
  detail?: string;
  error_msg?: string;
  error_code?: number;
};

const RealNameVerification: React.FC = () => {
  // 状态管理
  const [email, setEmail] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [validationSuccess, setValidationSuccess] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 邮箱验证函数
  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // 处理文件选择
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFile = e.target.files[0];

    // 验证文件类型
    if (!["image/jpeg", "image/png", "image/jpg"].includes(selectedFile.type)) {
      setErrorMessage("请上传 JPG, JPEG 或 PNG 格式的图片");
      return;
    }

    // 验证文件大小
    if (selectedFile.size > 5 * 1024 * 1024) {
      // 5MB
      setErrorMessage("图片大小不能超过 5MB");
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setErrorMessage("");
    setValidationSuccess(false);
  };

  // 触发文件输入点击
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // 提交表单进行实名认证
  const handleSubmit = async () => {
    // 验证邮箱格式
    if (!isValidEmail(email)) {
      setErrorMessage("请输入有效的邮箱地址");
      return;
    }

    if (!file) {
      setErrorMessage("请上传身份证照片");
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);
    setErrorMessage("");
    setValidationSuccess(false);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("file", file);

    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        },
      };

      const response = await axios.post(
        "https://api.zhongzhi.site/auth/realname_verify",
        formData,
        config
      );

      if (response.data.status === "success") {
        setOcrResult(response.data.data);
        setValidationSuccess(true);
      } else {
        setErrorMessage(response.data.message || "实名认证失败");
      }
    } catch (error) {
      const axiosError = error as AxiosError<OcrErrorResponse>;
      if (axiosError.response) {
        // 根据不同类型的错误响应显示不同的错误信息
        const responseData = axiosError.response.data;
        if (responseData.detail) {
          setErrorMessage(`认证失败: ${responseData.detail}`);
        } else if (responseData.error_msg) {
          setErrorMessage(
            `OCR识别失败: ${responseData.error_msg} (错误码: ${responseData.error_code})`
          );
        } else {
          setErrorMessage("服务器返回了未知错误");
        }
      } else {
        setErrorMessage("网络连接错误，请稍后再试");
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setUploadProgress(0), 1500);
    }
  };

  // 清除文件选择
  const clearFileSelection = () => {
    setFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 脱敏处理身份证号
  const maskIdCard = (id: string): string => {
    if (id.length <= 10) return id;
    return id.substring(0, 6) + "********" + id.substring(14);
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-0 pt-4">
              <Card.Title as="h2" className="mb-0">
                实名认证
              </Card.Title>
              <Card.Text className="text-muted mt-2">
                请输入您的邮箱并上传身份证照片完成实名认证
              </Card.Text>
            </Card.Header>

            <Card.Body>
              {/* 邮箱输入区域 */}
              <Form.Group className="mb-4">
                <Form.Label>邮箱地址</Form.Label>
                <div className="d-flex align-items-center">
                  <i className="bi bi-envelope-fill me-2 text-primary"></i>
                  <Form.Control
                    type="email"
                    placeholder="请输入您的邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="me-2"
                  />
                  <Button
                    variant="outline-primary"
                    size="sm"
                    style={{width: "100px"}}
                    onClick={() => {
                      // 自动填充当前登录用户的邮箱（如果已登录）
                      const userEmail = localStorage.getItem("userEmail");
                      if (userEmail) setEmail(userEmail);
                    }}
                    title="使用当前登录邮箱"
                  >
                    自动填充
                  </Button>
                </div>
                <Form.Text className="text-muted">
                  系统将使用此邮箱验证您的账户信息
                </Form.Text>
              </Form.Group>

              {/* 认证成功展示 */}
              {validationSuccess && ocrResult && (
                <Alert
                  variant="success"
                  className="border-left-success border-left-3"
                >
                  <Row>
                    <Col md={9}>
                      <h4 className="text-success mb-3">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        实名认证成功
                      </h4>
                      <Row>
                        <Col md={6} className="mb-2">
                          <div className="d-flex align-items-center">
                            <span className="fw-bold me-2">姓名:</span>
                            <span>{ocrResult.realname}</span>
                          </div>
                        </Col>
                        <Col md={6} className="mb-2">
                          <div className="d-flex align-items-center">
                            <span className="fw-bold me-2">身份证号:</span>
                            <span>{maskIdCard(ocrResult.identitycard)}</span>
                          </div>
                        </Col>
                        <Col className="mt-3">
                          <div className="d-flex align-items-center">
                            <span className="fw-bold me-2">照片:</span>
                            <div className="border rounded p-1">
                              <BootstrapImage
                                src={ocrResult.idphoto} // 直接使用URL
                                alt="认证照片"
                                thumbnail
                                style={{ maxHeight: "80px" }}
                                onError={(e) => {
                                  // 如果图片加载失败，显示备用图片
                                  e.currentTarget.src =
                                    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iOTAiPjxyZWN0IHdpZHRoPSIxNDAiIGhlaWdodD0iOTAiIGZpbGw9IiNmNWY1ZjUiLz48dGV4dCB4PSIyMCIgeT0iNDUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2RkZCI+55u05Y+K5Lqk5Y+3PC90ZXh0Pjwvc3ZnPg==";
                                }}
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={3} className="text-center">
                      <div className="bg-success bg-opacity-10 rounded-circle p-3 d-inline-block">
                        <i
                          className="bi bi-check-circle text-success"
                          style={{ fontSize: "2rem" }}
                        ></i>
                      </div>
                    </Col>
                  </Row>
                </Alert>
              )}

              {/* 文件上传区域 */}
              {!validationSuccess && (
                <>
                  <h5 className="mb-3">
                    <i className="bi bi-card-image me-2 text-primary"></i>
                    上传身份证照片
                  </h5>

                  <Card className="mb-4 border-dashed">
                    <Card.Body
                      className={`d-flex flex-column align-items-center justify-content-center py-5 ${
                        !file ? "cursor-pointer" : ""
                      }`}
                      onClick={!file ? triggerFileInput : undefined}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/jpeg,image/png,image/jpg"
                        className="d-none"
                      />

                      {previewUrl ? (
                        <div className="text-center">
                          <BootstrapImage
                            src={previewUrl}
                            alt="身份证预览"
                            className="mb-3"
                            fluid
                            style={{ maxHeight: "200px" }}
                          />
                          <Button
                            variant="outline-danger"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearFileSelection();
                            }}
                          >
                            <i className="bi bi-x-circle me-1"></i> 重新选择
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="bg-light bg-opacity-50 rounded-circle p-3 mb-3">
                            <i
                              className="bi bi-card-image text-primary"
                              style={{ fontSize: "2.5rem" }}
                            ></i>
                          </div>
                          <h5 className="mb-2">上传身份证照片</h5>
                          <p className="text-muted mb-3">
                            点击上传身份证正面照片
                          </p>
                          <p className="text-muted small mb-1">
                            支持格式: JPG/PNG/JPEG
                          </p>
                          <p className="text-muted small">最大文件大小: 5MB</p>
                        </div>
                      )}
                    </Card.Body>
                  </Card>

                  {/* 错误提示 */}
                  {errorMessage && (
                    <Alert
                      variant="danger"
                      className="d-flex align-items-center"
                    >
                      <i className="bi bi-exclamation-circle-fill me-2"></i>
                      {errorMessage}
                    </Alert>
                  )}

                  {/* 上传进度 */}
                  {isLoading && (
                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-1">
                        <span>上传中...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <ProgressBar
                        animated
                        now={uploadProgress}
                        variant={uploadProgress === 100 ? "success" : "primary"}
                      />
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="d-flex gap-3 mt-4">
                    <Button
                      variant="primary"
                      className="flex-grow-1"
                      onClick={handleSubmit}
                      disabled={isLoading || !file}
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          处理中...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send-check me-1"></i> 提交认证
                        </>
                      )}
                    </Button>

                    <Button
                      variant="light"
                      className="d-flex align-items-center"
                      onClick={() => setShowInfoModal(true)}
                    >
                      <i className="bi bi-info-circle me-1"></i> 帮助
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>

            {/* 底部提示 */}
            <Card.Footer className="bg-white border-0 text-muted small d-flex align-items-center">
              <i className="bi bi-shield-lock me-2 text-success"></i>
              我们严格遵守隐私政策，您提供的信息仅用于身份验证
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* 认证信息模态框 */}
      <Modal
        show={showInfoModal}
        onHide={() => setShowInfoModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-person-badge me-2"></i>实名认证指南
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <h5 className="text-primary mb-3">
              <i className="bi bi-patch-question me-2"></i>为什么要实名认证？
            </h5>
            <p>
              根据国家相关规定，完成实名认证的用户才能使用平台的全部功能。实名认证有助于：
            </p>
            <ul>
              <li>保障您的账户安全</li>
              <li>遵守国家互联网信息服务相关法规</li>
              <li>防止身份盗用和欺诈行为</li>
              <li>提供更个性化的服务体验</li>
            </ul>
          </div>

          <div className="mb-4">
            <h5 className="text-primary mb-3">
              <i className="bi bi-list-check me-2"></i>认证流程说明
            </h5>
            <Row>
              <Col md={3}>
                <div className="border rounded p-3 text-center h-100">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <i
                      className="bi bi-envelope text-primary"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </div>
                  <h6>输入邮箱</h6>
                  <p className="small text-muted">提供您的注册邮箱</p>
                </div>
              </Col>
              <Col md={3}>
                <div className="border rounded p-3 text-center h-100">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <i
                      className="bi bi-upload text-primary"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </div>
                  <h6>上传身份证</h6>
                  <p className="small text-muted">上传清晰正面照片</p>
                </div>
              </Col>
              <Col md={3}>
                <div className="border rounded p-3 text-center h-100">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <i
                      className="bi bi-eyeglasses text-primary"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </div>
                  <h6>信息识别</h6>
                  <p className="small text-muted">自动识别姓名和身份证号</p>
                </div>
              </Col>
              <Col md={3}>
                <div className="border rounded p-3 text-center h-100">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <i
                      className="bi bi-shield-check text-primary"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </div>
                  <h6>认证成功</h6>
                  <p className="small text-muted">信息验证通过</p>
                </div>
              </Col>
            </Row>
          </div>

          <div>
            <h5 className="text-primary mb-3">
              <i className="bi bi-shield-shaded me-2"></i>信息安全保障
            </h5>
            <Alert
              variant="success"
              className="border-left-success border-left-3"
            >
              <p className="mb-0">
                <i className="bi bi-lock-fill me-2"></i>
                我们采用银行级数据加密技术保护您的个人信息安全
              </p>
              <p className="mb-0">
                <i className="bi bi-server me-2"></i>
                所有敏感信息均存储在高度安全的云服务器中
              </p>
              <p className="mb-0">
                <i className="bi bi-people me-2"></i>
                未经您授权，我们不会向任何第三方提供您的个人信息
              </p>
            </Alert>

            <div className="mt-3 small text-muted">
              <i className="bi bi-lightbulb me-1"></i>
              上传注意事项：
              <ul>
                <li>确保照片清晰、无反光</li>
                <li>完整显示姓名和身份证号码</li>
                <li>不支持复印件或修改过的图片</li>
                <li>请使用您注册账户时使用的邮箱</li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowInfoModal(false)}>
            我明白了
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RealNameVerification;
