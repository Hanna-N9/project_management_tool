import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import CommentForm from "./CommentForm";
import EditComment from "./EditComment";

export default function Comments() {
  const { isAuthenticated } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("/comments")
        .then(response => setComments(response.data))
        .catch(error => console.error(error));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Please log in to view comments.</p>;
  }

  function handleNewComment(newComment) {
    setComments([...comments, newComment]);
  }

  function handleDeleteComment(id) {
    axios
      .delete(`/comments/${id}`)
      .then(response => {
        if (response.status === 204) {
          setComments(comments.filter(comment => comment.id !== id));
        } else {
          throw new Error("Unexpected response status");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleCommentUpdate(updatedComment) {
    setComments(
      comments.map(comment =>
        comment.id === updatedComment.id ? updatedComment : comment,
      ),
    );
  }

  const handleEditComment = commentId => {
    setEditingCommentId(commentId);
  };

  const handleStopEditing = () => {
    setEditingCommentId(null);
  };

  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id}>
          <h3>Task: {comment.task ? comment.task.title : ""}</h3>
          {editingCommentId === comment.id ? (
            <>
              <p>
                <b>Comment:</b> {comment.text}
              </p>
              <EditComment
                commentId={comment.id}
                initialValues={comment}
                onUpdate={handleCommentUpdate}
                onCancel={handleStopEditing}
              />
            </>
          ) : (
            <>
              <p>
                <b>Comment:</b> {comment.text}
              </p>

              <button
                type="submit"
                className="edit"
                onClick={() => handleEditComment(comment.id)}>
                Edit
              </button>
              <button
                type="button"
                className="delete"
                onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
      <CommentForm onCreate={handleNewComment} />
    </div>
  );
}
