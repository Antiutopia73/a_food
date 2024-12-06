import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    message: "",
  });

  // Загружаем все комментарии
  const fetchComments = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/comments/receive");
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/comments/create", formData);
      setComments([...comments, data]);
      setFormData({ name: "", rating: "", message: "" });
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  const showMoreComments = () => {
    setVisibleComments(visibleComments + 5);
  };

  return (
    <div className="comments-page">
      <div className="container">
        <h1>Customer Reviews</h1>
        
        {comments.length === 0 ? (
          <p className="no-comments-message">No comments yet!</p>
        ) : (
          <ul className="comments-list">
            {comments.slice(0, visibleComments).map((comment) => (
              <li key={comment._id} className="comment-card">
                <p className="comment-name"><strong>{comment.name}</strong></p>
                <p className="comment-rating">⭐ Rating: {comment.rating}</p>
                <p className="comment-date">{new Date(comment.date).toLocaleDateString()}</p>
                <p className="comment-message">{comment.message}</p>
              </li>
            ))}
          </ul>
        )}

        {comments.length > visibleComments && (
          <button onClick={showMoreComments} className="show-more-btn">Show More</button>
        )}

        <form className="add-comment-form" onSubmit={handleSubmit}>
          <h2>Add Your Review</h2>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            pattern="[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ\s]*"
            onChange={(e) => {
              const lettersOnly = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ\s]/g, "");
              setFormData({ ...formData, name: lettersOnly });
            }}
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={formData.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
          />
          <textarea
            name="message"
            placeholder="Your comment"
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CommentsPage;
