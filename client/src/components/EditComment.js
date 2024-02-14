import { useState } from "react";
import axios from "axios";

export default function EditComment({
  commentId,
  initialValues,
  onUpdate,
  onCancel,
}) {
  const [comment, setComment] = useState(
    initialValues || {
      text: "",
    },
  );

  const handleChange = e => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .patch(`/comments/${commentId}`, comment)
      .then(response => {
        if (onUpdate) {
          onUpdate(response.data);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="text"
        value={comment.text}
        onChange={handleChange}
        placeholder="Text"
      />

      <button type="submit">Save Changes</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}
