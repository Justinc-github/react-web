import { useState, useEffect } from "react";
import { Button, Card, Form, ListGroup, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";

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

  // 评论区状态管理
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // 获取评论数据
  useEffect(() => {
    fetch(`http://47.95.171.19/comments?content_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          // 按created_at降序排列
          const sorted = data.data
            .slice()
            .sort((a: Comment, b: Comment) =>
              b.created_at.localeCompare(a.created_at)
            );
          setComments(sorted);
        }
      });
  }, [id]);

  // 评论提交处理
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      content: newComment,
      name: "未登录用户",
      avatar_url:
        "https://img.picgo.net/2025/05/05/touxiange48491887ed787ed.jpg",
      content_id: id,
    };

    // 调用后端插入接口
    await fetch("http://47.95.171.19/comments/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    setNewComment("");
    // 重新获取评论并排序
    fetch(`http://47.95.171.19/comments?content_id=${id}`)
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
    <Card className="w-4/5 mt-4 shadow-sm mx-auto">
      <Card.Header as="h5" className="bg-light">
        🗨️ 评论区（{comments.length} 条）
      </Card.Header>
      <Card.Body>
        {/* 评论发表表单 */}
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

        {/* 评论列表 */}
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
