import { useCallback, useEffect, useState, useRef } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
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
  images?: unknown; // 允许任何类型，稍后处理
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

  // 修复图片格式问题：确保图片始终是数组
  const normalizeImages = (images: unknown): string[] => {
    // 如果已经是数组，直接返回
    if (Array.isArray(images)) return images;

    // 如果是字符串，尝试解析为JSON
    if (typeof images === "string") {
      try {
        const parsed = JSON.parse(images);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    // 其他情况返回空数组
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
        // 递归处理评论树，确保图片格式正确
        const processComments = (comments: Comment[]): Comment[] => {
          return comments.map((comment) => {
            const processedComment: Comment = {
              ...comment,
              images: normalizeImages(comment.images),
              liked: userLikes[comment.id] || false,
            };

            // 递归处理回复
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

    const wasLiked = userLikes[commentId] || false;
    const updatedUserLikes = { ...userLikes, [commentId]: !wasLiked };
    setUserLikes(updatedUserLikes);

    // 递归更新本地评论中的点赞状态
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

      // 重新加载评论以确保数据一致性
      loadComments();
    } catch (error) {
      console.error("点赞操作失败:", error);

      // 恢复之前的点赞状态
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
          .filter((comment) => comment.id !== commentId) // 直接过滤掉当前层级要删除的评论
          .map((comment) => {
            // 递归处理回复中的评论
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
    const indent = effectiveDepth * 32;
    // 确保图片是数组
    const imageUrls = normalizeImages(comment.images);

    return (
      <div
        key={`${comment.id}-${depth}`}
        className={`py-3 ${depth > 0 ? "border-top" : ""}`}
        style={{
          marginLeft: `${indent}px`,
          borderLeft:
            depth > 0 && depth <= maxDepth ? "2px solid #e9ecef" : "none",
          paddingLeft: depth > 0 ? "16px" : "0",
        }}
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
            className="p0 text-muted"
            onClick={() => handleReplyClick(comment.id, comment.name)}
          >
            <FaReply /> <span className="ms-1">回复</span>
          </Button>
        </div>

        {/* 确保图片是数组并使用imageUrls */}
        {imageUrls && imageUrls.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mt-2">
            {imageUrls.map((url, idx) => (
              <div
                key={idx}
                style={{ cursor: "pointer", maxWidth: "100px" }}
                onClick={() => handleImageClick(url)}
              >
                <Image
                  src={url}
                  thumbnail
                  style={{ objectFit: "cover", aspectRatio: "1/1" }}
                />
              </div>
            ))}
          </div>
        )}

        {/* 确保处理回复 */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            {comment.replies.map((reply) => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <Card.Header className="bg-gradient-to-r from-blue-50 to-indigo-50 py-4">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <Card.Title className="text-xl font-bold text-gray-800">
                评论区
              </Card.Title>
              <p className="text-gray-600 text-sm">
                共{" "}
                {comments.reduce(
                  (total, comment) =>
                    total + 1 + (comment.replies?.length || 0),
                  0
                )}{" "}
                条评论
              </p>
            </div>
          </div>
        </Card.Header>

        <Card.Body className="p-6">
          <Form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex items-start space-x-4">
              <Image
                src={userInfo.avatar_url}
                width={48}
                height={48}
                roundedCircle
                className="object-cover border-2 border-white shadow flex-shrink-0"
                alt="头像"
              />

              <div className="flex-grow">
                {replyingTo && (
                  <div className="bg-blue-50 rounded-lg px-4 py-2 mb-3 flex justify-between items-center">
                    <div className="text-blue-600">
                      回复{" "}
                      <span className="font-medium">@{replyingTo.name}</span>
                    </div>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={cancelReply}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                <div className="relative">
                  <Form.Control
                    as="textarea"
                    ref={textareaRef}
                    value={newComment}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyPress}
                    placeholder={
                      replyingTo
                        ? `回复 @${replyingTo.name}...`
                        : "分享您的想法...(最多上传50张图片)"
                    }
                    className="block w-full rounded-xl border border-gray-200 p-4 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-base"
                    style={{
                      minHeight: "100px",
                      maxHeight: "300px",
                      resize: "none",
                    }}
                  />

                  <div className="absolute right-3 bottom-3 flex">
                    <label
                      htmlFor="fileInput"
                      className="bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-gray-200"
                      title="上传图片"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
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
                        className="hidden"
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
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        已选图片 ({selectedImages.length}/50)
                      </span>
                      <button
                        type="button"
                        className="ml-auto text-sm text-red-500 hover:text-red-700"
                        onClick={() => setSelectedImages([])}
                      >
                        清除全部
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {selectedImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="relative overflow-hidden rounded-lg w-20 h-20">
                            <Image
                              src={URL.createObjectURL(file)}
                              className="object-cover w-full h-full"
                              alt={`上传预览 ${index + 1}`}
                            />
                          </div>
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() =>
                              setSelectedImages((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
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

                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className={`flex items-center justify-center px-5 py-2 font-medium rounded-full text-white shadow transition ${
                      !newComment.trim() && selectedImages.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                    disabled={!newComment.trim() && selectedImages.length === 0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {replyingTo ? `回复 @${replyingTo.name}` : "发表评论"}
                  </button>
                </div>
              </div>
            </div>
          </Form>

          <div className="mt-8">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 p-8 rounded-xl max-w-md mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-16 w-16 text-gray-400"
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
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    暂无评论
                  </h3>
                  <p className="mt-2 text-gray-500">
                    成为第一个分享想法的人吧～
                  </p>
                  <button
                    type="button"
                    className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition"
                    onClick={() => textareaRef.current?.focus()}
                  >
                    发表评论
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 border rounded-2xl bg-white p-5 shadow-sm">
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
