import { useCallback, useEffect, useState, useRef } from "react";
import { Button, Card, Form, ListGroup, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { supabase } from "../../Auth/utils/supabaseClient";
import ImageModal from "../../../utils/ImageModal";

interface Comment {
  id: number;
  name: string;
  content: string;
  created_at: string;
  avatar_url: string;
  user_id: string;
  images?: string[];
}

export default function Comments() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const contentId = searchParams.get("id") || "0";

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [userInfo, setUserInfo] = useState({
    name: "未登录用户",
    avatar_url: "https://img.picgo.net/2025/05/05/touxiange48491887ed787ed.jpg",
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const handleImageClick = (imgUrl: string) => {
    setSelectedImg(imgUrl);
    setShowModal(true);
  };

  // 添加文件输入框的引用
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 模拟点击隐藏的文件输入框
  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 获取当前用户信息
  useEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setCurrentUserId(user.id);

        const { data, error } = await supabase
          .from("users")
          .select("name, avatar_url")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setUserInfo({
            name: data.name || "匿名用户",
            avatar_url: data.avatar_url || userInfo.avatar_url,
          });
        }
      }
    };

    getUserInfo();
  }, [userInfo.avatar_url]);

  // 加载评论
  const loadComments = useCallback(async () => {
    const res = await fetch(
      `https://api.zhongzhi.site/comments?content_id=${contentId}`
    );

    const data = await res.json();
    if (Array.isArray(data.data)) {
      const sorted = data.data
        .slice()
        .sort((a: Comment, b: Comment) =>
          b.created_at.localeCompare(a.created_at)
        )
        .map((item: Comment) => ({
          ...item,
          images: Array.isArray(item.images)
            ? item.images.map((url) => `${url}`)
            : typeof item.images === "string"
            ? JSON.parse(item.images || "[]").map((url: string) => `${url}`)
            : [],
        }));
      setComments(sorted);
    }
  }, [contentId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim() && selectedImages.length === 0) return;

    if (!currentUserId) {
      alert("请先登录再发表评论！");
      return;
    }

    const imageUrls: string[] = [];

    for (let i = 0; i < selectedImages.length; i++) {
      const file = selectedImages[i];
      try {
        const url = await uploadCommentImage(file);
        imageUrls.push(url);
      } catch (error) {
        alert(`第 ${i + 1} 张图片上传失败: ${(error as Error).message}`);
        return;
      }
    }

    const commentData = {
      content: newComment,
      name: userInfo.name,
      avatar_url: userInfo.avatar_url,
      content_id: contentId,
      user_id: currentUserId,
      images: imageUrls,
    };

    await fetch("https://api.zhongzhi.site/comments/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    setNewComment("");
    setSelectedImages([]);
    loadComments();
  };

  const handleDelete = async (commentId: number) => {
    if (!window.confirm("确定删除该评论？")) return;

    const response = await fetch("https://api.zhongzhi.site/comments/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment_id: commentId,
        user_id: currentUserId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "删除失败");
    }

    loadComments();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      handleCommentSubmit(e);
    }
  };

  const uploadCommentImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch(
      "https://api.zhongzhi.site/comments/upload-image",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("图片上传失败");
    }

    const data = await response.json();
    return data.url;
  };

  return (
    <div>
      <Card
        className="w-4/5 mt-4 shadow-sm mx-auto"
        style={{ marginBottom: "50px" }}
      >
        <Card.Header as="h5" className="bg-light">
          🗨️ 评论区（{comments.length} 条）
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleCommentSubmit}>
            <div className="d-flex align-items-start gap-2">
              <Image
                src={userInfo.avatar_url}
                width={32}
                height={32}
                roundedCircle
                style={{
                  aspectRatio: "1/1",
                  objectFit: "cover",
                }}
                alt="头像"
              />
              <Form.Group
                controlId="commentForm"
                className="mb-3 flex-grow-1 position-relative"
              >
                <Form.Control
                  className="rounded-3"
                  as="textarea"
                  rows={1}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="请输入您的评论...(每次最多上传50张图片)"
                  style={{ paddingRight: "40px" }} // 为按钮留出空间
                />
                {/* 图片上传图标按钮 */}
                <Button
                  variant="link"
                  className="position-absolute end-0 bottom-0 p-2"
                  onClick={handleImageUploadClick}
                  title="上传图片"
                  style={{ zIndex: 5, color: "#6c757d" }}
                >
                  <img
                    src="https://img.picgo.net/2025/06/03/838aebce94497c07620ca2ea839a3a4675e71a89eda4731a.png"
                    alt="上传图片"
                    style={{
                      width: "24px",
                      height: "24px",
                    }}
                  />
                </Button>
              </Form.Group>
            </div>

            <Form.Group controlId="imageUpload" className="mb-3">
              <Form.Label className="d-none">上传图片</Form.Label>
              <Form.Control
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="d-none" // 隐藏原始文件输入框
                onChange={(e) => {
                  const input = e.target as HTMLInputElement;
                  const files = Array.from(input.files || []);
                  if (files.length + selectedImages.length > 50) {
                    alert("最多上传 50 张图片");
                    return;
                  }
                  setSelectedImages((prev) => [...prev, ...files]);
                }}
              />

              {/* 已选图片预览 */}
              {selectedImages.length > 0 && (
                <div className="mt-3">
                  <p className="text-muted mb-1">
                    已选图片 ({selectedImages.length}/50):
                  </p>
                  <div className="d-flex flex-wrap gap-2 border rounded p-2">
                    {selectedImages.map((file, index) => (
                      <div key={index} style={{ position: "relative" }}>
                        <Image
                          src={URL.createObjectURL(file)}
                          thumbnail
                          width={80}
                          height={80}
                          style={{ objectFit: "cover" }}
                          className="rounded-2"
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          className="position-absolute top-0 end-0"
                          style={{
                            transform: "translate(30%, -30%)",
                            borderRadius: "50%",
                            padding: "0.15rem 0.35rem",
                          }}
                          onClick={() =>
                            setSelectedImages((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                variant="primary"
                type="submit"
                className="rounded-pill px-4"
                disabled={!newComment.trim() && selectedImages.length === 0}
              >
                发表评论
              </Button>
            </div>
          </Form>

          <ListGroup variant="flush" className="mt-3">
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id} className="py-3 border-bottom">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      src={comment.avatar_url}
                      width={40}
                      height={40}
                      roundedCircle
                      style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                      onClick={() => handleImageClick(comment.avatar_url)}
                      alt="头像"
                    />
                    <div>
                      <strong>{comment.name}</strong>
                      <small className="text-muted d-block">
                        {new Date(comment.created_at).toLocaleString("zh-CN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                  </div>
                  {comment.user_id === currentUserId && (
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="rounded-pill"
                      onClick={() => handleDelete(comment.id)}
                    >
                      删除
                    </Button>
                  )}
                </div>
                <p className="mb-2">{comment.content}</p>

                {comment.images && comment.images.length > 0 && (
                  <div className="d-flex flex-wrap gap-2">
                    {comment.images.map((url, idx) => (
                      <div
                        key={idx}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleImageClick(url)}
                      >
                        <Image
                          src={url}
                          thumbnail
                          width={100}
                          height={100}
                          style={{ objectFit: "cover", aspectRatio: "1/1" }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
      <ImageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        imgUrl={selectedImg}
      />
    </div>
  );
}
