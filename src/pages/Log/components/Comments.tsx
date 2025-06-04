import { useCallback, useEffect, useState, useRef } from "react";
import { Button, Card, Form, ListGroup, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { supabase } from "../../Auth/utils/supabaseClient";
import ImageModal from "../../../utils/ImageModal";
import { FaReply, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

interface Comment {
  id: number;
  name: string;
  content: string;
  created_at: string;
  avatar_url: string;
  user_id: string;
  images?: string[];
  parent_id?: number | null;
  replies: Comment[];
  number_likes: number;
  liked?: boolean;
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
  const [replyingTo, setReplyingTo] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLikes, setUserLikes] = useState<Record<number, boolean>>({}); // 用户点赞状态

  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleImageClick = (imgUrl: string) => {
    setSelectedImg(imgUrl);
    setShowModal(true);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        300
      )}px`;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
    setTimeout(adjustTextareaHeight, 0);
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

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

  // 加载用户点赞状态
  const fetchUserLikes = useCallback(async () => {
    if (!currentUserId) return;

    try {
      const response = await fetch(
        `https://127.0.0.1:8000/comments/user_likes?user_id=${currentUserId}&content_id=${contentId}`
      );

      const data = await response.json();
      if (data.success && data.likes_map) {
        setUserLikes(data.likes_map);
      }
    } catch (error) {
      console.error("获取用户点赞状态失败:", error);
    }
  }, [contentId, currentUserId]);

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.zhongzhi.site/comments?content_id=${contentId}`
      );

      const data = await res.json();
      if (Array.isArray(data.data)) {
        // 使用从后端获取的用户点赞状态
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
            liked: userLikes[item.id] || false, // 使用用户点赞状态
          }));

        setComments(sorted);
      }
    } catch (error) {
      console.error("加载评论失败:", error);
    } finally {
      setIsLoading(false);
    }
  }, [contentId, userLikes]);

  useEffect(() => {
    if (currentUserId) {
      fetchUserLikes();
    }
  }, [currentUserId, fetchUserLikes]);

  useEffect(() => {
    if (Object.keys(userLikes).length > 0 || !currentUserId) {
      loadComments();
    }
  }, [userLikes, loadComments, currentUserId]);

  const handleReplyClick = (commentId: number, userName: string) => {
    setReplyingTo({ id: commentId, name: userName });
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const handleLikeClick = async (commentId: number) => {
    if (!currentUserId) {
      alert("请先登录再点赞评论！");
      return;
    }

    // 获取当前点赞状态
    const wasLiked = userLikes[commentId] || false;

    // 1. 更新用户点赞状态（立即反馈给用户）
    const updatedUserLikes = { ...userLikes, [commentId]: !wasLiked };
    setUserLikes(updatedUserLikes);

    // 2. 更新评论状态（乐观更新）
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            number_likes: wasLiked
              ? comment.number_likes - 1
              : comment.number_likes + 1,
            liked: !wasLiked,
          };
        }

        // 检查回复
        if (comment.replies) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === commentId) {
              return {
                ...reply,
                number_likes: wasLiked
                  ? reply.number_likes - 1
                  : reply.number_likes + 1,
                liked: !wasLiked,
              };
            }
            return reply;
          });
          return { ...comment, replies: updatedReplies };
        }

        return comment;
      })
    );

    try {
      // 3. 发送请求到后端
      const response = await fetch(
        "http://127.0.0.1:8000/comments/toggle_like",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comment_id: commentId,
            user_id: currentUserId,
            content_id: contentId,
          }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error("点赞操作失败");
      }

      // 4. 根据后端返回的准确数据更新UI
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              number_likes: result.new_likes,
              liked: result.action === "liked",
            };
          }

          if (comment.replies) {
            const updatedReplies = comment.replies.map((reply) => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  number_likes: result.new_likes,
                  liked: result.action === "liked",
                };
              }
              return reply;
            });
            return { ...comment, replies: updatedReplies };
          }

          return comment;
        })
      );
    } catch (error) {
      console.error("点赞操作失败:", error);

      // 5. 发生错误时恢复UI状态
      setUserLikes((prev) => {
        const updated = { ...prev };
        delete updated[commentId]; // 恢复之前的点赞状态
        return updated;
      });

      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              number_likes: comment.number_likes,
              liked: comment.liked,
            };
          }

          if (comment.replies) {
            const updatedReplies = comment.replies.map((reply) => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  number_likes: reply.number_likes,
                  liked: reply.liked,
                };
              }
              return reply;
            });
            return { ...comment, replies: updatedReplies };
          }

          return comment;
        })
      );
    }
  };

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
      content: replyingTo
        ? `回复 @${replyingTo.name}: ${newComment}`
        : newComment,
      name: userInfo.name,
      avatar_url: userInfo.avatar_url,
      content_id: contentId,
      user_id: currentUserId,
      images: imageUrls,
      parent_id: replyingTo?.id || null,
    };

    await fetch("https://api.zhongzhi.site/comments/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    setNewComment("");
    setSelectedImages([]);
    setReplyingTo(null);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    loadComments();
    fetchUserLikes(); // 重新加载点赞状态
  };

  const handleDelete = async (commentId: number) => {
    if (!window.confirm("确定删除该评论？")) return;

    try {
      const response = await fetch(
        "https://api.zhongzhi.site/comments/delete",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comment_id: commentId,
            user_id: currentUserId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "删除失败");
      }

      loadComments();
      fetchUserLikes(); // 重新加载点赞状态
    } catch (error) {
      console.error("删除评论失败:", error);
      alert("删除评论失败，请重试");
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      handleCommentSubmit(e);
    }
  };

  // 渲染评论及其回复
  const renderCommentWithReplies = (comment: Comment) => {
    const isReply = comment.parent_id !== null;

    return (
      <div
        key={comment.id}
        className={`py-3 border-bottom ${
          isReply ? "reply-comment pl-4 border-left ml-4" : ""
        }`}
      >
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center gap-2">
            <Image
              src={comment.avatar_url}
              width={40}
              height={40}
              roundedCircle
              style={{ aspectRatio: "1/1", objectFit: "cover" }}
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

        {/* 点赞和回复操作 */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <Button
            variant="link"
            className="p-0 text-muted"
            onClick={() => handleLikeClick(comment.id)}
          >
            {comment.liked ? (
              <FaThumbsUp className="text-primary" />
            ) : (
              <FaRegThumbsUp />
            )}
            <span className="ms-1">{comment.number_likes}</span>
          </Button>

          <Button
            variant="link"
            className="p-0 text-muted"
            onClick={() => handleReplyClick(comment.id, comment.name)}
          >
            <FaReply /> <span className="ms-1">回复</span>
          </Button>
        </div>

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

        {/* 显示回复 */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            {comment.replies.map((reply) => renderCommentWithReplies(reply))}
          </div>
        )}
      </div>
    );
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
                  marginTop: "10px",
                }}
                alt="头像"
              />
              <Form.Group
                controlId="commentForm"
                className="mb-3 flex-grow-1 position-relative"
              >
                {replyingTo && (
                  <div className="d-flex justify-content-between align-items-center mb-2 bg-light p-2 rounded">
                    <small className="text-primary">
                      回复 @{replyingTo.name}
                    </small>
                    <Button
                      variant="link"
                      className="p-0 text-danger"
                      onClick={cancelReply}
                    >
                      取消回复
                    </Button>
                  </div>
                )}

                <Form.Control
                  className="rounded-3"
                  as="textarea"
                  ref={textareaRef}
                  value={newComment}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyPress}
                  placeholder={
                    replyingTo
                      ? `回复 @${replyingTo.name}...`
                      : "请输入您的评论...(每次最多上传50张图片)"
                  }
                  style={{
                    paddingRight: "40px", // 为图标预留空间
                    minHeight: "20px",
                    maxHeight: "300px",
                    resize: "none",
                    overflowY: "auto",
                  }}
                />

                {/* 上传按钮 - 绝对定位在输入框内 */}
                <div
                  className="position-absolute top-50"
                  style={{
                    right: "10px",
                    transform: "translateY(-50%)",
                    zIndex: 5,
                  }}
                >
                  <Button
                    variant="light"
                    className="rounded-pill p-1 border-0"
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                    style={{
                      background: "none",
                    }}
                  >
                    <img
                      src="https://img.picgo.net/2025/06/03/838aebce94497c07620ca2ea839a3a4675e71a89eda4731a.png"
                      alt="上传图片"
                      style={{
                        width: "24px",
                        height: "24px",
                        opacity: "0.7",
                        transition: "opacity 0.2s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
                      onMouseOut={(e) =>
                        (e.currentTarget.style.opacity = "0.7")
                      }
                    />
                  </Button>
                </div>
              </Form.Group>
            </div>

            <Form.Group controlId="imageUpload" className="mb-3">
              <input
                type="file"
                multiple
                accept="image/*"
                className="d-none"
                id="fileInput"
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
            </Form.Group>

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

            <div className="d-flex justify-content-end mt-3">
              <Button
                variant="primary"
                type="submit"
                className="rounded-pill px-4"
                disabled={!newComment.trim() && selectedImages.length === 0}
              >
                {replyingTo ? `回复 @${replyingTo.name}` : "发表评论"}
              </Button>
            </div>
          </Form>

          <ListGroup variant="flush" className="mt-3">
            {isLoading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">加载中...</span>
                </div>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-4 text-muted">
                暂无评论，快来发表第一条吧～
              </div>
            ) : (
              comments.map((comment) => renderCommentWithReplies(comment))
            )}
          </ListGroup>
        </Card.Body>
      </Card>
      <ImageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        imgUrl={selectedImg}
      />

      <style>
        {`
          .reply-comment {
            border-left: 3px solid #e9ecef;
            padding-left: 1rem;
            margin-left: 2rem;
            position: relative;
          }
          
          .reply-comment:before {
            content: '';
            position: absolute;
            left: -1rem;
            top: 2.5rem;
            height: 1px;
            width: 1rem;
            border-top: 1px dashed #dee2e6;
          }
          
          .btn-link.text-muted:hover {
            text-decoration: none;
          }
        `}
      </style>
    </div>
  );
}
