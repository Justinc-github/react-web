import { useState, useEffect } from "react";
import { Button, Card, Form, ListGroup, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { supabase } from "../../Auth/utils/supabaseClient"; // 根据你的路径修改

export default function Comments() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") || "0";

  interface Comment {
    id: number;
    name: string;
    content: string;
    created_at: string;
    avatar_url: string;
  }

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userInfo, setUserInfo] = useState<{
    name: string;
    avatar_url: string;
  }>({
    name: "未登录用户",
    avatar_url: "https://img.picgo.net/2025/05/05/touxiange48491887ed787ed.jpg",
  });

  // 获取当前登录用户信息
  useEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("name, avatar_url")
          .eq("id", user.id)
          .single();

        if (data && !error) {
          setUserInfo({
            name: data.name || "匿名用户",
            avatar_url:
              data.avatar_url ||
              "https://img.picgo.net/2025/05/05/touxiange48491887ed787ed.jpg",
          });
        }
      }
    };

    getUserInfo();
  }, []);

  // 获取评论数据
  useEffect(() => {
    fetch(`https://api.zhongzhi.site/comments?content_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          const sorted = data.data
            .slice()
            .sort((a: Comment, b: Comment) =>
              b.created_at.localeCompare(a.created_at)
            );
          setComments(sorted);
        }
      });
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      content: newComment,
      name: userInfo.name,
      avatar_url: userInfo.avatar_url,
      content_id: id,
    };

    await fetch("https://api.zhongzhi.site/comments/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    setNewComment("");

    // 重新加载评论
    fetch(`https://api.zhongzhi.site/comments?content_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          const sorted = data.data
            .slice()
            .sort((a: Comment, b: Comment) =>
              b.created_at.localeCompare(a.created_at)
            );
          setComments(sorted);
        }
      });
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

        <ListGroup variant="flush">
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
                <small className="text-muted">
                  {comment.created_at.slice(0, 19).replace("T", " ")}
                </small>
              </div>
              <p className="mb-0">{comment.content}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
