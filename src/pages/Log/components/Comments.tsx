import { useCallback, useEffect, useState } from "react";
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
    // console.log(data.data);
    if (Array.isArray(data.data)) {
      const sorted = data.data
        .slice()
        .sort((a: Comment, b: Comment) =>
          b.created_at.localeCompare(a.created_at)
        )
        .map((item: Comment) => ({
          ...item,
          images: Array.isArray(item.images)
            ? item.images.map((url) => `${url}`) // 为每个URL添加前缀
            : typeof item.images === "string"
            ? JSON.parse(item.images || "[]").map(
                (url: string) => `${url}`
              ) // 解析后添加前缀
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
    return data.url; // 返回图片的访问 URL
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
            <Form.Group controlId="commentForm" className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="请输入您的评论..."
              />
            </Form.Group>

            <Form.Group controlId="imageUpload" className="mb-3">
              <Form.Label>上传图片</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const input = e.target as HTMLInputElement;
                  const files = Array.from(input.files || []);
                  if (files.length + selectedImages.length > 5) {
                    alert("最多上传 5 张图片");
                    return;
                  }
                  setSelectedImages((prev) => [...prev, ...files]);
                }}
              />
              <div className="mt-2 d-flex flex-wrap gap-2">
                {selectedImages.map((file, index) => (
                  <div key={index} style={{ position: "relative" }}>
                    <Image
                      src={URL.createObjectURL(file)}
                      thumbnail
                      width={80}
                      height={80}
                      style={{ objectFit: "cover" }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      style={{
                        position: "absolute",
                        top: -5,
                        right: -5,
                        borderRadius: "50%",
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
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                variant="primary"
                type="submit"
                disabled={!newComment.trim() && selectedImages.length === 0}
              >
                发表评论
              </Button>
            </div>
          </Form>

          <ListGroup variant="flush" className="mt-3">
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id} className="py-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      src={comment.avatar_url}
                      width={32}
                      height={32}
                      roundedCircle
                      style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                      alt="avatar"
                    />
                    <strong>{comment.name}</strong>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <small className="text-muted">
                      {comment.created_at.slice(0, 19).replace("T", " ")}
                    </small>
                    {comment.user_id === currentUserId && (
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(comment.id)}
                      >
                        删除
                      </Button>
                    )}
                  </div>
                </div>
                <p className="mb-1">{comment.content}</p>

                {comment.images && comment.images.length > 0 && (
                  <div className="d-flex flex-wrap gap-2">
                    {comment.images.map((url, idx) => (
                      <Image
                        key={idx}
                        src={url}
                        thumbnail
                        width={100}
                        height={100}
                        onClick={() =>
                          handleImageClick(
                            url
                          )
                        }
                      />
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
