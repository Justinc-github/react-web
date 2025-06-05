import { useCallback, useEffect, useState, useRef } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { supabase } from "../../Auth/utils/supabaseClient";
import ImageModal from "../../../utils/ImageModal";
import { FaReply, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";

interface Comment {
  id: number;
  name: string;
  content: string;
  created_at: string;
  avatar_url: string;
  user_id: string;
  images?: unknown;
  parent_id?: number | null;
  replies: Comment[];
  number_likes: number;
  liked?: boolean;
  reply_count?: number;
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
  const [userLikes, setUserLikes] = useState<Record<number, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const [showOptions, setShowOptions] = useState<Record<number, boolean>>({});

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 检测移动端
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const fetchUserLikes = useCallback(async () => {
    if (!currentUserId) return;

    try {
      const response = await fetch(
        `https://api.zhongzhi.site/comments/user_likes?user_id=${currentUserId}&content_id=${contentId}`
      );

      const data = await response.json();
      if (data.success && data.likes_map) {
        setUserLikes(data.likes_map);
      }
    } catch (error) {
      console.error("获取用户点赞状态失败:", error);
    }
  }, [contentId, currentUserId]);

  // 修复图片格式问题
  const normalizeImages = (images: unknown): string[] => {
    if (Array.isArray(images)) return images;
    if (typeof images === "string") {
      try {
        const parsed = JSON.parse(images);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.zhongzhi.site/comments?content_id=${contentId}`
      );

      const data = await res.json();
      if (Array.isArray(data.data)) {
        const processComments = (comments: Comment[]): Comment[] => {
          return comments.map((comment) => {
            const processedComment: Comment = {
              ...comment,
              images: normalizeImages(comment.images),
              liked: userLikes[comment.id] || false,
            };

            if (Array.isArray(comment.replies)) {
              processedComment.replies = processComments(comment.replies);
            } else {
              processedComment.replies = [];
            }

            return processedComment;
          });
        };

        const processedComments = processComments(data.data);
        setComments(processedComments);
        setShowOptions({}); // 重置所有选项菜单状态
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

  const toggleOptions = (commentId: number) => {
    setShowOptions((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplyClick = (commentId: number, userName: string) => {
    setReplyingTo({ id: commentId, name: userName });
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    // 关闭所有选项菜单
    setShowOptions({});
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const handleLikeClick = async (commentId: number) => {
    if (!currentUserId) {
      alert("请先登录再点赞评论！");
      return;
    }

    const wasLiked = userLikes[commentId] || false;
    const updatedUserLikes = { ...userLikes, [commentId]: !wasLiked };
    setUserLikes(updatedUserLikes);

    const updateCommentLikes = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            number_likes: wasLiked
              ? comment.number_likes - 1
              : comment.number_likes + 1,
            liked: !wasLiked,
          };
        }

        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: updateCommentLikes(comment.replies),
          };
        }

        return comment;
      });
    };

    setComments((prev) => updateCommentLikes(prev));

    try {
      const response = await fetch(
        "https://api.zhongzhi.site/comments/toggle_like",
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

      loadComments();
    } catch (error) {
      console.error("点赞操作失败:", error);
      setUserLikes((prev) => ({ ...prev, [commentId]: wasLiked }));
      setComments((prev) => updateCommentLikes(prev));
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
    fetchUserLikes();
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

      const deleteComment = (comments: Comment[]): Comment[] => {
        return comments
          .filter((comment) => comment.id !== commentId)
          .map((comment) => {
            if (comment.replies && comment.replies.length > 0) {
              return {
                ...comment,
                replies: deleteComment(comment.replies),
              };
            }
            return comment;
          });
      };

      setComments((prev) => deleteComment(prev));
      setShowOptions((prev) => {
        const newState = { ...prev };
        delete newState[commentId];
        return newState;
      });
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

  // 递归渲染多级评论
  const renderComment = (comment: Comment, depth: number = 0) => {
    const maxDepth = 2;
    const effectiveDepth = Math.min(depth, maxDepth);
    const indent = effectiveDepth * (isMobile ? 12 : 16);
    const imageUrls = normalizeImages(comment.images);

    return (
      <div
        key={`${comment.id}-${depth}`}
        className={`py-3 relative ${depth > 0 ? "border-top" : ""}`}
        style={{
          marginLeft: `${indent}px`,
          borderLeft: depth > 0 ? "1px solid #e9ecef" : "none",
          paddingLeft: depth > 0 ? "12px" : "0",
        }}
      >
        {/* 顶部信息栏 */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center gap-2">
            <Image
              src={comment.avatar_url}
              width={isMobile ? 36 : 40}
              height={isMobile ? 36 : 40}
              roundedCircle
              style={{
                aspectRatio: "1/1",
                objectFit: "cover",
                border: "1px solid #f0f0f0",
              }}
              onClick={() => handleImageClick(comment.avatar_url)}
              alt="头像"
            />
            <div>
              <div className="d-flex align-items-center">
                <strong
                  style={{
                    fontSize: isMobile ? "0.95rem" : "1rem",
                    fontWeight: 600,
                  }}
                >
                  {comment.name}
                </strong>
              </div>
              <small
                className="text-muted d-block"
                style={{
                  fontSize: isMobile ? "0.75rem" : "0.875rem",
                  marginTop: isMobile ? "2px" : "0",
                }}
              >
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

          {/* 三点菜单按钮 */}
          {currentUserId === comment.user_id && (
          <div className="position-relative">
            <Button
              variant="link"
              className="p-0 text-muted"
              onClick={() => toggleOptions(comment.id)}
            >
              <FaEllipsisV style={{ fontSize: "1.2rem" }} />
            </Button>

            {/* 删除选项菜单 */}
            {showOptions[comment.id] && (
              <div
                className="position-absolute bg-white shadow-sm rounded border"
                style={{
                  right: 0,
                  top: "100%",
                  zIndex: 100,
                  width: "100px",
                }}
              >
                <Button
                  variant="outline-danger"
                  className="w-100 rounded-0 text-start"
                  onClick={() => handleDelete(comment.id)}
                  style={{ fontSize: isMobile ? "0.85rem" : "0.9rem" }}
                >
                  删除
                </Button>
              </div>
            )}
          </div>
          )}
        </div>

        {/* 评论内容 */}
        <p
          className="mb-2 mt-1"
          style={{
            fontSize: isMobile ? "0.92rem" : "0.95rem",
            lineHeight: 1.4,
          }}
        >
          {comment.content}
        </p>

        {/* 操作按钮 */}
        <div
          className="d-flex align-items-center gap-3 mt-2"
          style={{ fontSize: isMobile ? "0.85rem" : "0.9rem" }}
        >
          <Button
            variant="link"
            className="p-0 text-muted d-flex align-items-center"
            onClick={() => handleLikeClick(comment.id)}
          >
            {comment.liked ? (
              <FaThumbsUp className="text-primary" style={{ marginRight: 4 }} />
            ) : (
              <FaRegThumbsUp style={{ marginRight: 4 }} />
            )}
            {comment.number_likes > 0 && comment.number_likes}
          </Button>

          <Button
            variant="link"
            className="p-0 text-muted d-flex align-items-center"
            onClick={() => handleReplyClick(comment.id, comment.name)}
          >
            <FaReply style={{ marginRight: 4 }} />
            回复
          </Button>
        </div>

        {/* 图片预览 */}
        {Array.isArray(imageUrls) && imageUrls.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mt-2">
            {imageUrls.map((url, idx) => (
              <div
                key={idx}
                className="rounded overflow-hidden"
                style={{
                  cursor: "pointer",
                  width: isMobile ? "70px" : "90px",
                  height: isMobile ? "70px" : "90px",
                }}
                onClick={() => handleImageClick(url)}
              >
                <Image
                  src={url}
                  className="w-100 h-100"
                  style={{
                    objectFit: "cover",
                    aspectRatio: "1/1",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* 回复部分 */}
        {Array.isArray(comment.replies) && comment.replies.length > 0 && (
          <div className="mt-3">
            {comment.replies.map((reply) => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={isMobile ? "px-3 py-3" : "container mx-auto px-4 py-6"}>
      <Card className="shadow rounded-xl overflow-hidden border-0">
        <Card.Header
          className="bg-white py-3 px-3"
          style={{ borderBottom: "1px solid #f0f0f0" }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="bg-light p-2 rounded-circle d-flex align-items-center justify-content-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <Card.Title
                  className="mb-0"
                  style={{
                    fontSize: isMobile ? "1.1rem" : "1.2rem",
                    fontWeight: 600,
                  }}
                >
                  评论区
                </Card.Title>
              </div>
            </div>
            <span
              className="text-muted"
              style={{ fontSize: isMobile ? "0.85rem" : "0.9rem" }}
            >
              {comments.reduce(
                (total, comment) => total + 1 + (comment.replies?.length || 0),
                0
              )}{" "}
              条
            </span>
          </div>
        </Card.Header>

        <Card.Body className="p-3">
          <Form onSubmit={handleCommentSubmit} className="mb-4">
            <div className="d-flex flex-column">
              <div className="position-relative">
                {replyingTo && (
                  <div
                    className="bg-blue-50 rounded-lg px-3 py-2 mb-3 d-flex justify-content-between align-items-center"
                    style={{ border: "1px solid #d0e0ff" }}
                  >
                    <div className="text-blue-600">
                      回复{" "}
                      <span className="font-medium">@{replyingTo.name}</span>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={cancelReply}
                    />
                  </div>
                )}

                <Form.Control
                  as="textarea"
                  ref={textareaRef}
                  value={newComment}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyPress}
                  placeholder={
                    replyingTo
                      ? `回复 @${replyingTo.name}...`
                      : "分享您的想法..."
                  }
                  className="rounded-lg border border-gray-300 p-3"
                  style={{
                    minHeight: "90px",
                    maxHeight: "200px",
                    resize: "none",
                    fontSize: isMobile ? "0.95rem" : "1rem",
                  }}
                />

                <div className="position-absolute bottom-2 right-2 d-flex">
                  <label
                    htmlFor="fileInput"
                    className="text-muted cursor-pointer"
                    title="上传图片"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
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
                  </label>
                </div>
              </div>

              {selectedImages.length > 0 && (
                <div className="mt-3 bg-gray-50 rounded-lg p-3">
                  <div className="d-flex align-items-center mb-2">
                    <span
                      className="text-gray-700"
                      style={{ fontSize: isMobile ? "0.85rem" : "0.9rem" }}
                    >
                      已选图片 ({selectedImages.length}/50)
                    </span>
                    <button
                      type="button"
                      className="ms-auto text-danger"
                      style={{ fontSize: isMobile ? "0.85rem" : "0.9rem" }}
                      onClick={() => setSelectedImages([])}
                    >
                      清除全部
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {selectedImages.map((file, index) => (
                      <div
                        key={index}
                        className="position-relative"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <div className="w-100 h-100 rounded overflow-hidden">
                          <Image
                            src={URL.createObjectURL(file)}
                            className="w-100 h-100"
                            alt={`上传预览 ${index + 1}`}
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <button
                          type="button"
                          className="position-absolute top-0 end-0 bg-white rounded-circle p-0 d-flex align-items-center justify-content-center"
                          style={{
                            width: "16px",
                            height: "16px",
                            transform: "translate(25%, -25%)",
                          }}
                          onClick={() =>
                            setSelectedImages((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-danger"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="d-flex align-items-center gap-2">
                  <Image
                    src={userInfo.avatar_url}
                    width={36}
                    height={36}
                    roundedCircle
                    className="border border-2 border-white shadow"
                    style={{
                      width: "36px",
                      height: "36px",
                      objectFit: "cover",
                    }}
                    alt="头像"
                  />
                  <span
                    style={{
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: 500,
                    }}
                  >
                    {userInfo.name}
                  </span>
                </div>

                <button
                  type="submit"
                  className={`px-4 py-2 rounded-pill text-white shadow-none border-0 ${
                    !newComment.trim() && selectedImages.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary"
                  }`}
                  disabled={!newComment.trim() && selectedImages.length === 0}
                  style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}
                >
                  {replyingTo ? "回复" : "发布"}
                </button>
              </div>
            </div>
          </Form>

          <div className="mt-4">
            {isLoading ? (
              <div className="d-flex justify-center py-8">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">加载中...</span>
                </div>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-light rounded-xl p-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-16 w-16 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-800">
                    暂无评论
                  </h3>
                  <p className="text-gray-600 mt-2">
                    成为第一个分享想法的人吧～
                  </p>
                  <button
                    type="button"
                    className="mt-4 bg-primary text-white font-medium py-2 px-5 rounded-pill border-0"
                    onClick={() => textareaRef.current?.focus()}
                  >
                    发表评论
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="border rounded-2xl bg-white p-3"
                style={{ borderColor: "#f0f0f0" }}
              >
                {comments.map((comment) => renderComment(comment, 0))}
              </div>
            )}
          </div>
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
