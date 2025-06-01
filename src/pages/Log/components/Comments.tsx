import { useCallback, useEffect, useState } from "react";
import { Button, Card, Form, ListGroup, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { supabase } from "../../Auth/utils/supabaseClient"; // 路径请根据项目调整

interface Comment {
  id: number;
  name: string;
  content: string;
  created_at: string;
  avatar_url: string;
  user_id: string;
}

export default function Comments() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const contentId = searchParams.get("id") || "0";

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    avatar_url: string;
  }>({
    name: "未登录用户",
    avatar_url: "https://img.picgo.net/2025/05/05/touxiange48491887ed787ed.jpg",
  });

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
        );
      setComments(sorted);
    }
  }, [contentId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    if (!currentUserId) {
      alert("请先登录再发表评论！");
      return;
    }
    console.log("supabase user:", currentUserId);

    const commentData = {
      content: newComment,
      name: userInfo.name,
      avatar_url: userInfo.avatar_url,
      content_id: contentId,
      user_id: currentUserId,
    };
    
    await fetch("https://api.zhongzhi.site/comments/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    setNewComment("");
    loadComments();
  };
  

  // 删除评论
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

  // 快捷发送评论
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      handleCommentSubmit(e);
    }
  };

  return (
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
          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              type="submit"
              disabled={!newComment.trim()}
            >
              发表评论
            </Button>
          </div>
        </Form>

        <ListGroup variant="flush" className="mt-3">
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id} className="py-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="d-flex align-items-center">
                  <Image
                    src={comment.avatar_url}
                    roundedCircle
                    width={32}
                    height={32}
                    className="me-2"
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
              <p className="mb-0">{comment.content}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
